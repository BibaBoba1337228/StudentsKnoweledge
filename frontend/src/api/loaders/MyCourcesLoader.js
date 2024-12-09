import {fetchWithAuth} from "../fetchWithAuth";
import Background1 from '../../assets/images/card_background_1.svg'
import Background2 from '../../assets/images/card_background_2.svg'
import Background3 from '../../assets/images/card_background_3.svg'
import Background4 from '../../assets/images/card_background_4.svg'


export async function myCourcesLoader() {

    const response = await fetchWithAuth(`https://localhost:7065/api/Course/UserCourses`, {
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