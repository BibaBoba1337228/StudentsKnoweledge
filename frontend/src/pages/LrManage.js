import React, {useState} from 'react';
import {useLoaderData, useNavigate, useParams} from 'react-router-dom';
import '../styles/LrManage.css';
import FileAttachment from "../components/CoursePage/FileAttachment";
import {fetchWithAuth} from "../api/fetchWithAuth";
import {fetchWithFormAuth} from "../api/fetchWithFormAuth";

function LrManage() {
    const {courseId, taskId} = useParams();
    const taskDetails = useLoaderData();
    const navigate = useNavigate();

    const [file, setFile] = useState(taskDetails.studentAnswer?.filePath ? {name: taskDetails.studentAnswer.filePath.split("\\").pop()} : null);
    const [comment, setComment] = useState(taskDetails.studentAnswer?.comment || "");
    const [isSaving, setIsSaving] = useState(false); // состояние для загрузки
    const [error, setError] = useState(null); // состояние для ошибки

    console.log(taskDetails.studentAnswer);

    const handleFileChange = (newFile) => {
        setFile(newFile);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const HandleGoBack = () => {
        navigate(-1);
    }

    const saveChanges = async () => {
        if (isSaving) return;

        // Проверяем, есть ли изменения
        const isFileChanged = file && (!taskDetails.studentAnswer || file.name !== taskDetails.studentAnswer.filePath.split("\\").pop());
        const isCommentChanged = comment !== (taskDetails.studentAnswer?.comment || "");

        if (!isFileChanged && !isCommentChanged) {
            alert("Нет изменений для сохранения.");
            return;
        }

        try {
            setIsSaving(true);
            setError(null);

            const formData = new FormData();

            if (isFileChanged && file) {
                formData.append("files", file); // Отправляем файл, если он изменился
            }
            if (isCommentChanged) {
                formData.append("comment", comment); // Отправляем комментарий, если он изменился
            }

            const method = taskDetails.studentAnswer ? 'PUT' : 'POST'; // Используем PUT для обновления, POST для создания

            const url = taskDetails.studentAnswer ? `https://${process.env.REACT_APP_API_BASE_URL}/api/Materials/${taskDetails.id}/StudentAnswers/update` : `https://${process.env.REACT_APP_API_BASE_URL}/api/Materials/${taskDetails.id}/StudentAnswers/`;


            const response = await fetchWithFormAuth(url, {
                method: method,
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Не удалось сохранить изменения');
            }

            alert("Изменения успешно сохранены!");
            navigate(`/system/courses/course/${courseId}/task/${taskId}`);
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
                    <div id="LrManageHeader">{taskDetails.title}</div>
                    <div id="LrManageDelimiter"></div>
                </div>

                <div id="LrManageCourceContainer">
                    <div className="LrManageInfoBlock">
                        <div className="LrManageTextBlock">
                            <div className="LrManageInfoBlockHeader">Срок сдачи:</div>
                            <div
                                className="LrManageInfoBlockInfo">{new Date(taskDetails.deadline).toLocaleString()}</div>
                        </div>
                    </div>

                    <div className="LrManageInfoBlock">
                        <div className="LrManageTextBlock">
                            <div className="LrManageInfoBlockHeader">Описание:</div>
                            <div className="LrManageInfoBlockInfo">{taskDetails.description}</div>
                        </div>
                    </div>

                    <div className="LrManageInfoBlock">
                        <div id="LrManageInfoFileHeader">Прикрепите файл</div>
                        <FileAttachment
                            initialFile={taskDetails.studentAnswer?.filePath ? {name: taskDetails.studentAnswer.filePath.split("\\").pop()} : null}
                            materialId={taskDetails.id}
                            onFileChange={handleFileChange}  // Обновляем родительский компонент о файле
                        />
                    </div>

                    <div className="LrManageInfoBlock">
                        <div className="LrManageTextBlock">
                            <div className="LrManageInfoBlockHeader">Комментарий:</div>
                            <textarea value={comment} onChange={handleCommentChange} className="comment-textarea"
                                      style={{marginLeft: "30px"}}/>
                        </div>
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
