'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import api from '@/lib/api/axios';
import { message, ConfigProvider } from 'antd';
import styles from '../Login.module.css';
import Link from 'next/link';

const registerSchema = z.object({
    username: z.string().min(3, 'Логин минимум 3 символа'),
    email: z.string().email('Некорректный email'),
    phone: z.string().min(10, 'Введите корректный номер'),
    password: z.string().min(6, 'Пароль минимум 6 символов'),
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
            } else {
                message.error('Ошибка при регистрации. Проверьте данные.');
            }
        }
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#008080' } }}>
            <div className={styles.container}>
                <h1 className={styles.title}>Регистрация</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <label className={styles.label}>
                        Логин *
                        <input {...register('username')} className={styles.input} placeholder="Придумайте логин" />
                        {errors.username && <span className={styles.error}>{errors.username.message}</span>}
                    </label>

                    <label className={styles.label}>
                        Email *
                        <input {...register('email')} className={styles.input} placeholder="example@mail.com" />
                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                    </label>

                    <label className={styles.label}>
                        Телефон *
                        <input {...register('phone')} className={styles.input} placeholder="+7 (999) 000-00-00" />
                        {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                    </label>

                    <label className={styles.label}>
                        Пароль *
                        <input type="password" {...register('password')} className={styles.input} placeholder="Минимум 6 символов" />
                        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                    </label>

                    <label className={styles.label}>
                        Повторите пароль *
                        <input type="password" {...register('confirmPassword')} className={styles.input} />
                        {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
                    </label>

                    <button type="submit" disabled={isSubmitting} className={styles.submit}>
                        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                    
                    <Link href="/login" className={styles.link}>Уже есть аккаунт? Войти</Link>
                </form>
            </div>
        </ConfigProvider>
    );
}