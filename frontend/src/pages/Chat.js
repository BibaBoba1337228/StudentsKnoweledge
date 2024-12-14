import '../styles/Chat.css'
import '../styles/fonts.css'
import {createBrowserRouter, RouterProvider, Outlet, useNavigate, useParams, useLoaderData} from 'react-router-dom';
import {useState, useRef, useEffect} from 'react';

function Chat() {
    const {chatId} = useParams();
    const chat = useLoaderData();
    const [messages, setMessages] = useState(chat.messages || []); // сообщения
    const [newMessage, setNewMessage] = useState(''); // новое сообщение
    const messagesEndRef = useRef(null); // ссылка для прокрутки в конец чата

    // Функция для отправки сообщения
    const sendMessage = () => {
        if (newMessage.trim()) {
            const updatedMessages = [...messages, {text: newMessage, date: new Date().toLocaleString(), fromMe: true}];
            setMessages(updatedMessages);
            setNewMessage('');
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
                            <div key={index} className={`ChatMessage ${message.fromMe ? 'fromMe' : ''}`}>
                                <div className="ChatMessageText">{message.text}</div>
                                <div className="ChatMessageDate">{message.date}</div>
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
