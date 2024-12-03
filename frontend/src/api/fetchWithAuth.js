export async function fetchWithAuth(url, options = {}) {
    const defaultOptions = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    try {
        const response = await fetch(url, defaultOptions);

        if (response.status === 401 || response.status === 403) {
            console.log("Говно")
            throw {status: response.status};
        }


        return await response;

    } catch (error) {
        throw error;
        console.error('Ошибка при выполнении запроса:', error);
    }
}