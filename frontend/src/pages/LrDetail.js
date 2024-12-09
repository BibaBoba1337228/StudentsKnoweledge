import React, {useEffect, useState} from 'react';
import {useLoaderData, useLocation, useNavigate, useParams} from 'react-router-dom';
import '../styles/LrDetail.css';
import lab from '../assets/icons/lab.svg';
import {fetchWithAuth} from "../api/fetchWithAuth"; // Добавим функцию для работы с авторизацией

function LrDetail() {
    const {courseId, taskId} = useParams();
    const navigate = useNavigate();
    const taskData = useLoaderData();

    const location = useLocation();

    useEffect(() => {
        // Например, перезагрузка данных при изменении маршрута
        setData(taskData);
    }, [location.pathname]);

    const [data, setData] = useState(taskData); // Используем состояние для управления данными
    const [isDeleting, setIsDeleting] = useState(false); // Состояние загрузки для кнопки "Удалить"

    if (!data) {
        return <div>Задание не найдено</div>;
    }

    const {title, description, deadline, grade, studentAnswer} = data;

    const handleDelete = async () => {
        if (!studentAnswer) {
            alert("Нет ответа для удаления!");
            return;
        }

        const confirmDelete = window.confirm("Вы уверены, что хотите удалить ответ?");
        if (!confirmDelete) return;

        try {
            setIsDeleting(true);

            const response = await fetchWithAuth(
                `https://localhost:7065/api/Materials/${data.id}/StudentAnswers/delete`,
                {method: 'DELETE'}
            );

            if (!response.ok) {
                throw new Error("Не удалось удалить ответ");
            }

            // Успешно удалено, обновляем состояние
            setData({...data, studentAnswer: null}); // Удаляем ответ из данных
            alert("Ответ успешно удалён!");
        } catch (error) {
            console.error(error);
            alert(error.message || "Произошла ошибка при удалении");
        } finally {
            setIsDeleting(false);
        }
    };

    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    let timeDifference = deadlineDate - currentDate;

    if (timeDifference < 0) {
        timeDifference = "Просрочено";
    } else {
        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        timeDifference = `${daysLeft} дней, ${hoursLeft} часов, ${minutesLeft} минут`;
    }

    return (
        <div id="LrDetailWrapper" key={location.pathname}>
            <div id="LrDetailContainer">
                <div id="LrDetailHeaderContainer">
                    <div id="LrDetailHeader">{title}</div>
                    <div id="LrDetailDelimiter"></div>
                </div>

                <div id="LrDetailCourceContainer">
                    <div className="LrDetailInfoBlock">
                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Срок сдачи:</div>
                            <div className="LrDetailInfoBlockInfo">
                                {deadline ? new Date(deadline).toLocaleString() : "Отсутствует"}
                            </div>
                        </div>
                    </div>

                    <div className="LrDetailInfoBlock">
                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Описание:</div>
                            <div className="LrDetailInfoBlockInfo">{description || "Отсутствует"}</div>
                        </div>
                    </div>

                    <div className="LrDetailInfoBlock">
                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Максимальный балл:</div>
                            <div className="LrDetailInfoBlockInfo">{grade || "Отсутствует"}</div>
                        </div>
                    </div>

                    <div className="LrDetailInfoBlock">
                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Оставшееся время:</div>
                            <div className="LrDetailInfoBlockInfo">{timeDifference || "Отсутствует"}</div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Последнее изменение:</div>
                            <div
                                className="LrDetailInfoBlockInfo">{studentAnswer?.answerTime ? new Date(studentAnswer.answerTime).toLocaleString() : "Нет ответа"}</div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Ответ в виде файла:</div>
                            <div className="LrDetailInfoBlockInfoWithImage">
                                {studentAnswer?.filePath && (
                                    <img src={lab} style={{width: '20px'}} alt="Файл"/>
                                )}
                                {studentAnswer?.filePath
                                    ? studentAnswer.filePath.match(/[^\\]+$/)?.[0]
                                    : "Ответ отсутствует"}
                            </div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Комментарий к ответу:</div>
                            <div className="LrDetailInfoBlockInfo">
                                {studentAnswer?.comment || "Отсутствует"}
                            </div>
                        </div>
                    </div>

                    <div className="LrDetailInfoBlock">

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Оценка:</div>
                            <div
                                className="LrDetailInfoBlockInfo">{studentAnswer?.grade ? studentAnswer.grade : "Не оценено"}</div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Оценено в:</div>
                            <div
                                className="LrDetailInfoBlockInfo">        {studentAnswer?.markTime && new Date(studentAnswer.markTime).getFullYear() > 1900
                                ? new Date(studentAnswer.markTime).toLocaleString()
                                : "Не оценено"}</div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Оценил:</div>
                            <div
                                className="LrDetailInfoBlockInfo">{studentAnswer?.teacherFIO ? studentAnswer.teacherFIO : "Не оценено"}</div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Комментарий к оценке:</div>
                            <div
                                className="LrDetailInfoBlockInfo">{studentAnswer?.teacherComment ? studentAnswer.teacherComment : "Комментарий отсутствует"}</div>
                        </div>


                    </div>

                    <div id="LrDetailManageButtons">
                        <button
                            id="LrDetailChangeButton"
                            style={{cursor: "pointer"}}
                            onClick={() =>
                                navigate(`/system/courses/course/${courseId}/task/${taskId}/manage`)
                            }
                        >
                            Изменить
                        </button>

                        <button
                            id="LrDetailDeleteButton"
                            style={{cursor: "pointer"}}
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Удаление..." : "Удалить"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LrDetail;
