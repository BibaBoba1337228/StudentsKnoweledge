import React, {useEffect, useState} from 'react';
import {useLoaderData, useNavigate} from "react-router-dom";
import {fetchWithAuth} from "../api/fetchWithAuth";

function MainPage() {

    const data = useLoaderData();
    const navigate = useNavigate(); // Хук для навигации

    useEffect(() => {
        console.log("Это дата", data)
        if (data?.username) {
            navigate("/system/courses/");
        }
    }, [data, navigate]);


    return (
        <div>

        </div>
    );
}

export default MainPage;
