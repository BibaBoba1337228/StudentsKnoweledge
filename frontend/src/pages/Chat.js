import '../styles/Chat.css';
import '../styles/fonts.css';
import React, {useState, useRef, useEffect} from 'react';
import {HubConnectionBuilder} from "@microsoft/signalr";
import {useParams, useLoaderData} from 'react-router-dom';
import {ErrorHandler, ErrorModal, fetchWithErrorHandling} from "../components/ErrorHandler";

function Chat() {
    const {chatId} = useParams();
    const chat = useLoaderData();
    const [messages, setMessages] = useState(chat.messages || []); // сообщения
    const [newMessage, setNewMessage] = useState(''); // новое сообщение
    const messagesEndRef = useRef(null); // ссылка для прокрутки в конец чата
    const [connection, setConnection] = useState(null); // SignalR соединение

    const [skip, setSkip] = useState(chat.messages.length);
    const take = 20;
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);

    const [error, setError] = useState(null); // Состояние для ошибки
    const errorHandler = new ErrorHandler(setError);
    useEffect(() => {
        errorHandler.setErrorCallback(setError); // Передаем setError в errorHandler

    }, []);
    console.log(chat);
    console.log("Сообщения", messages);


    const closeErrorModal = () => {
        setError(null); // Закрытие модального окна
    };


    // Настройка SignalR
    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(`https://${process.env.REACT_APP_API_BASE_URL}/chatHub?chatId=${chatId}`)
            .withAutomaticReconnect()
            .build();

        setConnection(connect);

        connect.start()
            .then(() => console.log("Connected to SignalR"))
            .catch((err) => console.error("SignalR Connection Error: ", err));

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [chatId]);

    // Обработка сообщений от SignalR
    useEffect(() => {
        if (connection) {
            connection.on("ReceiveMessage", (message) => {
                if (message.senderId !== localStorage.getItem("user_id")) {
                    setMessages((prevMessages) => [message, ...prevMessages]);
                }
            });

            return () => {
                connection.off("ReceiveMessage");
            };
        }
    }, [connection]);

    const sendMessage = async () => {
        if (newMessage.trim()) {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
            }
            setNewMessage("");

            let sendedMsg = {
                text: newMessage,
                sendDate: new Date().toISOString(),
                senderId: localStorage.getItem("user_id"),
                isReaded: false,
            }
            const updatedMessages = [
                sendedMsg,
                ...messages,
            ];
            setMessages(updatedMessages);


            const data = await fetchWithErrorHandling(
                `https://${process.env.REACT_APP_API_BASE_URL}/api/Chat/${chatId}/messages`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        senderId: localStorage.getItem("user_id"),
                        text: newMessage,
                    }),
                },
                null,
                errorHandler
            );
            if (data !== null) {
                console.log(data);
                sendedMsg.sendDate = data.sendDate;
                sendedMsg.isReaded = data.isReaded;
                sendedMsg.id = data.id;
            }
        }
    };

    const loadMessages = async () => {
        if (loading) return;
        setLoading(true);


        const response = await fetchWithErrorHandling(
            `https://${process.env.REACT_APP_API_BASE_URL}/api/Chat/${chatId}/messages?skip=${skip}&take=${take}`,
            {
                method: "GET",
                credentials: "include",
            },
            null,
            errorHandler
        );
        setMessages(prev => [...prev, ...response]);
        setSkip(prev => prev + take);


        if (response.length < take) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
        setLoading(false);
    };

    const handleScroll = () => {
        if (!hasMore || loading) {
            return;
        };

        const element = containerRef.current;
        console.log(element.scrollTop)
        console.log(element.scrollHeight)
        console.log(element.clientHeight)

        if (element.scrollHeight + element.scrollTop < element.clientHeight * 1.2) {
            console.log("ПУсти сука");
            loadMessages();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // useEffect(() => {
    //
    // }, [messages]);

    return (
        <div id="ChatWrapper">
            <div id="ChatContainer">
                <div id="ChatHeaderContainer">
                    <div id="ChatHeader">{chat.interlocutor.fio}</div>
                    <div id="ChatDelimiter"></div>
                </div>

                <div id="ChatCourcesCardsWrapper">
                    <div id="ChatCourcesCardsContainer"
                         ref={containerRef}
                         onScroll={handleScroll}>
                        <div ref={messagesEndRef}/>

                        {messages.map((message, index) => (
                            <div key={message.id}
                                 className={`ChatMessage ${message.senderId === localStorage.getItem("user_id") ? 'fromMe' : 'fromBro'}`}>
                                <div className="ChatMessageText">{message.text}</div>
                                <div className="ChatMessageDate">{new Date(message.sendDate).toLocaleString()}</div>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="message-input-container">
                    <textarea
                        className="message-input"
                        placeholder="Начните писать сообщение..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    ></textarea>
                    <button className="send-button" onClick={sendMessage} style={{all: "unset"}}>
                        ➡
                    </button>
                </div>
            </div>
            {error && <ErrorModal errorMessage={error} onClose={closeErrorModal}/>}
        </div>
    );
}

export default Chat;
