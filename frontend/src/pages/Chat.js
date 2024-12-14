import '../styles/Chat.css';
import '../styles/fonts.css';
import {useState, useRef, useEffect} from 'react';
import {HubConnectionBuilder} from "@microsoft/signalr";
import {useParams, useLoaderData} from 'react-router-dom';

function Chat() {
    const {chatId} = useParams();
    const chat = useLoaderData();
    const [messages, setMessages] = useState(chat.messages || []); // сообщения
    const [newMessage, setNewMessage] = useState(''); // новое сообщение
    const messagesEndRef = useRef(null); // ссылка для прокрутки в конец чата
    const [connection, setConnection] = useState(null); // SignalR соединение

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
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            return () => {
                connection.off("ReceiveMessage");
            };
        }
    }, [connection]);

    // Функция для отправки сообщения
    const sendMessage = () => {
        if (newMessage.trim()) {
            if (connection) {
                connection.invoke("SendMessage", chatId, newMessage)
                    .then(() => setNewMessage(""))
                    .catch((err) => console.error("Message send error: ", err));
            }

            const updatedMessages = [
                ...messages,
                {
                    text: newMessage,
                    sendDate: new Date().toISOString(),
                    senderId: localStorage.getItem("user_id"),
                },
            ];
            setMessages(updatedMessages);
        }
    };

    // Функция для отправки сообщения при нажатии Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // Shift+Enter оставляет перенос строки
            e.preventDefault();
            sendMessage();
        }
    };

    // Прокрутка к последнему сообщению при загрузке
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]); // Прокручиваем при изменении списка сообщений

    return (
        <div id="ChatWrapper">
            <div id="ChatContainer">
                <div id="ChatHeaderContainer">
                    <div id="ChatHeader">{chat.interlocutor.fio}</div>
                    <div id="ChatDelimiter"></div>
                </div>

                <div id="ChatCourcesCardsWrapper">
                    <div id="ChatCourcesCardsContainer">
                        {messages.map((message, index) => (
                            <div key={index}
                                 className={`ChatMessage ${message.senderId === localStorage.getItem("user_id") ? 'fromMe' : 'fromBro'}`}>
                                <div className="ChatMessageText">{message.text}</div>
                                <div className="ChatMessageDate">{new Date(message.sendDate).toLocaleString()}</div>
                            </div>
                        ))}

                        {/* Элемент для прокрутки в конец чата */}
                        <div ref={messagesEndRef}/>
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
        </div>
    );
}

export default Chat;
