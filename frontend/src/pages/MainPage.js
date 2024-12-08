import React, {useEffect, useState} from "react";
import {useLoaderData, useNavigate} from "react-router-dom";

function MainPage() {
    const loaderData = useLoaderData();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // Локальное состояние загрузки

    useEffect(() => {
        if (loaderData.status === 200) {
            // Если авторизация успешна, перенаправляем
            navigate("/system/courses");
        } else {
            // Если не авторизован, перенаправляем на логин
            navigate("/login");
        }
        setIsLoading(false); // Завершаем загрузку
    }, [loaderData, navigate]);

    if (isLoading) {
        return (
            <div>
                <h1>Загрузка...</h1>
            </div>
        );
    }

    return null; // Во время проверки ничего не рендерим
}

export default MainPage;
