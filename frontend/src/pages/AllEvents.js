import '../styles/AllEvents.css';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchWithAuth} from "../api/fetchWithAuth";

function AllEvents() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetchWithAuth(`https://${process.env.REACT_APP_API_BASE_URL}/api/events/Event`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Преобразуем данные в нужный формат
                const allEvents = data.map((item) => ({
                    id: item.id,
                    courseName: item.course?.name || "Без названия",
                    name: item.name || "Без названия",
                    openDate: item.openDate,
                    closeDate: item.closeDate,
                    url: item.url || null,
                }));

                setEvents(allEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div id="AllEventsWrapper">
            <div id="AllEventsContainer">
                <div id="AllEventsHeaderContainer">
                    <div id="AllEventsHeader">Все события курса</div>
                    <div id="AllEventsDelimiter"></div>
                </div>

                <div id="AllEventsCourceContainer">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div
                                className="AllEventsInfoBlock"
                                key={event.id}
                                onClick={() => navigate(event.url || `/system/course/task`)}
                                style={{cursor: event.url ? 'pointer' : 'default'}}
                            >
                                <div className="AllEventsTextBlock">
                                    <div className="AllEventsInfoBlockHeader">{event.name}</div>
                                    <div className="AllEventsInfoBlockInfo">
                                        {new Date(event.openDate).toLocaleDateString()} - {new Date(event.closeDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Нет событий</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllEvents;
