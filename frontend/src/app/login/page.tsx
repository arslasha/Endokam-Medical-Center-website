'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api/axios';
import { message, ConfigProvider } from 'antd';
import styles from './Login.module.css';

const loginSchema = z.object({
    login: z.string().min(3, 'Минимум 3 символа'),
    password: z.string().min(6, 'Минимум 6 символов'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await api.post('/auth/login/', {
                username: data.login,
                password: data.password
            });
            
            if (response.data.access) {
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                message.success('Вход выполнен успешно!');
                router.push('/appointment'); // Перенаправляем на запись или в профиль
                router.refresh();
            }
        } catch (error: any) {
            console.error(error);
            message.error('Неверный логин или пароль');
        }
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#008080' } }}>
            <div className={styles.container}>
                <h1 className={styles.title}>Вход в систему</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <label className={styles.label}>
                        Логин (имя пользователя)
                        <input 
                            {...register('login')} 
                            className={`${styles.input} ${errors.login ? styles.inputError : ''}`} 
                            placeholder="Введите ваш логин"
                        />
                        {errors.login && <span className={styles.error}>{errors.login.message}</span>}
                    </label>
                    
                    <label className={styles.label}>
                        Пароль
                        <input 
                            type="password" 
                            {...register('password')} 
                            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                            placeholder="Введите пароль"
                        />
                        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                    </label>

                    <button type="submit" disabled={isSubmitting} className={styles.submit}>
                        {isSubmitting ? 'Вход...' : 'Войти'}
                    </button>
                    
                    <div className={styles.divider}>или</div>
                    
                    <div className={styles.altLogin}>
                        <button type="button" className={styles.oauth}>Google</button>
                        <button type="button" className={styles.oauth}>Yandex</button>
                    </div>
                    
                    <Link href="/login/register" className={styles.link}>
                        Нет аккаунта? Зарегистрируйтесь
                    </Link>
                </form>
            </div>
        </ConfigProvider>
    );
}