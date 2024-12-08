import React, {useState, useEffect} from "react";
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
import {useNavigate} from "react-router-dom";
import {fetchWithAuth} from "../../api/fetchWithAuth"; // Подключение CSS


function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const navigate = useNavigate();

    // Загрузка событий с сервера
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetchWithAuth("https://localhost:7065/api/events/Event", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json(); // Преобразуем в JSON
                setEvents(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    // Получаем все события для текущего месяца
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({start: monthStart, end: monthEnd});
    const startDayOfWeek = (getDay(monthStart) + 6) % 7;

    // Функция для проверки, является ли день событием
    const isEventDay = (day) => {
        return events.some((event) =>
            (isSameDay(day, new Date(event.openDate)) || isSameDay(day, new Date(event.closeDate)))
        );
    };

    // Обработка перехода по месяцам
    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    // Обработка клика по дате
    const handleDayClick = (day) => {
        const filtered = events.filter(
            (event) =>
                isSameDay(day, new Date(event.openDate)) ||
                isSameDay(day, new Date(event.closeDate))
        );
        setFilteredEvents(filtered);
        setSelectedDate(day);
    };

    return (
        <div className="calendar-container">
            {/* Навигация по месяцам */}
            <div className="calendar-navigation">
                <img src={LeftIcon} alt="left" onClick={handlePrevMonth}/>
                <p className="calendar-title">{format(currentDate, "LLLL yyyy", {locale: ru})}</p>
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
                        className={`calendar-day ${isEventDay(day) ? "special" : ""}`}
                        onClick={() => handleDayClick(day)}
                    >
                        {format(day, "d")}
                    </div>
                ))}
            </div>

            {/* Модальное окно */}
            {selectedDate && (
                <div className="modal-overlay" onClick={() => setSelectedDate(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-date">{format(selectedDate, "dd.MM.yyyy")}</div>
                        <div id="ChatDelimiter"></div>
                        <div style={{marginTop: "10px"}}>
                            {filteredEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="modal-entry"
                                    onClick={() => {
                                        setSelectedDate(null);
                                        navigate(event.url);
                                    }}
                                    style={{cursor: "pointer"}}
                                >
                                    <div>{event.name}</div>
                                    <div>
                                        {isSameDay(new Date(event.openDate), selectedDate)
                                            ? `открывается ${format(new Date(event.openDate), "dd.MM.yyyy")}`
                                            : isSameDay(new Date(event.closeDate), selectedDate)
                                                ? `закрывается ${format(new Date(event.closeDate), "dd.MM.yyyy")}`
                                                : ""}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calendar;
