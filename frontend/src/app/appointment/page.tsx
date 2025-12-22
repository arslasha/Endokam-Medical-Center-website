"use client";

import { useState, useEffect, useMemo } from "react";
import api from "@/lib/api/axios";
import DoctorCard from "./_components/DoctorCard";
import ServiceCard from "./_components/ServiceCard";
import CalendarCard from "./_components/CalendarCard";
import styles from "./Appointment.module.css";
import { Button, Space, message, Input, Divider, Typography, ConfigProvider } from "antd";

const { Text, Title } = Typography;

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
    duration_minutes: number;
}

interface TimeSlot {
    time: string;
    start: string;
    end: string;
}

export default function AppointmentPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [workingDays, setWorkingDays] = useState<number[]>([]);
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    const [guestInfo, setGuestInfo] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        api.get('/appointments/doctors/').then(res => setDoctors(res.data));
        api.get('/appointments/services/').then(res => setServices(res.data));
    }, []);

    useEffect(() => {
        if (selectedDoctorId) {
            api.get(`/appointments/working_days/?doctor_id=${selectedDoctorId}`)
               .then(res => {
                   setWorkingDays(res.data);
                   setSelectedDate(null);
                   setAvailableSlots([]);
                   setSelectedSlot(null);
               });
        }
    }, [selectedDoctorId]);

    useEffect(() => {
        if (selectedDoctorId && selectedServiceId && selectedDate) {
            api.get(`/appointments/available_slots/`, {
                params: {
                    doctor_id: selectedDoctorId,
                    service_id: selectedServiceId,
                    date: selectedDate
                }
            }).then(res => setAvailableSlots(res.data));
        }
    }, [selectedDoctorId, selectedServiceId, selectedDate]);

    // Валидация данных (клиентская)
    const validation = useMemo(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9+()-\s]{10,}$/;

        return {
            isLastNameOk: guestInfo.lastName.trim().length >= 2,
            isFirstNameOk: guestInfo.firstName.trim().length >= 2,
            isEmailValid: guestInfo.email === '' || emailRegex.test(guestInfo.email),
            isPhoneValid: guestInfo.phone.trim().length >= 10 && phoneRegex.test(guestInfo.phone),
        };
    }, [guestInfo]);

    // Общая проверка готовности формы
    const isFormValid = useMemo(() => {
        return (
            validation.isLastNameOk &&
            validation.isFirstNameOk &&
            validation.isEmailValid &&
            validation.isPhoneValid &&
            selectedDoctorId &&
            selectedServiceId &&
            selectedDate &&
            selectedSlot
        );
    }, [validation, selectedDoctorId, selectedServiceId, selectedDate, selectedSlot]);

    const handleBooking = async () => {
        try {
            const payload = {
                doctor: selectedDoctorId,
                service: selectedServiceId,
                start_time: selectedSlot?.start,
                guest_first_name: guestInfo.firstName,
                guest_last_name: guestInfo.lastName,
                guest_patronymic: guestInfo.patronymic,
                guest_phone: guestInfo.phone,
                guest_email: guestInfo.email,
            };
            
            await api.post('/appointments/book/', payload);
            message.success("Запись успешно создана!");

            // ОБНОВЛЯЕМ СПИСОК СЛОТОВ, чтобы записанное время исчезло
            if (selectedDoctorId && selectedServiceId && selectedDate) {
                const res = await api.get(`/appointments/available_slots/`, {
                    params: {
                        doctor_id: selectedDoctorId,
                        service_id: selectedServiceId,
                        date: selectedDate
                    }
                });
                setAvailableSlots(res.data);
            }
            
            setSelectedSlot(null);
        } catch (error: any) {
            const errorMsg = error.response?.data?.guest_email 
                ? "Проверьте корректность Email" 
                : "Ошибка при создании записи";
            message.error(errorMsg);
        }
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#008080' } }}>
            <div className={styles.container}>
                <div className={styles.columns}>
                    
                    {/* ЛЕВАЯ КОЛОНКА */}
                    <div className={styles.column}>
                        <section className={styles.section}>
                            <Title level={4}>1. Выберите специалиста</Title>
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
                            <Title level={4}>2. Выберите услугу</Title>
                            <div className={styles.cardList}>
                                {services.map((service) => (
                                    <ServiceCard
                                        key={service.id}
                                        name={service.name}
                                        price={`${service.price} ₽`}
                                        description={`${service.description} (${service.duration_minutes} мин.)`}
                                        selected={selectedServiceId === service.id}
                                        onSelect={() => setSelectedServiceId(service.id)}
                                    />
                                ))}
                            </div>
                        </section>

                        <section className={styles.section}>
                            <Title level={4}>3. Данные пациента</Title>
                            <Space direction="vertical" style={{ width: '100%' }} size="small">
                                <label><Text strong>Фамилия *</Text></label>
                                <Input 
                                    placeholder="Введите фамилию" 
                                    size="large" 
                                    status={!validation.isLastNameOk && guestInfo.lastName !== '' ? "error" : ""}
                                    value={guestInfo.lastName}
                                    onChange={e => setGuestInfo({...guestInfo, lastName: e.target.value})} 
                                />
                                <label><Text strong>Имя *</Text></label>
                                <Input 
                                    placeholder="Введите имя" 
                                    size="large" 
                                    status={!validation.isFirstNameOk && guestInfo.firstName !== '' ? "error" : ""}
                                    value={guestInfo.firstName}
                                    onChange={e => setGuestInfo({...guestInfo, firstName: e.target.value})} 
                                />
                                <label><Text strong>Отчество (если имеется)</Text></label>
                                <Input 
                                    placeholder="Введите отчество" 
                                    size="large" 
                                    value={guestInfo.patronymic}
                                    onChange={e => setGuestInfo({...guestInfo, patronymic: e.target.value})} 
                                />
                                <label><Text strong>Номер телефона *</Text></label>
                                <Input 
                                    placeholder="Введите номер телефон" 
                                    size="large" 
                                    status={!validation.isPhoneValid && guestInfo.phone !== '' ? "error" : ""}
                                    value={guestInfo.phone}
                                    onChange={e => setGuestInfo({...guestInfo, phone: e.target.value})} 
                                />
                                <label><Text strong>Email *</Text></label>
                                <Input 
                                    placeholder="Введите Email" 
                                    size="large" 
                                    status={!validation.isEmailValid && guestInfo.email !== '' ? "error" : ""}
                                    value={guestInfo.email}
                                    onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} 
                                />
                            </Space>
                        </section>
                    </div>

                    {/* ПРАВАЯ КОЛОНКА */}
                    <div className={styles.column}>
                        <section className={styles.section}>
                            <Title level={4}>4. Дата и время</Title>
                            <CalendarCard 
                                onDateSelect={(date: string) => setSelectedDate(date)} 
                                workingDays={workingDays} 
                            />

                            {selectedDate && (
                                <div className={styles.timeSection}>
                                    <Divider orientation="left">Доступное время</Divider>
                                    <Space wrap>
                                        {availableSlots.map((slot) => (
                                            <Button
                                                key={slot.start}
                                                type={selectedSlot?.start === slot.start ? "primary" : "default"}
                                                onClick={() => setSelectedSlot(slot)}
                                            >
                                                {slot.time}
                                            </Button>
                                        ))}
                                    </Space>
                                </div>
                            )}
                        </section>

                        {/* КНОПКА ЗАПИСИ (находится в конце правой колонки) */}
                        <div>
                            <Button 
                                type="primary" 
                                size="large" 
                                block
                                disabled={!isFormValid}
                                onClick={handleBooking}
                                style={{
                                    height: '50px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    backgroundColor: isFormValid ? '#008080' : undefined,
                                    borderColor: isFormValid ? '#008080' : undefined,
                                }}
                            >
                                {isFormValid ? "Записаться на прием" : "Заполните все данные"}
                            </Button>
                            {!isFormValid && (
                                <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
                                    Нужно выбрать врача, услугу, время и заполнить контакты
                                </Text>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </ConfigProvider>
    );
}