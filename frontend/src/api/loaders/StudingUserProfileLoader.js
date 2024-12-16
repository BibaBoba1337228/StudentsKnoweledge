import {fetchWithAuth} from "../fetchWithAuth";

export async function studingUserProfileLoader({params}) {
    const {userId} = params;

    const chatResponse = await fetchWithAuth(`https://${process.env.REACT_APP_API_BASE_URL}/api/StudingUser/${userId}/profile`, {
        method: "GET",
        credentials: "include",
    });

    if (chatResponse.status === 401) {
        throw {status: 401, message: "Unauthorized"};
    }

    if (!chatResponse.ok) {
        throw {status: chatResponse.status, message: chatResponse.statusText};
    }

    const userProfile = await chatResponse.json();

    return userProfile;
}