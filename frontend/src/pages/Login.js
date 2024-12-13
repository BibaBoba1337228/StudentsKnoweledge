import '../styles/Login.css'
import '../styles/fonts.css'
import {createBrowserRouter, RouterProvider, Outlet, useNavigate, Link} from 'react-router-dom';
import ProfileIcon from '../assets/icons/profile_icon.svg'
import PasswordIcon from '../assets/icons/password_icon.svg'
import {useState} from "react";
import {fetchWithAuth} from "../api/fetchWithAuth";
import ErrorBoundary from "../components/ErrorBoundary";


function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [errorText, setErrorText] = useState('Ошибка');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const login_response = await fetchWithAuth(`https://${process.env.REACT_APP_API_BASE_URL}/api/Login/login`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: login,
                    password: password
                })
            });

            if (login_response.status === 200) {
                const data = await login_response.json(); // Assuming this includes user info with the role

                // Save relevant user information to localStorage
                const {user_id, role, first_name, last_name, middle_name} = data;

                // Format the user's name
                const formattedName = `${first_name} ${last_name} ${middle_name}`;
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('role', role); // Save role for access control
                localStorage.setItem('fio', formattedName);

                // Navigate to the courses page
                navigate('/system/courses');
            } else {
                // Handle errors (e.g., invalid credentials)
                setIsErrorOpen(true);
                setErrorText('Неверный логин или пароль. Попробуйте снова.');
            }
        } catch (error) {
            if (error.status === 401) {
                setIsErrorOpen(true);
                setErrorText('Неверный логин или пароль. Попробуйте снова.');
            }
        }
    };


    return (
        <div id="LoginWrapper">


            <div id="LoginContainer">

                <div id="LoginHeaderContainer">

                    <div id="LoginHeader">TRENO</div>
                    <div id="LoginDelimiter"></div>
                </div>

                <div id="LoginFormContainer">
                    <form onSubmit={handleSubmit}>

                        <div id="LoginFormInputHeader">Логин входа</div>

                        <div id="LoginFormInputLogin">
                            <img id="LoginFormInputLoginIcon" src={ProfileIcon} alt="Иконпка профиля"
                                 style={{width: "20px"}}/>
                            <input id="LoginFormLoginInput" placeholder="Ваш логин"

                                   value={login}
                                   onChange={(e) => setLogin(e.target.value)}
                                   required

                            />
                        </div>

                        <div id="LoginFormInputHeader">Пароль входа</div>

                        <div id="LoginFormInputPassword">
                            <img id="LoginFormInputPasswordIcon" src={PasswordIcon} alt="Иконка замка"
                                 style={{width: "20px"}}/>
                            <input id="LoginFormPasswordInput" placeholder="*******"

                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                            />
                        </div>


                        <div id="LoginFormSubmit">
                            <button id="LoginFormSubmitButton" type="submit"
                                    style={{cursor: "pointer"}}>Войти
                            </button>
                        </div>
                    </form>

                </div>

                <ErrorBoundary isOpen={isErrorOpen} setIsOpen={setIsErrorOpen} errorText={errorText}/>

            </div>

        </div>
    );
}

export default Login;
