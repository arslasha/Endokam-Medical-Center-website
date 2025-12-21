"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api/axios";
import DoctorCard from "./_components/DoctorCard";
import ServiceCard from "./_components/ServiceCard";
import CalendarCard from "@/app/appointment/_components/CalendarCard";
import styles from "./Appointment.module.css";
import { Button, Space, message, Input } from "antd";

// Типы данных (лучше вынести в types.d.ts позже)
interface Doctor {
    id: number;
    name: string;
    role: string;
    description: string;
}

interface Service {
    id: number;
    name: string;
    price: string;
    description: string;
}

interface TimeSlot {
    id: number;
    time: string;
}

export default function AppointmentPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

    // Поля для гостя
    const [guestInfo, setGuestInfo] = useState({
        firstName: '',
        lastName: '',
        phone: ''
    });

    // 1. Загрузка врачей и услуг при монтировании
    useEffect(() => {
        api.get('/appointments/doctors/').then(res => setDoctors(res.data));
        // Предположим, вы создали эндпоинт для услуг аналогично врачам
        api.get('/appointments/services/').then(res => setServices(res.data));
    }, []);

    // 2. Загрузка слотов при выборе даты и врача
    useEffect(() => {
        if (selectedDoctorId && selectedDate) {
            api.get(`/appointments/available_slots/?doctor_id=${selectedDoctorId}&date=${selectedDate}`)
               .then(res => setAvailableSlots(res.data));
        }
    }, [selectedDoctorId, selectedDate]);

    const handleBooking = async () => {
        // Валидация перед отправкой
        if (!selectedDoctorId || !selectedSlotId || !guestInfo.lastName || !guestInfo.phone) {
            message.error("Пожалуйста, выберите врача, время и заполните свои контакты");
            return;
        }
    
        try {
            const payload = {
                doctor: selectedDoctorId,
                slot: selectedSlotId,
                guest_first_name: guestInfo.firstName,
                guest_last_name: guestInfo.lastName,
                guest_phone: guestInfo.phone,
                // service: selectedServiceId // Если хотите сохранять и услугу, добавьте поле в модель Appointment на бэке
            };
            
            const response = await api.post('/appointments/book/', payload);
            
            if (response.status === 201) {
                message.success("Вы успешно записаны!");
                // Сбрасываем выбор, чтобы избежать дублей
                setSelectedSlotId(null);
                setAvailableSlots(prev => prev.filter(s => s.id !== selectedSlotId));
            }
        } catch (error: any) {
            console.error(error);
            message.error(error.response?.data?.message || "Ошибка при записи");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.columns}>
                <div className={styles.column}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Выбор специалиста</h2>
                        <div className={styles.cardList}>
                            {doctors.map((doctor) => (
                                <DoctorCard
                                    key={doctor.id}
                                    {...doctor}
                                    selected={selectedDoctorId === doctor.id}
                                    onSelect={() => setSelectedDoctorId(doctor.id)}
                                />
                            ))}
                        </div>
                    </section>

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
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Данные пациента</h2>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Input placeholder="Фамилия" onChange={e => setGuestInfo({...guestInfo, lastName: e.target.value})} />
                            <Input placeholder="Имя" onChange={e => setGuestInfo({...guestInfo, firstName: e.target.value})} />
                            <Input placeholder="Телефон" onChange={e => setGuestInfo({...guestInfo, phone: e.target.value})} />
                        </Space>
                    </section>
                </div>

                <div className={styles.column}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Выбор даты и времени</h2>
                        <CalendarCard onDateSelect={setSelectedDate} />

                        {selectedDate && (
                            <div className={styles.timeSection}>
                                <h3 className={styles.timeTitle}>Доступное время:</h3>
                                <Space wrap>
                                    {availableSlots.map((slot) => (
                                        <Button
                                            key={slot.id}
                                            type={selectedSlotId === slot.id ? "primary" : "default"}
                                            onClick={() => setSelectedSlotId(slot.id)}
                                        >
                                            {slot.time}
                                        </Button>
                                    ))}
                                </Space>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {selectedSlotId && (
                <div className={styles.confirmSection}>
                    <Button type="primary" size="large" onClick={handleBooking}>
                        Записаться на прием
                    </Button>
                </div>
            )}
        </div>
    );
}