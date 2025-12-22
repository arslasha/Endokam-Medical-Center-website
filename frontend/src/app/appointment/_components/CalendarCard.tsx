import React from 'react';
import { Calendar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

interface CalendarCardProps {
    onDateSelect: (date: string) => void;
    workingDays: number[]; // Массив дней недели [0, 1, 4] (Пн, Вт, Пт)
}

const CalendarCard: React.FC<CalendarCardProps> = ({ onDateSelect, workingDays }) => {
    const disabledDate = (current: Dayjs) => {
        const today = dayjs().startOf('day');
        const oneMonthLater = dayjs().add(1, 'month').endOf('day');

        // 1. Блокируем даты вне диапазона (раньше сегодня или позже чем через месяц)
        if (current.isBefore(today) || current.isAfter(oneMonthLater)) {
            return true;
        }

        // 2. Блокируем дни, в которые врач не работает
        // В JS dayjs: 0 (Вс) - 6 (Сб). В Django: 0 (Пн) - 6 (Вс)
        const jsDay = current.day();
        const djangoDay = jsDay === 0 ? 6 : jsDay - 1;

        return !workingDays.includes(djangoDay);
    };

    return (
        <Calendar
            fullscreen={false}
            disabledDate={disabledDate}
            onSelect={(date) => onDateSelect(date.format('YYYY-MM-DD'))}
        />
    );
};

export default CalendarCard;