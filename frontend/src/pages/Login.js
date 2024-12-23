import '../styles/Login.css'
import '../styles/fonts.css'
import {useNavigate} from 'react-router-dom';
import ProfileIcon from '../assets/icons/profile_icon.svg'
import PasswordIcon from '../assets/icons/password_icon.svg'
import {useState} from "react";
import {fetchWithAuth} from "../api/fetchWithAuth";
import ErrorBoundary from "../components/ErrorBoundary";
import Hide from "../assets/icons/Hide.svg"
import Show from "../assets/icons/Show.svg"

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [errorText, setErrorText] = useState('Ошибка');

    const [showPassword, setShowPassword] = useState(false);

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
                const data = await login_response.json();

                const {user_id, role, first_name, last_name, middle_name} = data;

                const formattedName = `${first_name} ${last_name} ${middle_name}`;
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('role', role);
                localStorage.setItem('fio', formattedName);

                navigate('/system/courses');
            } else {
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
                                   type={showPassword ? "text" : "password"}

                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                            />
                            <button type="button" className="LoginFormShowPassword"
                                    onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword ? Hide : Show} width="20px" height="20px"/>
                            </button>
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
