import {fetchWithAuth} from "../fetchWithAuth";

export async function courseDetailLoader({params}) {
    const {courseId} = params;

    const sectionsResponse = await fetchWithAuth(`https://${process.env.REACT_APP_API_BASE_URL}/api/Course/${localStorage.getItem("role") === "1" ? "Student" : "Teacher"}/${courseId}/Sections`, {
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

    const sectionsWithMaterials = await Promise.all(
        sections.map(async (section) => {
            const materialsResponse = await fetchWithAuth(
                `https://${process.env.REACT_APP_API_BASE_URL}/api/Section/${section.id}/Material/${localStorage.getItem("role") === "1" ? "Student" : "Teacher"}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (materialsResponse.ok) {
                const materials = await materialsResponse.json();
                return {...section, materials};
            } else {
                console.error(
                    `Failed to fetch materials for section ${section.id}: ${materialsResponse.statusText}`
                );
                return {...section, materials: []};
            }
        })
    );

    return sectionsWithMaterials;
}
