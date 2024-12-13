import React, {useState, useRef} from 'react';
import {useLoaderData, useLocation, useNavigate, useParams} from 'react-router-dom';
import '../styles/LrManage.css';
import FileAttachment from "../components/CoursePage/FileAttachment";
import {fetchWithFormAuth} from "../api/fetchWithFormAuth";

function LrManage() {
    const {courseId, taskId} = useParams();
    const taskDetails = useLoaderData();
    const navigate = useNavigate();

    const location = useLocation();
    const sectionId = location.state?.sectionId;

    const [file, setFile] = useState(taskDetails.studentAnswer?.filePath ? {name: taskDetails.studentAnswer.filePath.split("\\").pop()} : null);
    const [title, setTitle] = useState(taskDetails.title || "");
    const [isSaving, setIsSaving] = useState(false); // for loading state
    const [error, setError] = useState(null); // for error state

    const titleRef = useRef(null); // reference to the title input

    const handleFileChange = (newFile) => {
        setFile(newFile);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.innerText); // update title when content changes
    };

    const HandleGoBack = () => {
        navigate(-1);
    };

    const saveChanges = async () => {
        if (isSaving) return;

        // Check if file or title changed
        const isFileChanged = file && (!taskDetails.studentAnswer || file.name !== taskDetails.studentAnswer.filePath.split("\\").pop());
        const isTitleChanged = title !== taskDetails.title;

        if (!isFileChanged && !isTitleChanged) {
            alert("Нет изменений для сохранения.");
            return;
        }

        try {
            setIsSaving(true);
            setError(null);

            const formData = new FormData();

            if (isFileChanged && file) {
                formData.append("Files", file);
            }
            if (isTitleChanged) {
                formData.append("Title", title);
            }

            const method = 'PUT'; // Use PUT for update
            const url = `https://${process.env.REACT_APP_API_BASE_URL}/api/Section/${sectionId}/Material/File/${taskDetails.id}`;

            const response = await fetchWithFormAuth(url, {
                method: method,
                body: formData,
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
                        <div id="LrManageInfoFileHeader">Прикрепите файл</div>
                        <FileAttachment
                            initialFile={taskDetails?.filePath ? {name: taskDetails.filePath.split("\\").pop()} : null}
                            materialId={taskDetails.id}
                            onFileChange={handleFileChange}
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
