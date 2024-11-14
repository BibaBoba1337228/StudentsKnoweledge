import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import ru from 'date-fns/locale/ru';
import LeftIcon from './assets/icons/left_icon.svg'
import RightIcon from './assets/icons/right_icon.svg'

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Определяем сдвиг для начала месяца (0 - Понедельник, ..., 6 - Воскресенье)
    const startDayOfWeek = (getDay(monthStart) + 6) % 7; // Смещение для понедельника как первого дня

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#333' }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                <img src={LeftIcon} alt="left" onClick={handlePrevMonth}/>
                <p>{format(currentDate, 'LLLL yyyy', {locale: ru})}</p>
                <img src={RightIcon} alt="right" onClick={handleNextMonth}/>


        </div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                    <div key={day} style={{ fontWeight: 'bold' }}>{day}</div>
                ))}
                {/* Добавляем пустые ячейки для смещения дней недели */}
                {Array.from({ length: startDayOfWeek }).map((_, index) => (
                    <div key={index} />
                ))}
                {days.map(day => (
                    <div
                        key={day}
                        style={{
                            color: 'black', // Все дни будут черными
                            padding: '5px',
                        }}
                    >
                        {format(day, 'd')}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Calendar;
