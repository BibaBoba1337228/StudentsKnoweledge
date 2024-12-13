import React, {useEffect, useState} from 'react';
import {useLoaderData, useNavigate,} from 'react-router-dom';
import '../styles/MyChats.css';
import Chats from '../assets/images/profile.svg'
import add from '../assets/icons/add.svg'


function MyChats() {
    const chats = useLoaderData();
    const navigate = useNavigate();

    console.log(chats);
    useEffect(() => {

        console.log("После рендера",chats);
    }, [])
    return (
        <div id="MyChatsWrapper">
            <div id="MyChatsContainer">
                <div id="MyChatsHeaderContainer">

                    <div id="MyChatsHeader">Мои чаты</div>
                    <div id="MyChatsDelimiter"></div>
                </div>
                <div id="MyChatsCourceContainer">
                    {chats.map((chat) => (

                        <div className="MyChatsInfoBlockWithChatsImage" onClick={() => navigate(`/system/chats/${chat.id}`)}
                             style={{cursor: "pointer"}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                                <div className="MyChatsTextBlockWithChatsImage">
                                    <div className="MyChatsInfoBlockHeaderWithChatsImage">{chat.interlocutor?.fio || "ошибка загрузки пользователя"}</div>
                                    <div className="MyChatsInfoBlockInfoWithChatsImage">
                                        {chat.lastMessage?.Text || "Здесь пока нет сообщений..."}
                                    </div>
                                </div>
                            </div>
                            <div className="MyChatsTextBlockWithChatsImage">
                                <div className="MyChatsInfoBlockInfoWithChatsImage">
                                    {chat.lastMessage?.sendingDate}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default MyChats;
