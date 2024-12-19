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
import {HubConnectionBuilder} from '@microsoft/signalr';
import HaveNotifs from '../../assets/icons/notification2.svg';

function LeftMenu({onMenuToggle}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [role, setRole] = useState(null); // To store the role
    const [notifications, setNotifications] = useState([]);
    const [hubConnection, setHubConnection] = useState(null); // For storing the connection
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    console.log(`https://${process.env.REACT_APP_API_BASE_URL}/notificationHub?userId=${localStorage.getItem("user_id")}`)

    useEffect(() => {
        // Fetch notifications on load
        const getNotifications = async () => {
            const response = await fetchWithAuth(`https://${process.env.REACT_APP_API_BASE_URL}/api/Notification/user`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setNotifications(data.reverse());
            }
        };

        getNotifications();

        // Create connection with the server
        const connection = new HubConnectionBuilder()
            .withUrl(`https://${process.env.REACT_APP_API_BASE_URL}/notificationHub?userId=${localStorage.getItem("user_id")}`)
            .build();

        connection.on('ReceiveNotification', (notification) => {
            setNotifications(prevNotifications => [notification, ...prevNotifications]);
            console.log("Бэдра")
        });

        connection.start()
            .then(() => console.log("Socket connection established"))
            .catch((err) => console.error("Socket connection error: ", err));

        setHubConnection(connection);

        return () => {
            if (hubConnection) {
                hubConnection.stop();
            }
        };
    }, []);


    const markAllAsRead = async () => {
        try {
            const response = await fetchWithAuth(
                `https://${process.env.REACT_APP_API_BASE_URL}/api/Notification/user/mark-as-read`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            );

            if (response.ok) {
                // Если запрос успешен, очищаем список уведомлений
                setNotifications([]);
                alert("Все уведомления отмечены как прочитанные.");
            } else {
                console.error("Ошибка при попытке отметить уведомления как прочитанные.");
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
        }
    };


    useEffect(() => {
        // Get role from localStorage
        const storedRole = localStorage.getItem('role');
        setRole(storedRole);
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
                console.log('Login error. Please check your credentials.');
            }
        } catch (error) {
            console.log('Connection error. Please try again later.');
        }
    };

    const openNotificationModal = () => {
        setIsModalOpen(prevState => !prevState);  // Toggle the modal open/close
    };

    const closeNotificationModal = () => {
        setIsModalOpen(false);  // Explicitly close the modal
    };

    // Close modal when clicking outside of it
    const handleClickOutside = (event) => {
        if (event.target.id === 'modal-overlay') {
            closeNotificationModal();
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
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'} onClick={openNotificationModal}
                         style={{cursor: "pointer"}}>
                        <img src={notifications.length > 0 ? HaveNotifs : NotificationIcon} alt="Notification icon"
                             style={{width: "20px"}}/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Уведомления</p>}
                    </div>
                    <div className={isCollapsed ? 'collapsed' : 'LeftMenuTopPage'} onClick={() => {navigate('/system/schedule/')}}
                         style={{cursor: "pointer"}}>
                        <img src={CourcesIcon} alt="Schedule icon"
                             style={{width: "20px"}}/>
                        {!isCollapsed && <p className="LeftMenuTopPageName">Расписание</p>}
                    </div>
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

            {isModalOpen && (
                <div id="modal-overlay" className="modal-overlay" onClick={handleClickOutside}>
                    <div className="modal-content">
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '15px'
                            }}
                        >
                            <h2 style={{margin: 0}}>Уведомления</h2>
                            <div
                                onClick={markAllAsRead}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '30px',
                                    height: '30px',
                                    color: 'white',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.9)'
                                }}
                                title="Отметить все как прочитанные"
                            >
                                {/* Галочка в виде SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="black"
                                    width="20px"
                                    height="20px"
                                >
                                    <path d="M9 16.17l-4.41-4.42L3 13.34 9 19.34 21 7.34 19.59 6l-10.59 10.59z"/>
                                </svg>
                            </div>
                        </div>
                        <ul className="notification-list">
                            {notifications.map((notification, index) => (
                                <li key={index} style={{marginBottom: '10px'}}>
                                    <a
                                        href={notification.url}
                                        style={{all: 'unset', cursor: 'pointer', marginBottom: '10px'}}
                                    >
                                        {notification.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}


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
