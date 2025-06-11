'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { LoginFormValues } from '@/types/login';
import styles from './Login.module.css';
import {signIn} from "next-auth/react";

const loginSchema = z.object({
    login: z.string().min(5).refine(
        (val) => /^\S+@\S+\.\S+$/.test(val) || /^\+?[0-9]{10,15}$/.test(val),
        { message: 'Введите корректный email или номер телефона' }
    ),
    password: z.string().min(6, 'Минимум 6 символов'),
});

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log('Login data:', data);
        // здесь логика авторизации
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Вход</h1>
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
                <button type="submit" className={styles.submit}>Войти</button>
                <div className={styles.altLogin}>
                    <div className={styles.altLogin}>
                        <button
                            type="button"
                            onClick={() => signIn('google')}
                            className={styles.oauth}
                        >
                            Войти через Google
                        </button>
                        <button
                            type="button"
                            onClick={() => signIn('yandex')}
                            className={styles.oauth}
                        >
                            Войти через Yandex
                        </button>
                    </div>
                </div>
                <Link href="/login/register" className={styles.link}>Нет аккаунта? Зарегистрируйтесь</Link>
            </form>
        </div>
    );
}
