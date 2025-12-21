'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { RegisterFormValues } from '@/types/login';
import styles from '../Login.module.css';

const registerSchema = z.object({
    login: z.string().min(5).refine(
        (val) => /^\S+@\S+\.\S+$/.test(val) || /^\+?[0-9]{10,15}$/.test(val),
        { message: 'Введите корректный email или номер телефона' }
    ),
    password: z.string().min(6, 'Минимум 6 символов'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
});

export default function RegisterPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormValues) => {
        console.log('Register data:', data);
        // здесь логика регистрации
        router.push('/login');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Регистрация</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <label>
                    Логин (Email или телефон)
                    <input {...register('login')} className={styles.input} />
                    {errors.login && <span className={styles.error}>{errors.login.message}</span>}
                </label>
                <label>
                    Пароль
                    <input type="password" {...register('password')} className={styles.input} />
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                </label>
                <label>
                    Повторите пароль
                    <input type="password" {...register('confirmPassword')} className={styles.input} />
                    {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
                </label>
                <button type="submit" className={styles.submit}>Зарегистрироваться</button>
            </form>
        </div>
    );
}

