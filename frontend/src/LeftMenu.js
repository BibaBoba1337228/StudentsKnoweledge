import React, { useState } from 'react';
import './styles/LeftMenu.css';
import './styles/fonts.css';
import MainPageIcon from './assets/icons/main_page_icon.svg';
import CourcesIcon from './assets/icons/courses_icon.svg';
import MessengerIcon from './assets/icons/chats_icon.svg';
import NotificationIcon from './assets/icons/notification_icon.svg';
import ProfileIcon from './assets/icons/profile_icon.svg';
import SettingsIcon from './assets/icons/settings_icon.svg';
import LogoutIcon from './assets/icons/logout_icon.svg';

function LeftMenu() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div id="LeftMenuContainer" className={isCollapsed ? 'collapsed' : ''}>
            <div id="LeftMenuTopPagesContainer">
                <h1 id="LeftMenuHeader">T</h1>
                <div id="LeftMenuTopPages" className={isCollapsed ? 'collapsed' : ''}>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'} onClick={toggleMenu}>
                        <img src={MainPageIcon} alt="MainPage icon" />
                        {!isCollapsed && <p className="LeftMenuTopPageName">Главная</p>}
                    </div>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'}>
                        <img src={CourcesIcon} alt="Courses icon"/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Курсы</p>}
                    </div>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'}>
                        <img src={MessengerIcon} alt="Messenger icon"/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Сообщения</p>}
                    </div>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'}>
                        <img src={NotificationIcon} alt="Notification icon"/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Уведомления</p>}
                    </div>
                </div>
            </div>

            <div id="LeftMenuDownPagesContainer">
                <div id="LeftMenuTopPages" className={isCollapsed ? 'collapsed' : ''}>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'}>
                        <img src={ProfileIcon} alt="Profile icon"/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Профиль</p>}
                    </div>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'}>
                        <img src={SettingsIcon} alt="Settings icon"/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Настройки</p>}
                    </div>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'}>
                        <img src={LogoutIcon} alt="Logout icon"/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Выйти</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftMenu;
