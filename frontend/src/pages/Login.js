import '../styles/Login.css'
import '../styles/fonts.css'
import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from 'react-router-dom';
import ProfileIcon from '../assets/icons/profile_icon.svg'
import PasswordIcon from '../assets/icons/password_icon.svg'


function Login() {

    return (
        <div id="LoginWrapper">


            <div id="LoginContainer">

                <div id="LoginHeaderContainer">

                    <div id="LoginHeader">TRENO</div>
                    <div id="LoginDelimiter"></div>
                </div>

                <div id="LoginFormContainer">

                    <div id="LoginFormInputHeader">Логин входа</div>

                    <div id="LoginFormInputLogin">
                        <img id="LoginFormInputLoginIcon" src={ProfileIcon} alt="Иконпка профиля"
                             style={{width: "20px"}}/>
                        <input id="LoginFormLoginInput" placeholder="example@mail.ru"/>
                    </div>

                    <div id="LoginFormInputHeader">Пароль входа</div>

                    <div id="LoginFormInputPassword">
                        <img id="LoginFormInputPasswordIcon" src={PasswordIcon} alt="Иконка замка"
                             style={{width: "20px"}}/>
                        <input id="LoginFormPasswordInput" placeholder="*******"/>
                    </div>

                    <div id="LoginFormPasswordForgotten">Забыли пароль?</div>

                    <div id="LoginFormSubmit">
                        <button id="LoginFormSubmitButton">Войти</button>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
