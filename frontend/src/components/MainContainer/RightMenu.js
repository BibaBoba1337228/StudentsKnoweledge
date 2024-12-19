import React, {useEffect, useState} from 'react';
import '../../styles/RightMenu.css';
import '../../styles/fonts.css';
import Calendar from "./Calendar";
import {fetchWithAuth} from "../../api/fetchWithAuth";
import {useLocation, useNavigate} from "react-router-dom";


function RightMenu() {

    const [recentEvents, setRecentEvents] = useState([]);

    const [recentMessages, setRecentMessages] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchRecentEvents = async () => {
            try {
                const response = await fetchWithAuth(`https://${process.env.REACT_APP_API_BASE_URL}/api/events/Event/user-events`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Собираем только основные события
                const allEvents = data.map((item) => ({
                    id: item.id,
                    courseName: item.course?.name || "Без названия",
                    name: item.name || "Без названия",
                    openDate: item.openDate,
                    closeDate: item.closeDate,
                    url: item.url || null,
                }));

                const sortedEvents = allEvents
                    .sort((a, b) => new Date(b.openDate) - new Date(a.openDate))
                    .slice(0, 3);

                setRecentEvents(sortedEvents);
            } catch (error) {
                console.error("Error fetching recent events:", error);
            }
        };

        fetchRecentEvents();
    }, []);

    useEffect(() => {
        const fetchRecentMessages = async () => {
            try {
                const response = await fetchWithAuth(`https://${process.env.REACT_APP_API_BASE_URL}/api/Chat/recent-messages`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();


                setRecentMessages(data);
            } catch (error) {
                console.error("Error fetching recent events:", error);
            }
        };

        fetchRecentMessages();
    }, []);

    return (
        <div id="RightMenuContainer">

            <div className="RightMenuSection">
                <h1 className="RightMenuSectionHeader">Недавние события</h1>
                <div className="RightMenuSectionDelimiter"></div>
                <div id="RightMenuSectionLastEvents">
                    {recentEvents.length > 0 ? (
                        recentEvents.map((event, index) => (
                            <div
                                className="RightMenuSectionEvent"
                                key={event.id || index}
                                onClick={() => {
                                    if (event.url) navigate(event.url);
                                }}
                                style={{cursor: event.url ? 'pointer' : 'default'}}
                            >
                                <h1 className="RightMenuSectionEventHeader">{event.courseName}</h1>
                                <div className="RightMenuSectionEventDescription">{event.name}</div>
                                <div className="RightMenuSectionEventData">
                                    {new Date(event.openDate).toLocaleDateString()} -{' '}
                                    {new Date(event.closeDate).toLocaleDateString()}
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="RightMenuSectionEvent">Нет событий</div>
                    )}
                </div>
            </div>


            <div className="RightMenuSection">

                <h1 className="RightMenuSectionHeader">Последние сообщения</h1>
                <div className="RightMenuSectionDelimiter"></div>
                <div id="RightMenuSectionLastMessages">


                    {recentMessages.length > 0 ? (
                        recentMessages.map((message, index) => (
                            <div className="RightMenuSectionMessage">

                                <h1 className="RightMenuSectionMessageHeader">{message.sender}</h1>
                                <div className="RightMenuSectionMessageDataAndDescription">
                                    <div className="RightMenuSectionMessageDescription">
                                        {message.text}
                                    </div>
                                    <div className="RightMenuSectionMessageData">
                                        {new Date(message.sendDate).toLocaleString()}
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="RightMenuSectionEvent">Нет сообщений</div>
                    )}


                </div>

            </div>


            <div className="RightMenuSection">

                <h1 className="RightMenuSectionHeader">Календарь событий</h1>
                <div className="RightMenuSectionDelimiter"></div>
                <div id="RightMenuSectionCalendar">
                    <Calendar></Calendar>

                </div>

            </div>


        </div>
    );
}

export default RightMenu;
