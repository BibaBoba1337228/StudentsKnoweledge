import React, {useState, useEffect} from 'react';
import '../../styles/LeftMenu.css';
import '../../styles/fonts.css';
import MainPageIcon from '../../assets/icons/main_page_icon.svg';
import CourcesIcon from '../../assets/icons/courses_icon.svg';
import MessengerIcon from '../../assets/icons/chats_icon.svg';
import NotificationIcon from '../../assets/icons/notification_icon.svg';
import ProfileIcon from '../../assets/icons/profile_icon.svg';
import SettingsIcon from '../../assets/icons/settings_icon.svg';
import LogoutIcon from '../../assets/icons/logout_icon.svg';
import KeyIcon from '../../assets/icons/key.svg';
import {Link, useNavigate} from "react-router-dom";
import {fetchWithAuth} from "../../api/fetchWithAuth";

function LeftMenu({onMenuToggle}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [role, setRole] = useState(null); // To store the role
    const navigate = useNavigate();

    useEffect(() => {
        // Get role from localStorage
        const storedRole = localStorage.getItem('role');
        setRole(storedRole);  // Update role state
    }, []);

    const toggleMenu = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        if (onMenuToggle) {
            onMenuToggle(newState);  // Notify parent of state change
        }
    };

    const handleLogoutClick = async (e) => {
        try {
            const response = await fetchWithAuth(`https://${process.env.REACT_APP_API_BASE_URL}/api/Login/logout`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                localStorage.clear();
                navigate('/login');
            } else {
                console.log('Ошибка входа. Проверьте логин и пароль.');
            }
        } catch (error) {
            console.log('Ошибка подключения. Пожалуйста, попробуйте позже.');
        }
    };

    return (
        <div id="LeftMenuContainer" className={isCollapsed ? 'collapsed' : ''}>
            <div id="LeftMenuTopPagesContainer">
                <h1 id="LeftMenuHeader" onClick={toggleMenu}>T</h1>
                <div id="LeftMenuTopPages" className={isCollapsed ? 'collapsed' : ''}>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'}
                         onClick={() => navigate('/system/courses')}
                         style={{cursor: "pointer"}}>
                        <img src={CourcesIcon} alt="Courses icon" style={{width: "20px"}}/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Курсы</p>}
                    </div>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'}
                         onClick={() => navigate('/system/chats')}
                         style={{cursor: "pointer"}}>
                        <img src={MessengerIcon} alt="Messenger icon" style={{width: "20px"}}/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Сообщения</p>}
                    </div>
                    {/* Conditionally render Admin Panel link based on role */}
                    {role === '3' && (
                        <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'}
                             onClick={() => navigate('/system/admin')}
                             style={{cursor: "pointer"}}>
                            <img src={KeyIcon} alt="Key icon" style={{width: "20px"}}/>
                            {!isCollapsed && <p className="LeftMenuTopPageName">Админ-панель</p>}
                        </div>
                    )}
                </div>
            </div>

            <div id="LeftMenuDownPagesContainer">
                <div id="LeftMenuTopPages" className={isCollapsed ? 'collapsed' : ''}>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'}
                         onClick={() => navigate(`/system/profile/${localStorage.getItem("user_id")}`)}
                         style={{cursor: "pointer"}}>
                        <img src={ProfileIcon} alt="Profile icon" style={{width: "20px"}}/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Профиль</p>}
                    </div>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'} onClick={() => handleLogoutClick()}
                         style={{cursor: "pointer"}}>
                        <img src={LogoutIcon} alt="Logout icon" style={{width: "20px"}}/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Выйти</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftMenu;
