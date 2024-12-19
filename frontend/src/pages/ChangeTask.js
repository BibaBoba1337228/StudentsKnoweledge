import React, {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import "../styles/ChangeTask.css";
import FileAttachment from "../components/CoursePage/FileAttachment";
import {fetchWithFormAuth} from "../api/fetchWithFormAuth";
import {fetchWithAuth} from "../api/fetchWithAuth";

function ChangeTask() {
    const [materialType, setMaterialType] = useState("Ответ студента");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [grade, setGrade] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const sectionId = location.state?.sectionId;
    const {courseId} = useParams();

    const handleDropdownChange = (e) => setMaterialType(e.target.value);

    const handleCreate = async () => {
        if (!title) {
            alert("Пожалуйста, укажите название материала.");
            return;
        }

        setIsLoading(true);
        let url = "";
        let body;

        try {
            if (materialType === "Файл") {
                if (!file) {
                    alert("Пожалуйста, выберите файл.");
                    setIsLoading(false);
                    return;
                }

                url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Section/${sectionId}/Material/File`;
                const formData = new FormData();
                formData.append("Title", title);
                formData.append("Files", file);
                body = formData;

                const response = await fetchWithFormAuth(url, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Ошибка при создании материала с файлом.");
            } else if (materialType === "Ответ студента") {
                if (!description || !deadline || !grade) {
                    alert("Пожалуйста, заполните все поля для задания.");
                    setIsLoading(false);
                    return;
                }

                url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Section/${sectionId}/Material/Task`;
                body = {
                    title,
                    description,
                    deadline,
                    grade: parseInt(grade),
                };

                const response = await fetchWithAuth(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) throw new Error("Ошибка при создании задания.");
            } else if (materialType === "Текстовый блок") {
                if (!content) {
                    alert("Пожалуйста, заполните текстовый блок.");
                    setIsLoading(false);
                    return;
                }

                url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Section/${sectionId}/Material/TextContent`;
                body = {
                    title,
                    content,
                };

                const response = await fetchWithAuth(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) throw new Error("Ошибка при создании текстового блока.");
            }

            alert("Материал успешно создан.");
            navigate(`/system/courses/course/${courseId}`);
        } catch (error) {
            console.error(error);
            alert(error.message || "Произошла ошибка.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="ChangeTaskWrapper">
            <div id="ChangeTaskContainer">
                <div id="ChangeTaskHeaderContainer">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Название материала"
                        id="ChangeTaskHeader"
                    />
                    <div id="ChangeTaskDelimiter"></div>
                </div>

                <div id="ChangeTaskCourceContainer">
                    <div className="ChangeTaskInfoBlock">
                        <div className="ChangeTaskTextBlock">
                            <div className="ChangeTaskInfoBlockHeader">Вид материала:</div>
                            <select
                                value={materialType}
                                onChange={handleDropdownChange}
                                id="CourceDetailSectionAddModalInputCourseInputDropDown"
                                style={{zIndex: 2, position: "relative"}}
                            >
                                <option value="Ответ студента">Ответ студента</option>
                                <option value="Файл">Файл</option>
                                <option value="Текстовый блок">Текстовый блок</option>
                            </select>
                        </div>
                    </div>

                    {materialType === "Файл" && (
                        <div className="LrManageInfoBlock">
                            <FileAttachment initialFile={null} onFileChange={setFile}/>
                        </div>
                    )}

                    {materialType === "Ответ студента" && (
                        <div className="ChangeTaskInfoBlock">
                            <div className="ChangeTaskTextBlock">
                                <div className="ChangeTaskInfoBlockHeader">Описание:</div>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Введите описание задания"
                                    rows="4"
                                    style={{width: "70%", marginLeft: "25px"}}
                                />
                            </div>
                            <div className="ChangeTaskTextBlock">
                                <div className="ChangeTaskInfoBlockHeader">Срок сдачи:</div>
                                <input
                                    style={{width: "70%", marginLeft: "25px"}}
                                    type="datetime-local"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </div>
                            <div className="ChangeTaskTextBlock">
                                <div className="ChangeTaskInfoBlockHeader">Максимальный балл:</div>
                                <input
                                    style={{width: "70%", marginLeft: "25px"}}
                                    type="number"
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                    placeholder="Введите максимальный балл"
                                />
                            </div>
                        </div>
                    )}

                    {materialType === "Текстовый блок" && (
                        <div className="LrManageInfoBlock">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Введите текст контента"
                                rows="10"
                                style={{width: "100%"}}
                            />
                        </div>
                    )}

                    <div id="ChangeTaskManageButtons">
                        <button
                            id="ChangeTaskChangeButton"
                            onClick={handleCreate}
                            disabled={isLoading}
                            style={{cursor: isLoading ? "not-allowed" : "pointer"}}
                        >
                            {isLoading ? "Создание..." : "Создать"}
                        </button>
                        <button
                            id="ChangeTaskDeleteButton"
                            onClick={() => navigate(`/system/courses/course/${courseId}`)}
                            style={{cursor: "pointer"}}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeTask;
