'use client';

import styles from '../Home.module.css';
import { useRouter } from 'next/navigation';
import {
    Stethoscope,
    Syringe,
    UserCircle,
    Microscope,
    ScanEye,
    ShieldCheck,
} from 'lucide-react';
import SectionHeader from "@/components/shared/SectionHeader";

const servicesCategory = [
    {
        id: 'endoscopy',
        title: 'Эндоскопические исследования',
        description: 'Современные методы диагностики ЖКТ и дыхательных путей',
        icon: <ScanEye size={28} />,
    },
    {
        id: 'sedation',
        title: 'Седация',
        description: 'Комфортное обезболивание при медицинских процедурах',
        icon: <ShieldCheck size={28} />,
    },
    {
        id: 'consultations',
        title: 'Приемы врачей',
        description: 'Приемы терапевта, педиатра и узких специалистов',
        icon: <UserCircle size={28} />,
    },
    {
        id: 'biopsy',
        title: 'Биопсия и удаление новообразований',
        description: 'Минимально инвазивные методы диагностики и лечения',
        icon: <Syringe size={28} />,
    },
    {
        id: 'histology',
        title: 'Гистологические исследования',
        description: 'Анализ тканей и клеток для точной диагностики',
        icon: <Microscope size={28} />,
    },
    {
        id: 'extras',
        title: 'Дополнительные услуги',
        description: 'Медсправки, анализы, перевязки и прочие процедуры',
        icon: <Stethoscope size={28} />,
    },
];

export const Services = () => {
    const router = useRouter();

    const handleClick = (id: string) => {
        router.push(`/services/${id}`);
    };

    return (
        <section className={styles.services} id="services">
            <SectionHeader
                title="Наши услуги"
                description="Наша клиника предоставляет широкий спектр медицинских услуг для пациентов любого возраста.
                    Мы используем современные методы диагностики и лечения, обеспечивая высокий уровень
                    безопасности и комфорта."
                href="/servicesCategory"
            />

            <div className={styles.services__grid}>
                {servicesCategory.map(({id, title, description, icon}) => (
                    <div
                        key={id}
                        className={styles.services__card}
                        onClick={() => handleClick(id)}
                        tabIndex={0}
                        role="button"
                    >
                        <div className={styles.services__icon}>{icon}</div>
                        <div className={styles.services__content}>
                            <h3 className={styles.services__name}>{title}</h3>
                            <p className={styles.services__desc}>{description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
