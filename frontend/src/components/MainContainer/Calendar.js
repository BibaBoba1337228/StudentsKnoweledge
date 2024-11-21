import React, {useState} from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    isSameDay,
} from "date-fns";
import ru from "date-fns/locale/ru";
import LeftIcon from "../../assets/icons/left_icon.svg";
import RightIcon from "../../assets/icons/right_icon.svg";
import "../../styles/Calendar.css";
import {useNavigate} from "react-router-dom"; // Подключение CSS

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const specialDays = [new Date(2024, 9, 31), new Date(2024, 10, 1)];

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({start: monthStart, end: monthEnd});
    const startDayOfWeek = (getDay(monthStart) + 6) % 7;

    const isSpecialDay = (day) =>
        specialDays.some((specialDay) => isSameDay(specialDay, day));

    const navigate = useNavigate();

    return (
        <div className="calendar-container">
            {/* Навигация по месяцам */}
            <div className="calendar-navigation">
                <img src={LeftIcon} alt="left" onClick={handlePrevMonth}/>
                <p className="calendar-title">
                    {format(currentDate, "LLLL yyyy", {locale: ru})}
                </p>
                <img src={RightIcon} alt="right" onClick={handleNextMonth}/>
            </div>

            {/* Заголовки дней недели */}
            <div className="calendar-grid">
                {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                    <div key={day} className="calendar-day-header">
                        {day}
                    </div>
                ))}

                {/* Пустые ячейки для сдвига */}
                {Array.from({length: startDayOfWeek}).map((_, index) => (
                    <div key={index}/>
                ))}

                {/* Дни месяца */}
                {days.map((day) => (
                    <div
                        key={day}
                        className={`calendar-day ${isSpecialDay(day) ? "special" : ""}`}
                        onClick={() => isSpecialDay(day) && setSelectedDate(day)}
                    >
                        {format(day, "d")}
                    </div>
                ))}
            </div>

            {/* Модальное окно */}
            {selectedDate && (
                <div className="modal-overlay" onClick={() => setSelectedDate(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-date">
                            {format(selectedDate, "dd.MM.yyyy")}
                        </div>
                        <div id="ChatDelimiter"></div>
                        <div style={{marginTop: "10px"}}>
                            <div className="modal-entry" onClick={() => {
                                setSelectedDate(null);
                                navigate('/system/course/task')
                            }}
                                 style={{cursor: "pointer"}}>
                                <div>ТП 2к3с - ЛР1</div>
                                <div>до 01.11.2024</div>
                            </div>
                            <div className="modal-entry" onClick={() => {
                                setSelectedDate(null);
                                navigate('/system/course/task')
                            }}
                                 style={{cursor: "pointer"}}>
                                <div>ТП 2к3с - ЛР2</div>
                                <div>открывается сегодня в 11:59</div>
                            </div>
                            <div className="modal-entry" onClick={() => {
                                setSelectedDate(null);
                                navigate('/system/course/task')
                            }}
                                 style={{cursor: "pointer"}}>
                                <div>ТП 2к3с - ЛР3</div>
                                <div>закрывается сегодня</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calendar;
