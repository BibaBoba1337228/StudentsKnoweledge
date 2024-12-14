import React, {useState} from "react";
import {useLoaderData, useNavigate, useParams, useLocation} from "react-router-dom";
import "../styles/LrRate.css";
import lab from "../assets/icons/lab.svg";
import {fetchWithAuth} from "../api/fetchWithAuth";

function LrRate() {
    const {courseId, taskId} = useParams();
    const navigate = useNavigate();
    const data = useLoaderData();
    console.log("С лоадера", data);
    const location = useLocation();
    const lrdata = location.state?.data;
    console.log("С ЛР даты", lrdata);

    const [isEditing, setIsEditing] = useState(false);
    const [currentGrade, setCurrentGrade] = useState(lrdata?.grade || "");
    const [teacherComment, setTeacherComment] = useState(lrdata?.teacherComment || ""); // Новое состояние для комментария
    const [isLoading, setIsLoading] = useState(false);

    const maxGrade = data.grade;

    const handleFileDownload = () => {
        const fullPath = `https://${process.env.REACT_APP_API_BASE_URL}/${lrdata?.filePath}`;
        window.open(fullPath, "_blank");
    };

    const handleGradeChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value <= maxGrade) {
            setCurrentGrade(value);
        }
    };

    const handleSaveGrade = async () => {
        console.log(currentGrade);
        if (currentGrade === lrdata.grade && teacherComment === lrdata.teacherComment) {
            setIsEditing(false);
            console.log("Не поменялось 1");
            return; // Если ничего не изменилось, ничего не делаем
        }

        if (currentGrade > maxGrade) {
            setIsEditing(false);
            console.log("Не поменялось 2");
            return; // Если оценка не изменилась, ничего не делаем
        }

        try {
            setIsLoading(true);
            const response = await fetchWithAuth(
                `https://localhost:7065/api/Materials/${taskId}/StudentAnswers/grade/${lrdata.studentId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        grade: Number(currentGrade),
                        teacherComment, // Передаем комментарий
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update grade");
            }

            const updatedData = await response.json();
            console.log("Вот это пришло", updatedData);
            lrdata.grade = updatedData.grade;
            lrdata.teacherFIO = updatedData.teacherFIO;
            lrdata.teacherComment = updatedData.teacherComment; // Обновляем комментарий
            lrdata.markTime = updatedData.markTime;
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="LrRateWrapper">
            <div id="LrRateContainer">
                <div id="LrRateCourceContainer">
                    <div className="LrRateInfoBlock">
                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Последнее изменение:</div>
                            <div className="LrRateInfoBlockInfo">
                                {lrdata?.answerTime ? new Date(lrdata.answerTime).toLocaleString() : "Нет ответа"}
                            </div>
                        </div>
                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Ответ в виде файла:</div>
                            <div
                                className="LrRateInfoBlockInfoWithImage"
                                onClick={handleFileDownload}
                                style={{cursor: "pointer"}}
                            >
                                {lrdata?.filePath && <img src={lab} style={{width: "20px"}} alt="Файл"/>}
                                {lrdata?.filePath ? lrdata.filePath.match(/[^\\]+$/)?.[0] : "Ответ отсутствует"}
                            </div>
                        </div>
                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Комментарий к ответу:</div>
                            <div className="LrRateInfoBlockInfo">{lrdata?.comment || "Отсутствует"}</div>
                        </div>
                    </div>
                    <div className="LrRateInfoBlock">
                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Оценка:</div>
                            <div className="LrRateInfoBlockInfo">
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={currentGrade}
                                        onChange={handleGradeChange}
                                        max={maxGrade}
                                        min={0}
                                        disabled={isLoading}
                                    />
                                ) : (
                                    lrdata?.grade || "Не оценено"
                                )}
                            </div>
                        </div>
                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Комментарий к оценке:</div>
                            <div className="LrRateInfoBlockInfo">
                                {isEditing ? (
                                    <textarea
                                        value={teacherComment}
                                        onChange={(e) => setTeacherComment(e.target.value)}
                                        disabled={isLoading}
                                        placeholder="Введите комментарий"
                                    />
                                ) : (
                                    lrdata?.teacherComment || "Отсутствует"
                                )}
                            </div>
                        </div>
                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Оценено в:</div>
                            <div className="LrRateInfoBlockInfo">
                                {lrdata?.markTime && new Date(lrdata.markTime).getFullYear() > 1900
                                    ? new Date(lrdata.markTime).toLocaleString()
                                    : "Не оценено"}
                            </div>
                        </div>
                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Оценил:</div>
                            <div className="LrRateInfoBlockInfo">{lrdata?.teacherFIO || "Не оценено"}</div>
                        </div>
                    </div>
                    <div id="LrRateManageButtons">
                        {isEditing ? (
                            <>
                                <button id="LrRateSaveButton" onClick={handleSaveGrade} disabled={isLoading}>
                                    Сохранить
                                </button>
                                <button
                                    id="LrRateCancelButton"
                                    onClick={() => setIsEditing(false)}
                                    disabled={isLoading}
                                >
                                    Отмена
                                </button>
                            </>
                        ) : (
                            <button id="LrRateChangeButton" onClick={() => setIsEditing(true)}>
                                Оценить
                            </button>
                        )}
                        <button id="LrRateDeleteButton" onClick={() => navigate(-1)}>
                            Назад
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LrRate;
