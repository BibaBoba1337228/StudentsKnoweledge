import {fetchWithAuth} from "../fetchWithAuth";

export async function chatLoader({params}) {
    const {chatId} = params;

    const chatResponse = await fetchWithAuth(`https://${process.env.REACT_APP_API_BASE_URL}/api/Chat/${chatId}`, {
        method: "GET",
        credentials: "include",
    });

    if (chatResponse.status === 401) {
        throw {status: 401, message: "Unauthorized"};
    }

    if (!chatResponse.ok) {
        throw {status: chatResponse.status, message: chatResponse.statusText};
    }

    const chat = await chatResponse.json();

    return chat;
}
