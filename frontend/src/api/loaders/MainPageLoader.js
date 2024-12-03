import {fetchWithAuth} from "../fetchWithAuth";

export async function mainPageLoader() {

    const response = await fetchWithAuth(`https://localhost:7065/api/Login/status`, {
        method: "GET",
        credentials: "include",
    });

    console.log(response);

    if (response.status === 200) {
        return response.json();
    }

    if (response.status === 401) {
        throw {status: 401, message: "Unauthorized"};
    }

    throw {status: response.status, message: response.statusText};
}