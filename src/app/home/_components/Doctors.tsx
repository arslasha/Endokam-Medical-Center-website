// src/app/home/_components/Doctors.tsx
import styles from '../Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from "@/components/shared/SectionHeader";

const doctors = [
    {
        id: 'khisamutdinov',
        name: 'Хисамутдинов И.Г.',
        role: 'Главный врач, Эндоскопист',
        image: '/images/doctors/khisamutdinov_photo.png',
    },
    {
        id: 'osipov',
        name: 'Осипов А.А.',
        role: 'Колопроктолог (проктолог)',
        image: '/images/doctors/osipov_photo.png',
    },
    {
        id: 'zinyrova',
        name: 'Зинурова Г.Н.',
        role: 'Гастроэнтеролог',
        image: '/images/doctors/zinyrova_photo.png',
    },
];

export const Doctors = () => (
    <section className={styles.doctors}>
        <SectionHeader
            title="Специалисты клиники"
            description="Познакомьтесь с нашей профессиональной командой врачей"
            href="/doctors"
        />
        <div className={styles.doctors__list}>
            {doctors.map((doc) => (
                <Link
                    key={doc.id}
                    href={`/doctors/${doc.id}`}
                    className={styles.doctors__card}
                >
                    <Image
                        src={doc.image}
                        alt={doc.name}
                        width={300}
                        height={300}
                        className={styles.doctors__image}
                    />
                    <h3 className={styles.doctors__name}>{doc.name}</h3>
                    <p className={styles.doctors__role}>{doc.role}</p>
                </Link>
            ))}
        </div>
    </section>
);
