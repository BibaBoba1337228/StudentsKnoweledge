import React, {useState} from 'react';
import {useLoaderData, useLocation, useNavigate, useParams} from 'react-router-dom';
import '../styles/LrManage.css';
import {fetchWithFormAuth} from "../api/fetchWithFormAuth";
import {fetchWithAuth} from "../api/fetchWithAuth";

function LrManage() {
    const {courseId, taskId} = useParams();
    const taskDetails = useLoaderData();
    const navigate = useNavigate();

    const location = useLocation();
    const sectionId = location.state?.sectionId;

    const [title, setTitle] = useState(taskDetails.title || "");
    const [content, setContent] = useState(taskDetails.content || ""); // Track content from textarea
    const [isSaving, setIsSaving] = useState(false); // for loading state
    const [error, setError] = useState(null); // for error state

    const handleTitleChange = (e) => {
        setTitle(e.target.innerText); // update title when content changes
    };

    const handleContentChange = (e) => {
        setContent(e.target.value); // Update content when textarea changes
    };

    const HandleGoBack = () => {
        navigate(-1);
    };

    const saveChanges = async () => {
        if (isSaving) return;

        // Check if title or content changed
        const isTitleChanged = title !== taskDetails.title;
        const isContentChanged = content !== taskDetails.content;

        if (!isTitleChanged && !isContentChanged) {
            alert("Нет изменений для сохранения.");
            return;
        }

        try {
            setIsSaving(true);
            setError(null);

            const updatedData = {
                Title: isTitleChanged ? title : taskDetails.title,
                Content: isContentChanged ? content : taskDetails.content
            };

            const method = 'PUT'; // Use PUT for update
            const url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Section/${sectionId}/Material/TextContent/${taskId}`; // Updated API endpoint

            const response = await fetchWithAuth(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData), // Send updated data as JSON
            });

            if (!response.ok) {
                throw new Error('Не удалось сохранить изменения');
            }

            alert("Изменения успешно сохранены!");
            navigate(`/system/courses/course/${courseId}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div id="LrManageWrapper">
            <div id="LrManageContainer">
                <div id="LrManageHeaderContainer">
                    <div
                        id="LrManageHeader"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleTitleChange}
                        dangerouslySetInnerHTML={{__html: title}}
                        disabled={isSaving}
                    />
                    <div id="LrManageDelimiter"></div>
                </div>

                <div id="LrManageCourceContainer">
                    <div className="LrManageInfoBlock">
                        <textarea
                            value={content}
                            onChange={handleContentChange}
                            placeholder="Введите текст контента"
                            rows="10"
                            style={{width: "100%"}}
                            disabled={isSaving}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div id="LrManageManageButtons">
                        <button id="LrManageChangeButton" onClick={saveChanges} disabled={isSaving}>
                            Сохранить
                        </button>

                        <button id="LrDetailDeleteButton"
                                style={{cursor: "pointer"}} onClick={HandleGoBack}>
                            Назад
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LrManage;
