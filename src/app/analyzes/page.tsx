'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import styles from './Analyzes.module.css';

import { z } from 'zod';
import Link from "next/link";

const AnalyzesFormSchema = z.object({
    fullName: z.string().min(5, 'Введите полное имя'),
    phone: z.string().regex(/^\+?\d{10,15}$/, 'Введите корректный номер телефона'),
    email: z.string().email('Введите корректную почту'),
    appointmentDate: z.string().min(1, 'Выберите дату приёма'),
    consent: z.literal(true, {
        errorMap: () => ({ message: 'Необходимо согласие на обработку данных' })
    }),
});

export type AnalyzesFormData = z.infer<typeof AnalyzesFormSchema>;


export default function AnalyzesPage() {
    const [submitted, setSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AnalyzesFormData>({
        resolver: zodResolver(AnalyzesFormSchema),
    });

    const onSubmit = (data: AnalyzesFormData) => {
        console.log(data);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className={styles.successMessage}>
                <h1>Данные отправлены, ожидайте сообщения на почту или звонка</h1>
                <p>Спасибо что посетили нас!</p>
                <Link href="/" className={styles.homeButton}>На главную</Link>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.title}>Форма для сдачи анализов</h1>
            <div className={styles.field}><label>Фамилия Имя Отчество<input {...register('fullName')} /></label>{errors.fullName && <span>{errors.fullName.message}</span>}</div>
            <div className={styles.field}><label>Телефон<input {...register('phone')} /></label>{errors.phone && <span>{errors.phone.message}</span>}</div>
            <div className={styles.field}><label>Почта<input {...register('email')} /></label>{errors.email && <span>{errors.email.message}</span>}</div>
            <div className={styles.field}><label>Дата приёма<input type="date" {...register('appointmentDate')} /></label>{errors.appointmentDate && <span>{errors.appointmentDate.message}</span>}</div>
            <div className={styles.checkbox}><label><input type="checkbox" {...register('consent')} /> Я согласен на обработку персональных данных и ознакомлен с правилами организации</label>{errors.consent && <span>{errors.consent.message}</span>}</div>
            <button type="submit" className={styles.submit}>Отправить</button>
        </form>
    );
}