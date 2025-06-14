'use client';

import { notFound } from "next/navigation";
import styles from "./ServiceDetail.module.css";
import { servicesCategory } from "@/lib/data/servicesCategory";
import { use } from 'react';
import { useRouter } from 'next/navigation';

interface ServiceDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    const router = useRouter();
    const { id } = use(params);
    const service = servicesCategory.find((s) => s.id === id);

    if (!service) return notFound();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{service.title}</h1>

            {service.procedures.map((procedure, index) => (
                <div key={index} className={styles.procedure}>
                    <div className={styles.procedureHeader}>
                        <h2 className={styles.procedureName}>{procedure.name}</h2>
                        <span className={styles.price}>{procedure.price}</span>
                    </div>

                    <p className={styles.description}>{procedure.description}</p>

                    {procedure.preparation && (
                        <div className={styles.preparation}>
                            <strong>Подготовка:</strong> {procedure.preparation}
                        </div>
                    )}
                </div>
            ))}

            <button
                onClick={() => router.back()}
                className={styles.backButton}
            >
                ← Назад
            </button>
        </div>
    );
}