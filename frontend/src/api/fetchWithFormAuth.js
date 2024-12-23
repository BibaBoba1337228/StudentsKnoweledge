export async function fetchWithFormAuth(url, options = {}) {
    const defaultOptions = {
        credentials: 'include',
        headers: {
            ...options.headers
        },
        ...options
    };

    try {
        const response = await fetch(url, defaultOptions);

        if (response.status === 401 || response.status === 403) {
            throw {status: response.status};
        }


        return await response;

    } catch (error) {
        throw error;
        console.error('Ошибка при выполнении запроса:', error);
    }
}
