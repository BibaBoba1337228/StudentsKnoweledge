import {fetchWithAuth} from "../fetchWithAuth";

export async function chatsListLoader() {

    const chatsResponse = await fetchWithAuth(`https://${process.env.REACT_APP_API_BASE_URL}/api/Chat`, {
        method: "GET",
        credentials: "include",
    });

    if (chatsResponse.status === 401) {
        throw {status: 401, message: "Unauthorized"};
    }

    if (!chatsResponse.ok) {
        throw {status: chatsResponse.status, message: chatsResponse.statusText};
    }

    const chats = await chatsResponse.json();

    return chats;
}
