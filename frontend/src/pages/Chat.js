import '../styles/Chat.css';
import '../styles/fonts.css';
import React, {useState, useRef, useEffect} from 'react';
import {HubConnectionBuilder} from "@microsoft/signalr";
import {useParams, useLoaderData} from 'react-router-dom';
import {ErrorHandler, ErrorModal, fetchWithErrorHandling} from "../components/ErrorHandler";
import Readed from "../assets/icons/readed.png"
import Unreaded from "../assets/icons/unreaded.png"

function Chat() {
    const {chatId} = useParams();
    const chat = useLoaderData();
    const [messages, setMessages] = useState(chat.messages || []);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const connectionRef = useRef(null);

    const [skip, setSkip] = useState(chat.messages.length);
    const take = 20;
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);

    const [error, setError] = useState(null);
    const errorHandler = new ErrorHandler(setError);

    console.log(messages);

    useEffect(() => {
        errorHandler.setErrorCallback(setError);
    }, []);

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(`https://${process.env.REACT_APP_API_BASE_URL}/chatHub?chatId=${chatId}`)
            .withAutomaticReconnect()
            .build();

        connectionRef.current = connect;

        connect.start()
            .then(() => console.log("Connected to SignalR"))
            .catch((err) => console.error("SignalR Connection Error: ", err));

        return () => {
            if (connectionRef.current) {
                connectionRef.current.stop().then(() => {
                }).catch((err) => {
                    console.error("Error while stopping connection:", err);
                });
            }
        };
    }, [chatId]);


    useEffect(() => {
        if (!messages || messages.length === 0) return;

        const currentUserId = localStorage.getItem("user_id");

        const unreadMessageIds = messages
            .filter((m) => m.senderId !== currentUserId && !m.isReaded)
            .map((m) => m.id);

        if (unreadMessageIds.length > 0) {
            console.log("Я", currentUserId);
            console.log("Сообщения на прочитку", unreadMessageIds);
            markMessagesAsRead(chatId, unreadMessageIds);
        }
    }, [messages]);


    useEffect(() => {
        const connection = connectionRef.current;

        if (connection) {
            connection.on("ReceiveMessage", (message) => {
                if (message.senderId !== localStorage.getItem("user_id")) {
                    setMessages((prevMessages) => [message, ...prevMessages]);
                }
            });
            connection.on("MessagesRead", (data) => {
                console.log("Сокет", data);

                if (parseInt(data.chatId) === parseInt(chatId)) {
                    setMessages((prevMessages) =>
                        prevMessages.map((msg) => {
                            if (data.messageIds.includes(msg.id)) {
                                console.log("Поймал сообщение", msg);
                                return {
                                    ...msg,
                                    isReaded: true
                                };
                            }
                            return msg;
                        })
                    );
                }
            });
            return () => {
                connection.off("ReceiveMessage");
                connection.off("MessagesRead");
            };
        }
    }, []);

    const markMessagesAsRead = async (chatId, messageIds) => {
        try {
            await fetchWithErrorHandling(
                `https://${process.env.REACT_APP_API_BASE_URL}/api/Chat/${chatId}/messages/read`,
                {
                    method: "POST",
                    body: JSON.stringify(messageIds),
                },
                null,
                errorHandler
            );
            console.log("Отправил прочитку", messageIds);
        } catch (error) {
            console.error("Error marking messages as read:", error);
        }
    };

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
            };
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
                sendedMsg.sendDate = data.sendDate;
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
        }
        ;

        const element = containerRef.current;
        if (element.scrollHeight + element.scrollTop < element.clientHeight * 1.2) {
            loadMessages();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const closeErrorModal = () => {
        setError(null);
    };


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
                                <div>
                                    {message.isReaded ?
                                        <img src={Readed} alt="readed" style={{height: "15px"}}/> :
                                    <img src={Unreaded} alt="unreaded" style={{height: "15px"}}/>}
                                </div>
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
