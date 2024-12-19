import {useRouteError} from "react-router-dom";
import '../styles/Error.css';

const LoginErrorBoundary = () => {
    const error = useRouteError();
    let text = "Произошла неизвестная ошибка";


    if (error?.status === 401) {
        localStorage.clear();

        window.location.href = '/login';
        text = "Ошибка авторизации (401)";
    } else if (error?.status === 403) {
        text = "Нет доступа (403)";
    } else if (error?.status === 404) {
        text = "Страница не найдена (404)";
    } else if (error?.status === 500) {
        text = "Внутренняя ошибка сервера (500)";
    } else if (error instanceof Error) {
        console.error(error);
        text = `Произошла ошибка: ${error.message}`;
    }

    return (
        <div className="error-modal-wrapper">
            <div className="error-modal">
                <h2>Ошибка</h2>
                <p>{text}</p>
                <button onClick={() => window.history.back()} className="error-modal-close">
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export default LoginErrorBoundary;