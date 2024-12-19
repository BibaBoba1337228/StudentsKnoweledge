import React, {useEffect, useState} from "react";
import {useLoaderData, useNavigate} from "react-router-dom";

function MainPage() {
    const loaderData = useLoaderData();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (loaderData.status === 200) {
            navigate("/system/courses");
        } else {
            navigate("/login");
        }
        setIsLoading(false);
    }, [loaderData, navigate]);

    if (isLoading) {
        return (
            <div>
                <h1>Загрузка...</h1>
            </div>
        );
    }

    return null;
}

export default MainPage;
