import React from 'react';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';


interface CalendarCardProps {
    onDateSelect: (date: string) => void;
    disabledDates?: string[];
}

const CalendarCard: React.FC<CalendarCardProps> = ({ onDateSelect, disabledDates = [] }) => {
    const disabledDate = (current: Dayjs) => {
        // Если список разрешенных дат пуст, разрешаем всё. 
        // Если не пуст — фильтруем по нему.
        if (disabledDates.length === 0) return false; 
        return !disabledDates.includes(current.format('YYYY-MM-DD'));
    };

    return (
        <Calendar
            disabledDate={disabledDate}
            onSelect={(date) => onDateSelect(date.format('YYYY-MM-DD'))}
        />
    );
};

export default CalendarCard;