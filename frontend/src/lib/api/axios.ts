import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Убедитесь, что путь совпадает с вашим бэкендом
});

// Перехватчик запросов: добавляем токен в каждый запрос
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Перехватчик ответов: обработка истекших токенов
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Если ошибка 401 и мы еще не пытались обновить токен
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Запрос на обновление токена
                const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
                    refresh: refreshToken,
                });

                const { access } = response.data;

                // Сохраняем новый токен
                localStorage.setItem('accessToken', access);

                // Повторяем изначальный запрос с новым токеном
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Если даже refresh-токен не сработал — разлогиниваем пользователя
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;