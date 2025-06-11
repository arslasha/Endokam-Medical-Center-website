'use client';

import styles from './Patient.module.css';
import { useRouter } from 'next/navigation';
import {
    FileText,
    ClipboardList,
    DollarSign,
    FileSignature,
    Stethoscope,
    ClipboardCheck
} from 'lucide-react';
import Image from 'next/image';

type PatientCard = {
    id: string;
    title: string;
    icon: React.ReactNode;
    isExternal?: boolean; // Флаг для готовых страниц
    externalPath?: string; // Путь для готовых страниц
};

const patientCards: PatientCard[] = [
    {
        id: 'patient-info',
        title: 'Информация для пациента',
        icon: <FileText size={24} />,
    },
    {
        id: 'fks-preparation',
        title: 'Подготовка к ФКС',
        icon: <ClipboardList size={24} />,
        isExternal: true,
        externalPath: '/preparation' // Готовая страница
    },
    {
        id: 'price-list',
        title: 'Прейскурант на медицинские услуги',
        icon: <DollarSign size={24} />,
        isExternal: true,
        externalPath: '/services' // Готовая страница
    },
    {
        id: 'fks-consent',
        title: 'Согласие на ФКС',
        icon: <FileSignature size={24} />,
    },
    {
        id: 'egds-consent',
        title: 'Согласие на ЭГДС',
        icon: <Stethoscope size={24} />,
    },
    {
        id: 'rrs-consent',
        title: 'Согласие на RRS',
        icon: <ClipboardCheck size={24} />,
    },
];

export default function PatientPage() {
    const router = useRouter();

    const handleCardClick = (card: PatientCard) => {
        if (card.isExternal) {
            router.push(card.externalPath!);
        } else {
            router.push(`/patient/${card.id}`);
        }
    };

    return (
        <section className={styles.patientPage}>
            <div className={styles.header}>
                <h1 className={styles.title}>Пациентам</h1>
                <p className={styles.subtitle}>
                    Вся необходимая информация для подготовки к исследованиям и документы
                </p>
            </div>

            <div className={styles.columns}>
                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/patient/patient-doctor.jpg"
                            alt="Врач с документами"
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

                <div className={styles.cardsColumn}>
                    <div className={styles.cardsGrid}>
                        {patientCards.map((card) => (
                            <div
                                key={card.id}
                                className={styles.card}
                                onClick={() => handleCardClick(card)}
                                tabIndex={0}
                                role="button"
                            >
                                <div className={styles.cardIcon}>{card.icon}</div>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                {card.isExternal}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}