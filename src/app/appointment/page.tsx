"use client";

import { useState } from "react";
import DoctorCard from "./_components/DoctorCard";
import ServiceCard from "./_components/ServiceCard";
import styles from "./Appointment.module.css";
import CalendarCard from "@/app/appointment/_components/CalendarCard";
import { Button, Space } from "antd";

const specialists = [
    {
        id: 1,
        name: "Супрунова Е.А.",
        role: "Гастроэнтеролог",
        description: "Проводит обследование ЖКТ и консультации",
    },
    {
        id: 2,
        name: "Хисамутдинов И.Г.",
        role: "Эндоскопист",
        description: "Специалист по эндоскопическим процедурам",
    },
    {
        id: 3,
        name: "Алексеева И.О.",
        role: "Онколог",
        description: "Диагностика и лечение новообразований",
    },
];

const services = [
    {
        id: 101,
        name: "Гастроскопия",
        price: "4000 ₽",
        description: "Осмотр верхних отделов ЖКТ",
    },
    {
        id: 102,
        name: "Колоноскопия",
        price: "6500 ₽",
        description: "Полный осмотр толстой кишки",
    },
    {
        id: 103,
        name: "Консультация онколога",
        price: "3000 ₽",
        description: "Первичный прием и диагностика",
    },
];

const availableDates = [
    "2025-06-10", "2025-06-11", "2025-06-12",
    "2025-06-13", "2025-06-14", "2025-06-15",
    "2025-06-16",
];

const timeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

export default function AppointmentPage() {
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const canSubmit = selectedDoctorId && selectedServiceId && selectedDate && selectedTime;

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setSelectedTime(null); // Сбрасываем время при выборе новой даты
    };

    return (
        <div className={styles.container}>
            <div className={styles.columns}>
                {/* Левая колонка */}
                <div className={styles.column}>
                    {/* Выбор специалиста */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Выбор специалиста</h2>
                        <div className={styles.cardList}>
                            {specialists.map((doctor) => (
                                <DoctorCard
                                    key={doctor.id}
                                    name={doctor.name}
                                    role={doctor.role}
                                    description={doctor.description}
                                    selected={selectedDoctorId === doctor.id}
                                    onSelect={() => setSelectedDoctorId(doctor.id)}
                                />
                            ))}
                        </div>
                        <button
                            className={styles.submitButton}
                            disabled={selectedDoctorId === null}
                            onClick={() => alert("Специалист выбран")}
                        >
                            Выбрать
                        </button>
                    </section>

                    {/* Выбор услуги */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Выбор услуги</h2>
                        <div className={styles.cardList}>
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    name={service.name}
                                    price={service.price}
                                    description={service.description}
                                    selected={selectedServiceId === service.id}
                                    onSelect={() => setSelectedServiceId(service.id)}
                                />
                            ))}
                        </div>
                        <button
                            className={styles.submitButton}
                            disabled={selectedServiceId === null}
                            onClick={() => alert("Услуга выбрана")}
                        >
                            Выбрать
                        </button>
                    </section>
                </div>

                {/* Правая колонка — выбор даты и времени */}
                <div className={styles.column}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Выбор даты и времени</h2>
                        <CalendarCard
                            onDateSelect={handleDateSelect}
                            disabledDates={availableDates}
                        />

                        {selectedDate && (
                            <div className={styles.timeSection}>
                                <h3 className={styles.timeTitle}>Доступное время:</h3>
                                <Space wrap>
                                    {timeSlots.map((time) => (
                                        <Button
                                            key={time}
                                            type={selectedTime === time ? "primary" : "default"}
                                            onClick={() => setSelectedTime(time)}
                                            className={styles.timeButton}
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </Space>
                            </div>
                        )}
                    </section>
                </div>
            </div>
            {selectedTime && (
                <div className={styles.confirmSection}>
                    {canSubmit && (
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => {
                                alert("Вы записаны, для подтверждения записи с вами свяжутся за день до приема! Спасибо что доверяете нам!");
                            }}
                        >
                            Записаться
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}