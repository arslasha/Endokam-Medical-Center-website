'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Preparation.module.css';

const preparationArticles = [
    {
        id: 'lavacol',
        title: 'Подготовка к ФКС — Лавакол',
        description: 'Инструкция для пациентов по приёму Лавакола перед процедурой ФКС.',
        image: '/images/preparation/lavacol.jpg',
    },
    {
        id: 'fortrans',
        title: 'Подготовка к ФКС — Фортранс',
        description: 'Пошаговая схема подготовки к колоноскопии с Фортрансом.',
        image: '/images/preparation/fortrans.jpg',
    },
    {
        id: 'moviprep',
        title: 'Подготовка к ФКС — Мовипреп',
        description: 'Рекомендации по приёму Мовипрепа перед исследованием.',
        image: '/images/preparation/moviprep.jpg',
    },
];

export default function PreparationPage() {
    return (
        <section className={styles.preparation}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Подготовка пациента к ФКС</h2>
                <p className={styles.sectionText}>
                    Ознакомьтесь с рекомендациями по подготовке к процедуре. Выберите нужный препарат и следуйте пошаговой инструкции.
                </p>
            </div>

            <div className={styles.grid}>
                {preparationArticles.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={400}
                            height={220}
                            className={styles.image}
                        />
                        <div className={styles.body}>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.desc}>{item.description}</p>
                            <Link href={`/preparation/${item.id}`} className={styles.button}>
                                Посмотреть
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
