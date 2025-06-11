'use client';

import styles from './Services.module.css';
import { useRouter } from 'next/navigation';
import {
    Stethoscope,
    Syringe,
    UserCircle,
    Microscope,
    ScanEye,
    ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import {Button} from "antd";

const services = [
    {
        id: 'endoscopy',
        title: 'Эндоскопические исследования',
        shortDescription: 'Современные методы диагностики ЖКТ и дыхательных путей',
        fullDescription: 'Проводим полный спектр эндоскопических исследований, включая гастроскопию, колоноскопию и бронхоскопию. Используем оборудование экспертного класса с высокой детализацией изображения. Возможность проведения исследований под седацией.',
        icon: <ScanEye size={28} />,
        image: '/images/services/endoscopy.jpg'
    },
    {
        id: 'sedation',
        title: 'Седация',
        shortDescription: 'Комфортное обезболивание при медицинских процедурах',
        fullDescription: 'Медикаментозный сон (седация) позволяет проводить неприятные процедуры без стресса и дискомфорта. Используем безопасные препараты последнего поколения. Процедура контролируется анестезиологом-реаниматологом с мониторингом жизненных показателей.',
        icon: <ShieldCheck size={28} />,
        image: '/images/services/sedation.jpg'
    },
    {
        id: 'consultations',
        title: 'Приемы врачей',
        shortDescription: 'Приемы терапевта, педиатра и узких специалистов',
        fullDescription: 'Консультации квалифицированных специалистов с большим опытом работы. Проводим комплексные обследования, разрабатываем индивидуальные планы лечения и профилактики. Возможен выезд врача на дом.',
        icon: <UserCircle size={28} />,
        image: '/images/services/consultation.jpg'
    },
    {
        id: 'biopsy',
        title: 'Биопсия и удаление новообразований',
        shortDescription: 'Минимально инвазивные методы диагностики и лечения',
        fullDescription: 'Выполняем забор тканей для гистологического исследования с помощью современных методик. Удаление доброкачественных новообразований кожи и слизистых (папиллом, невусов, полипов) радиоволновым и лазерным методами.',
        icon: <Syringe size={28} />,
        image: '/images/services/biopsy.jpg'
    },
    {
        id: 'histology',
        title: 'Гистологические исследования',
        shortDescription: 'Анализ тканей и клеток для точной диагностики',
        fullDescription: 'Собственная лаборатория позволяет проводить гистологические и цитологические исследования в короткие сроки. Точная диагностика опухолевых и неопухолевых заболеваний. Возможность получения второго мнения от ведущих специалистов.',
        icon: <Microscope size={28} />,
        image: '/images/services/histology.jpg'
    },
    {
        id: 'extras',
        title: 'Дополнительные услуги',
        shortDescription: 'Медсправки, анализы, перевязки и прочие процедуры',
        fullDescription: 'Широкий спектр медицинских услуг: забор анализов, оформление медицинской документации, перевязки, инъекции, капельницы, физиотерапевтические процедуры. Работаем с пациентами всех возрастов.',
        icon: <Stethoscope size={28} />,
        image: '/images/services/extras.jpg'
    },
];

export default function ServicesPage() {
    const router = useRouter();

    const handleDetailsClick = (id: string) => {
        router.push(`/services/${id}`);
    };

    const handlePreparationClick = (id: string) => {
        router.push(`/services/${id}/preparation`);
    };

    return (
        <section className={styles.servicesPage}>

            <div className={styles.headerSection}>
                <h1 className={styles.mainTitle}>Наши услуги</h1>
                <p className={styles.subTitle}>
                    Клиника предоставляет полный комплекс медицинских услуг с использованием современного
                    оборудования и индивидуальным подходом к каждому пациенту.
                </p>
            </div>

            <div className={styles.servicesContainer}>
                {services.map((service) => (
                    <div key={service.id} className={styles.serviceCard}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>

                        <div className={styles.content}>
                            <div className={styles.header}>
                                <div className={styles.icon}>{service.icon}</div>
                                <h3 className={styles.title}>{service.title}</h3>
                            </div>

                            <p className={styles.shortDescription}>{service.shortDescription}</p>
                            <p className={styles.fullDescription}>{service.fullDescription}</p>

                            <div className={styles.buttons}>
                                <Button
                                    onClick={() => handleDetailsClick(service.id)}
                                    className={styles.detailsButton}
                                >
                                    Подробнее
                                </Button>
                                <Button
                                    className={styles.preparationButton}
                                    href={"/preparation"}
                                >
                                    Подготовка
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}