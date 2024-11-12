
import './styles/LeftMenu.css'
import './styles/fonts.css'
import MainPageIcon from './assets/icons/main_page_icon.svg'
import CourcesIcon from './assets/icons/courses_icon.svg'
import MessengerIcon from './assets/icons/chats_icon.svg'
import NotificationIcon from './assets/icons/notification_icon.svg'
import ProfileIcon from './assets/icons/profile_icon.svg'
import SettingsIcon from './assets/icons/settings_icon.svg'
import LogoutIcon from './assets/icons/logout_icon.svg'

function LeftMenu() {
    return (
        <div id="LeftMenuContainer">

            <div id="LeftMenuTopPagesContainer">

                <h1 id="LeftMenuHeader">T</h1>
                <div id="LeftMenuTopPages">

                    <div className="LeftMenuTopPage">
                        <img src={MainPageIcon} alt="MainPage icon" />
                        <p className="LeftMenuTopPageName">Главная</p>
                    </div>
                    <div className="LeftMenuTopPage">
                        <img src={CourcesIcon} alt="Messenger icon"/>
                        <p className="LeftMenuTopPageName">Курсы</p>
                    </div>
                    <div className="LeftMenuTopPage">
                        <img src={MessengerIcon} alt="Messenger icon"/>
                        <p className="LeftMenuTopPageName">Сообщения</p>
                    </div>
                    <div className="LeftMenuTopPage">
                        <img src={NotificationIcon} alt="Messenger icon"/>
                        <p className="LeftMenuTopPageName">Уведомления</p>
                    </div>


                </div>

            </div>

            <div id="LeftMenuDownPagesContainer">

                <div id="LeftMenuTopPages">


                    <div className="LeftMenuTopPage">
                        <img src={ProfileIcon} alt="Messenger icon"/>
                        <p className="LeftMenuTopPageName">Профиль</p>
                    </div>
                    <div className="LeftMenuTopPage">
                        <img src={SettingsIcon} alt="Messenger icon"/>
                        <p className="LeftMenuTopPageName">Нстройки</p>
                    </div>
                    <div className="LeftMenuTopPage">
                        <img src={LogoutIcon} alt="Messenger icon"/>
                        <p className="LeftMenuTopPageName">Выйти</p>
                    </div>


                </div>

            </div>


        </div>
    );
}

export default LeftMenu;
