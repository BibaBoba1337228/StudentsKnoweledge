import {fetchWithAuth} from "../fetchWithAuth";


export async function lrDetailLoader2({params}) {

    const {courseId, taskId} = params;

    const response = await fetchWithAuth(`https://localhost:7065/api/Course/${courseId}/Task/${taskId}`, {
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