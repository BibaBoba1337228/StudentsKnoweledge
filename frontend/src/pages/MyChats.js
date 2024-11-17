import React, {useState} from 'react';
import {Navigate, Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import '../styles/MyChats.css';
import Chats from '../assets/images/profile.svg'
import add from '../assets/icons/add.svg'


function MyChats() {

    const navigate = useNavigate();

    return (
        <div id="MyChatsWrapper">


            <div id="MyChatsContainer">

                <div id="MyChatsHeaderContainer">

                    <div id="MyChatsHeader">Мои чаты</div>
                    <div id="MyChatsDelimiter"></div>
                </div>

                <div id="MyChatsCourceContainer">

                    <div className="MyChatsInfoBlockWithChatsImage" onClick={() => navigate('/system/chats/chat')}
                         style={{cursor: "pointer"}}>

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="MyChatsTextBlockWithChatsImage">
                                <div className="MyChatsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>
                                <div className="MyChatsInfoBlockInfoWithChatsImage">
                                    Ну пожалуйста скинь все лабы по ТП
                                </div>
                            </div>
                        </div>

                        <div className="MyChatsTextBlockWithChatsImage">
                            <div className="MyChatsInfoBlockInfoWithChatsImage">
                                23.03.2024 13:54
                            </div>
                        </div>


                    </div>

                    <div className="MyChatsInfoBlockWithChatsImage" onClick={() => navigate('/system/chats/chat')}
                         style={{cursor: "pointer"}}>

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="MyChatsTextBlockWithChatsImage">
                                <div className="MyChatsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>
                                <div className="MyChatsInfoBlockInfoWithChatsImage">
                                    Ну пожалуйста скинь все лабы по ТП
                                </div>
                            </div>
                        </div>

                        <div className="MyChatsTextBlockWithChatsImage">
                            <div className="MyChatsInfoBlockInfoWithChatsImage">
                                23.03.2024 13:54
                            </div>
                        </div>


                    </div>

                    <div className="MyChatsInfoBlockWithChatsImage">

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="MyChatsTextBlockWithChatsImage">
                                <div className="MyChatsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>
                                <div className="MyChatsInfoBlockInfoWithChatsImage">
                                    Ну пожалуйста скинь все лабы по ТП
                                </div>
                            </div>
                        </div>

                        <div className="MyChatsTextBlockWithChatsImage">
                            <div className="MyChatsInfoBlockInfoWithChatsImage">
                                23.03.2024 13:54
                            </div>
                        </div>


                    </div>

                    <div className="MyChatsInfoBlockWithChatsImage">

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="MyChatsTextBlockWithChatsImage">
                                <div className="MyChatsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>
                                <div className="MyChatsInfoBlockInfoWithChatsImage">
                                    Ну пожалуйста скинь все лабы по ТП
                                </div>
                            </div>
                        </div>

                        <div className="MyChatsTextBlockWithChatsImage">
                            <div className="MyChatsInfoBlockInfoWithChatsImage">
                                23.03.2024 13:54
                            </div>
                        </div>


                    </div>

                    <div className="MyChatsInfoBlockWithChatsImage">

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="MyChatsTextBlockWithChatsImage">
                                <div className="MyChatsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>
                                <div className="MyChatsInfoBlockInfoWithChatsImage">
                                    Ну пожалуйста скинь все лабы по ТП
                                </div>
                            </div>
                        </div>

                        <div className="MyChatsTextBlockWithChatsImage">
                            <div className="MyChatsInfoBlockInfoWithChatsImage">
                                23.03.2024 13:54
                            </div>
                        </div>


                    </div>

                    <div className="MyChatsInfoBlockWithChatsImage">

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="MyChatsTextBlockWithChatsImage">
                                <div className="MyChatsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>
                                <div className="MyChatsInfoBlockInfoWithChatsImage">
                                    Ну пожалуйста скинь все лабы по ТП
                                </div>
                            </div>
                        </div>

                        <div className="MyChatsTextBlockWithChatsImage">
                            <div className="MyChatsInfoBlockInfoWithChatsImage">
                                23.03.2024 13:54
                            </div>
                        </div>


                    </div>
                    <div className="MyChatsInfoBlockWithChatsImage">

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="MyChatsTextBlockWithChatsImage">
                                <div className="MyChatsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>
                                <div className="MyChatsInfoBlockInfoWithChatsImage">
                                    Ну пожалуйста скинь все лабы по ТП
                                </div>
                            </div>
                        </div>

                        <div className="MyChatsTextBlockWithChatsImage">
                            <div className="MyChatsInfoBlockInfoWithChatsImage">
                                23.03.2024 13:54
                            </div>
                        </div>


                    </div>


                </div>

            </div>

        </div>
    );
}

export default MyChats;
