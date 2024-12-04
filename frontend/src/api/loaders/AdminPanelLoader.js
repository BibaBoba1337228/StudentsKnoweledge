import {fetchWithAuth} from "../fetchWithAuth";

export async function adminPanelLoader() {

    const response = await fetchWithAuth(`https://localhost:7065/api/Course/`, {
        method: "GET",
        credentials: "include",
    });


    if (response.status === 200) {

        return response.json();
    }

    if (response.status === 401) {
        throw {status: 401, message: "Unauthorized"};
    }

    throw {status: response.status, message: response.statusText};
}