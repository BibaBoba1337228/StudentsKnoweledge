import React from 'react';
import {useLoaderData, useNavigate,} from 'react-router-dom';
import '../styles/MyChats.css';
import add from "../assets/icons/add.svg";
import Readed from "../assets/icons/readed.png";
import Unreaded from "../assets/icons/unreaded.png";


function MyChats() {
    const chats = useLoaderData();
    const navigate = useNavigate();

    return (
        <div id="MyChatsWrapper">
            <div id="MyChatsContainer">
                <div id="MyChatsHeaderContainer">

                    <div id="MyChatsHeader">Мои чаты</div>
                    <div id="MyChatsDelimiter"></div>
                </div>
                <div className="MyChatsFindContactsWrapper"
                     onClick={() => navigate('/system/findcontacts')}
                     style={{cursor: "pointer"}}>
                    <div className="MyChatsFindContactsText">Найти контакты</div>
                    <img src={add} alt="add" style={{width: '20px', marginLeft: '10px'}}/>
                </div>
                <div id="MyChatsCourceContainer">
                    {chats.map((chat) => (

                        <div className="MyChatsInfoBlockWithChatsImage"
                             onClick={() => navigate(`/system/chats/${chat.id}`)}
                             style={{cursor: "pointer"}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <img
                                    src={chat.interlocutor?.photo.includes('files') ? `https://${process.env.REACT_APP_API_BASE_URL}/${chat.interlocutor?.photo}` : `https://${process.env.REACT_APP_API_BASE_URL}/files/${chat.interlocutor?.photo}`}
                                    alt="Chats" style={{width: '80px'}}/>

                                <div className="MyChatsTextBlockWithChatsImage">
                                    <div
                                        className="MyChatsInfoBlockHeaderWithChatsImage">{chat.interlocutor?.fio || "ошибка загрузки пользователя"}</div>
                                    <div className="MyChatsInfoBlockInfoWithChatsImage">
                                        {chat.lastMessage?.text || "Здесь пока нет сообщений..."}
                                    </div>
                                </div>
                            </div>
                            {
                                chat.lastMessage ? <div className="MyChatsTextBlockWithChatsImage">
                                    <div className="MyChatsInfoBlockInfoWithChatsImage">
                                        {new Date(chat.lastMessage.sendDate).toLocaleString()}
                                    </div>
                                    <div>
                                        {chat.lastMessage.isReaded ?
                                            <img src={Readed} alt="readed" style={{height: "15px"}}/> :
                                            <img src={Unreaded} alt="unreaded" style={{height: "15px"}}/>}
                                    </div>
                                </div> : ""
                            }

                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default MyChats;
