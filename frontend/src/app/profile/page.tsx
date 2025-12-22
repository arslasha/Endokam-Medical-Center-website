'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api/axios';
import { 
    App, 
    Avatar, 
    Card, 
    List, 
    Tag, 
    Button, 
    Typography, 
    ConfigProvider 
} from 'antd';
import { 
    UserOutlined, 
    CalendarOutlined, 
    LogoutOutlined, 
    PhoneOutlined, 
    LeftOutlined, 
    RightOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import styles from './Profile.module.css';

// Настройка локали
dayjs.locale('ru'); 
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const { Title, Text } = Typography;

export default function ProfilePage() {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#008080' } }}>
            {/* Обертка App исправляет совместимость с React 19 для модалок и уведомлений */}
            <App>
                <ProfileContent />
            </App>
        </ConfigProvider>
    );
}

function ProfileContent() {
    const [user, setUser] = useState<any>(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { notification } = App.useApp(); // Статический метод для вызова уведомлений

    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                window.location.href = '/login';
                return;
            }
    
            try {
                const userRes = await api.get('/auth/me/');
                setUser(userRes.data);
                
                const appRes = await api.get('/appointments/my_appointments/');
                setAppointments(appRes.data);
                
                setLoading(false);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    localStorage.clear();
                    window.location.href = '/login';
                } else {
                    setLoading(false); 
                }
            }
        };
        loadData();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    const showCancelNotification = () => {
        notification.info({
            message: 'Отмена записи',
            description: 'Позвоните нам, чтобы отменить или перенести запись на другое время.',
            duration: 10,
            btn: (
                <Button 
                    type="primary" 
                    size="small" 
                    icon={<PhoneOutlined />}
                    href="tel:+79178911663"
                    style={{ backgroundColor: '#008080', borderColor: '#008080' }}
                >
                    Позвонить: 8 (917) 891-16-63
                </Button>
            ),
            placement: 'topRight',
        });
    };

    if (loading) return null;

    return (
        <div className={styles.profileContainer}>
            <div className={styles.columns}>
                {/* ЛЕВАЯ ЧАСТЬ: ИНФО */}
                <div className={styles.infoColumn}>
                    <Card className={styles.userCard}>
                        <div className={styles.avatarWrapper}>
                            <Avatar size={100} icon={<UserOutlined />} className={styles.avatar} />
                            <Tag color="teal" className={styles.roleTag}>
                                {user?.role === 'DOCTOR' ? 'Врач' : 'Пациент'}
                            </Tag>
                        </div>
                        <Title level={4} style={{ textAlign: 'center', marginBottom: 24 }}>
                            {user?.last_name} {user?.first_name}
                        </Title>
                        
                        <div className={styles.detailsList}>
                            <div className={styles.detailItem}>
                                <Text type="secondary">Телефон</Text>
                                <Text strong>{user?.phone || 'Не указан'}</Text>
                            </div>
                            <div className={styles.detailItem}>
                                <Text type="secondary">Email</Text>
                                <Text strong>{user?.email}</Text>
                            </div>
                        </div>

                        <Button 
                            danger 
                            icon={<LogoutOutlined />} 
                            block 
                            onClick={handleLogout}
                            style={{ marginTop: 32 }}
                        >
                            Выйти
                        </Button>
                    </Card>
                </div>

                {/* ПРАВАЯ ЧАСТЬ: КОНТЕНТ */}
                <div className={styles.contentColumn}>
                    {user?.role === 'DOCTOR' ? (
                        <DoctorSchedule appointments={appointments} />
                    ) : (
                        <PatientAppointments 
                            appointments={appointments} 
                            onCancelClick={showCancelNotification} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

// Вспомогательный компонент для Пациента
function PatientAppointments({ appointments, onCancelClick }: any) {
    return (
        <Card title="Мои записи" className={styles.mainCard}>
            <List
                itemLayout="horizontal"
                dataSource={appointments}
                renderItem={(item: any) => (
                    <List.Item
                        actions={[
                            // 1. Кнопка теперь ПЕРВАЯ (будет левее)
                            item.status === 'предстоящая' && (
                                <Button 
                                    key="cancel-btn"
                                    type="link" 
                                    danger 
                                    onClick={onCancelClick}
                                    style={{ padding: 0 }}
                                >
                                    Отменить
                                </Button>
                            ),
                            // 2. Тег теперь ВТОРОЙ (будет правее)
                            <Tag 
                                key="status-tag" 
                                color={item.status === 'предстоящая' ? 'processing' : 'default'}
                                style={{ marginInlineEnd: 0, minWidth: '90px', textAlign: 'center' }}
                            >
                                {item.status.toUpperCase()}
                            </Tag>
                        ].filter(Boolean)}
                    >
                        <List.Item.Meta
                            title={<Text strong>{item.service_name}</Text>}
                            description={
                                <span>
                                    Врач: {item.doctor_name} | <CalendarOutlined style={{ marginLeft: 8 }} /> {dayjs(item.start).format('DD.MM.YYYY HH:mm')}
                                </span>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}

// Вспомогательный компонент для Врача (Календарь)
function DoctorSchedule({ appointments }: any) {
    const [currentDate, setCurrentDate] = useState(dayjs());

    const formatPatientName = (fullName: string) => {
        if (!fullName) return 'Пациент';
        const parts = fullName.split(' ').filter(p => p.length > 0);
        if (parts.length < 2) return fullName;
        return `${parts[0]} ${parts.slice(1).map(p => p[0].toUpperCase() + '.').join('')}`;
    };

    const startOfWeek = currentDate.startOf('week');
    const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

    const renderDayEvents = (day: dayjs.Dayjs) => {
        const dayApps = appointments
            .filter((app: any) => dayjs(app.start).isSame(day, 'day'))
            .sort((a: any, b: any) => dayjs(a.start).diff(dayjs(b.start)));

        return (
            <div className={styles.weekColumnContent}>
                {dayApps.map((item: any) => (
                    <div key={item.id} className={styles.googleEvent}>
                        <div className={styles.eventTime}>
                            {dayjs(item.start).format('HH:mm')} - {dayjs(item.end).format('HH:mm')}
                        </div>
                        <div className={styles.eventPatient}>
                            {formatPatientName(item.patient_name)}
                        </div>
                        <div className={styles.eventService}>
                            {item.service_name}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Card 
            title={
                <div className={styles.calendarHeader}>
                    <Text strong style={{ fontSize: 18 }}>
                        {capitalize(currentDate.format('MMMM YYYY'))}
                    </Text>
                    <div className={styles.calendarNav}>
                        <Button 
                            icon={<LeftOutlined />} 
                            onClick={() => setCurrentDate(currentDate.subtract(1, 'week'))} 
                        />
                        <Button onClick={() => setCurrentDate(dayjs())}>Сегодня</Button>
                        <Button 
                            icon={<RightOutlined />} 
                            onClick={() => setCurrentDate(currentDate.add(1, 'week'))} 
                        />
                    </div>
                </div>
            }
            className={styles.mainCard}
        >
            <div className={styles.weekGrid}>
                {weekDays.map(day => (
                    <div key={day.toString()} className={styles.weekColumn}>
                        <div className={`${styles.weekDayHeader} ${day.isSame(dayjs(), 'day') ? styles.today : ''}`}>
                            <div className={styles.dayLabel}>{capitalize(day.format('ddd'))}</div>
                            <div className={styles.dayNumber}>{day.format('D')}</div>
                        </div>
                        {renderDayEvents(day)}
                    </div>
                ))}
            </div>
        </Card>
    );
}