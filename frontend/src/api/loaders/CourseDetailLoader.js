import {fetchWithAuth} from "../fetchWithAuth";

export async function courseDetailLoader({params}) {
    const {courseId} = params; // Извлекаем courseId из параметров маршрута

    // Запрос на получение секций курса
    const sectionsResponse = await fetchWithAuth(`https://localhost:7065/api/Course/${courseId}/Sections`, {
        method: "GET",
        credentials: "include",
    });

    if (sectionsResponse.status === 401) {
        throw {status: 401, message: "Unauthorized"};
    }

    if (!sectionsResponse.ok) {
        throw {status: sectionsResponse.status, message: sectionsResponse.statusText};
    }

    const sections = await sectionsResponse.json();

    // Для каждой секции выполняем запрос на материалы
    const sectionsWithMaterials = await Promise.all(
        sections.map(async (section) => {
            const materialsResponse = await fetchWithAuth(
                `https://localhost:7065/api/Section/${section.id}/Material`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (materialsResponse.ok) {
                const materials = await materialsResponse.json();
                return {...section, materials}; // Добавляем материалы к секции
            } else {
                console.error(
                    `Failed to fetch materials for section ${section.id}: ${materialsResponse.statusText}`
                );
                return {...section, materials: []}; // Если запрос на материалы не удался
            }
        })
    );

    // Возвращаем секции с материалами
    return sectionsWithMaterials;
}
