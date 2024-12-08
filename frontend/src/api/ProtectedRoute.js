import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchWithAuth} from "./fetchWithAuth";

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuthorization() {
            try {
                const response = await fetchWithAuth("https://localhost:7065/api/Login/status", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.status === 200) {
                    setIsAuthorized(true); // Пользователь авторизован
                } else {
                    setIsAuthorized(false); // Не авторизован
                    navigate("/login"); // Редирект на логин
                }
            } catch (error) {
                setIsAuthorized(false);
                navigate("/login");
            }
        }

        checkAuthorization();
    }, [navigate]);

    if (isAuthorized === null) {
        return <h1>Загрузка...</h1>; // Показываем индикатор загрузки
    }

    if (!isAuthorized) {
        return null; // Если не авторизован, ничего не показываем (будет редирект)
    }

    return children; // Если авторизован, показываем дочерние элементы
}

export default ProtectedRoute;
