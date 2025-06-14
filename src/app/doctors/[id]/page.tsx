// src/app/doctors/[id]/page.tsx
import { getDoctorById } from '@/lib/data/doctors';
import { PageTransition } from '@/components/shared/PageTransition';
import styles from './DoctorPage.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from "antd";
import {use} from "react";


interface PageProps {
    params: Promise<{
        id: string;
    }>;
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
}


export default function DoctorPage({ params }: PageProps) {
    // Распаковываем Promise с помощью use()
    const { id } = use(params);
    const doctor = getDoctorById(id);

    if (!doctor) return notFound();

    return (
        <PageTransition>
            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={400}
                        height={500}
                        className={styles.image}
                    />
                </div>
                <div className={styles.content}>
                    <h1 className={styles.name}>{doctor.name}</h1>
                    <h2 className={styles.role}>{doctor.role}</h2>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>О враче</h3>
                        <p><strong>Специализация:</strong> {doctor.specialization}</p>
                        <p><strong>Стаж работы:</strong> {doctor.experience}</p>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Образование и достижения</h3>
                        <p><strong>Образование:</strong> {doctor.education}</p>
                        <p><strong>Достижения:</strong> {doctor.achievements}</p>
                    </section>
                    <Button type="primary" size="large" href="/">
                        На главную
                    </Button>
                </div>
            </div>
        </PageTransition>
    );
}
