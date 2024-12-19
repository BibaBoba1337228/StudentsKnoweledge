import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchWithAuth} from "./fetchWithAuth";

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuthorization() {
            try {
                const response = await fetchWithAuth(`https://${process.env.REACT_APP_API_BASE_URL}/api/Login/status`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.status === 200) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                    navigate("/login");
                }
            } catch (error) {
                setIsAuthorized(false);
                navigate("/login");
            }
        }

        checkAuthorization();
    }, [navigate]);

    if (isAuthorized === null) {
        return <h1>Загрузка...</h1>;
    }

    if (!isAuthorized) {
        return null;
    }

    return children;
}

export default ProtectedRoute;
