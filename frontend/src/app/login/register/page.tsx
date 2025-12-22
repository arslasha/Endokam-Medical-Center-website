'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api/axios';
import { message, ConfigProvider, Typography } from 'antd';
import styles from '../Login.module.css';

const { Text } = Typography;

// Расширенная схема валидации с обязательными полями
const registerSchema = z.object({
    username: z.string().min(3, 'Логин должен быть не менее 3 символов'),
    firstName: z.string().min(2, 'Введите имя (минимум 2 символа)'),
    lastName: z.string().min(2, 'Введите фамилию (минимум 2 символа)'),
    email: z.string().email('Введите корректный email'),
    phone: z.string().min(10, 'Введите корректный номер телефона (минимум 10 цифр)'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            await api.post('/auth/register/', {
                username: data.username,
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                phone: data.phone,
                password: data.password,
            });
            message.success('Регистрация прошла успешно! Теперь вы можете войти.');
            router.push('/login');
        } catch (error: any) {
            const errorData = error.response?.data;
            if (errorData?.username) {
                message.error('Это имя пользователя уже занято');
            } else if (errorData?.email) {
                message.error('Этот email уже используется');
            } else {
                message.error('Ошибка при регистрации. Проверьте правильность введенных данных.');
            }
            console.error('Registration error:', error);
        }
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#008080' } }}>
            <div className={styles.container}>
                <h1 className={styles.title}>Регистрация</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    
                    <label className={styles.label}>
                        <Text strong>Логин *</Text>
                        <input 
                            {...register('username')} 
                            className={`${styles.input} ${errors.username ? styles.inputError : ''}`} 
                            placeholder="Придумайте уникальный логин" 
                        />
                        {errors.username && <span className={styles.error}>{errors.username.message}</span>}
                    </label>

                    <div className={styles.row}>
                        <label className={styles.label}>
                            <Text strong>Фамилия *</Text>
                            <input 
                                {...register('lastName')} 
                                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`} 
                                placeholder="Введите фамилию" 
                            />
                            {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
                        </label>

                        <label className={styles.label}>
                            <Text strong>Имя *</Text>
                            <input 
                                {...register('firstName')} 
                                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`} 
                                placeholder="Введите имя" 
                            />
                            {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
                        </label>
                    </div>

                    <label className={styles.label}>
                        <Text strong>Email *</Text>
                        <input 
                            {...register('email')} 
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`} 
                            placeholder="example@mail.com" 
                        />
                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                    </label>

                    <label className={styles.label}>
                        <Text strong>Телефон *</Text>
                        <input 
                            {...register('phone')} 
                            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`} 
                            placeholder="+7 (___) ___-__-__" 
                        />
                        {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                    </label>

                    <label className={styles.label}>
                        <Text strong>Пароль *</Text>
                        <input 
                            type="password" 
                            {...register('password')} 
                            className={`${styles.input} ${errors.password ? styles.inputError : ''}`} 
                            placeholder="Минимум 6 символов" 
                        />
                        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                    </label>

                    <label className={styles.label}>
                        <Text strong>Повторите пароль *</Text>
                        <input 
                            type="password" 
                            {...register('confirmPassword')} 
                            className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`} 
                            placeholder="Повторите введенный пароль"
                        />
                        {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
                    </label>

                    <button type="submit" disabled={isSubmitting} className={styles.submit}>
                        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                    
                    <div className={styles.footerLink}>
                        Уже есть аккаунт? <Link href="/login" className={styles.link}>Войти</Link>
                    </div>
                </form>
            </div>
        </ConfigProvider>
    );
}