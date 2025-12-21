import { getDoctorById } from '@/lib/data/doctors';
import { PageTransition } from '@/components/shared/PageTransition';
import styles from './DoctorPage.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from 'antd';
import Link from 'next/link';

export default async function DoctorPage(props: {
    params: Promise<{ id: string }>;
} ) {
    const { id } = await props.params;
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
                        priority
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

                    <Link href="/" passHref>
                        <Button type="primary" size="large">
                            На главную
                        </Button>
                    </Link>
                </div>
            </div>
        </PageTransition>
    );
}