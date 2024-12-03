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
            const login_response = await fetchWithAuth(`https://localhost:7065/api/Login/login`, {
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

            console.log(login_response)

            if (login_response.status === 200) {
                // const modules_response = await fetchWithAuth(`${process.env.REACT_APP_API_BASE_URL}/user/modules/`, {
                //     method: 'GET',
                //     credentials: "include",
                // });
                //
                // const modules_data = await modules_response.json();
                // localStorage.setItem('active_modules', JSON.stringify(modules_data));
                //
                // const data = await login_response.json();
                // const {user_id, permissions, first_name, last_name, middle_name} = data;
                // const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                // const formattedName = `${capitalize(last_name)} ${capitalize(first_name).charAt(0)}. ${capitalize(middle_name).charAt(0)}.`;
                // const moduleNames = permissions.map(perm => perm.module_name);
                // localStorage.setItem('user_id', user_id);
                // localStorage.setItem('moduleNames', moduleNames);
                // localStorage.setItem('tenders_per_page', 12);
                // localStorage.setItem('fio', JSON.stringify(formattedName));
                navigate('/system/courses');
            } else {

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
