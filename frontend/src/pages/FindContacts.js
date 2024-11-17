import React, {useState} from 'react';
import {Navigate, Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import '../styles/FindContacts.css';
import Chats from '../assets/images/profile.svg'
import add from '../assets/icons/add.svg'
import SearchIcon from "../assets/icons/search.svg";


function FindContacts() {

    const navigate = useNavigate();

    return (
        <div id="FindContactsWrapper">


            <div id="FindContactsContainer">

                <div id="MyCourcesHeaderContainer">

                    <div id="MyCourcesHeaderAndSearchBarContainer">
                        <div id="MyCourcesHeader">Найти контакты</div>
                        <div id="MyCourcesSearchBar">
                            <input id="MyCourcesSearchBarInput" placeholder="Поиск контакта"/>
                            <img src={SearchIcon} alt="Иконка поиска" style={{width: '25px'}}/>

                        </div>
                    </div>

                    <div id="MyCourcesDelimiter"></div>
                </div>

                <div id="FindContactsCourceContainer">

                    <div className="FindContactsInfoBlockWithChatsImage"
                         onClick={() => navigate('/system/profile/profileid')}
                         style={{cursor: "pointer"}}>

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="FindContactsTextBlockWithChatsImage">
                                <div className="FindContactsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>

                            </div>
                        </div>


                    </div>
                    <div className="FindContactsInfoBlockWithChatsImage">

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="FindContactsTextBlockWithChatsImage">
                                <div className="FindContactsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>

                            </div>
                        </div>


                    </div>

                    <div className="FindContactsInfoBlockWithChatsImage">

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="FindContactsTextBlockWithChatsImage">
                                <div className="FindContactsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>

                            </div>
                        </div>


                    </div>

                    <div className="FindContactsInfoBlockWithChatsImage">

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="FindContactsTextBlockWithChatsImage">
                                <div className="FindContactsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>

                            </div>
                        </div>


                    </div>

                    <div className="FindContactsInfoBlockWithChatsImage">

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="FindContactsTextBlockWithChatsImage">
                                <div className="FindContactsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>

                            </div>
                        </div>


                    </div>

                    <div className="FindContactsInfoBlockWithChatsImage">

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="FindContactsTextBlockWithChatsImage">
                                <div className="FindContactsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>

                            </div>
                        </div>


                    </div>

                    <div className="FindContactsInfoBlockWithChatsImage">

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <img src={Chats} alt="Chats" style={{width: '80px'}}/>

                            <div className="FindContactsTextBlockWithChatsImage">
                                <div className="FindContactsInfoBlockHeaderWithChatsImage">Ерофеев А.А.</div>

                            </div>
                        </div>


                    </div>


                </div>

            </div>

        </div>
    );
}

export default FindContacts;
