import React, {useState} from 'react';
import {Navigate, Outlet, Route, Routes, useLoaderData, useLocation, useNavigate, useParams} from 'react-router-dom';
import '../styles/LrRate.css';
import lab from '../assets/icons/lab.svg'


function LrRate() {

    const {courseId, taskId} = useParams();
    const navigate = useNavigate();
    const taskData = useLoaderData();

    const location = useLocation();

    const lrdata = location.state?.data;
    console.log(lrdata)

    const [data, setData] = useState(taskData); // Используем состояние для управления данными
    const [isDeleting, setIsDeleting] = useState(false); // Состояние загрузки для кнопки "Удалить"

    if (!data) {
        return <div>Задание не найдено</div>;
    }

    const {title, description, deadline, grade, studentAnswer} = lrdata;

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
        <div id="LrRateWrapper">


            <div id="LrRateContainer">


                <div id="LrRateCourceContainer">

                    <div className="LrRateInfoBlock">

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Срок сдачи:</div>
                            <div
                                className="LrRateInfoBlockInfo">{deadline ? new Date(deadline).toLocaleString() : "Отсутствует"}</div>
                        </div>

                    </div>

                    <div className="LrRateInfoBlock">

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Описание:</div>
                            <div className="LrRateInfoBlockInfo">{description || "Отсутствует"}
                            </div>
                        </div>

                    </div>

                    <div className="LrRateInfoBlock">

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Максимальный балл:</div>
                            <div className="LrRateInfoBlockInfo">{grade || "Отсутствует"}</div>
                        </div>

                    </div>

                    <div className="LrRateInfoBlock">


                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Оставшееся время:</div>
                            <div className="LrRateInfoBlockInfo">{timeDifference || "Отсутствует"}</div>
                        </div>

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Последнее изменение:</div>
                            <div
                                className="LrRateInfoBlockInfo">{studentAnswer?.answerTime ? new Date(studentAnswer.answerTime).toLocaleString() : "Нет ответа"}</div>
                        </div>

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Ответ в виде файла:</div>
                            <div className="LrRateInfoBlockInfoWithImage">
                                {studentAnswer?.filePath && (
                                    <img src={lab} style={{width: '20px'}} alt="Файл"/>
                                )}
                                {studentAnswer?.filePath
                                    ? studentAnswer.filePath.match(/[^\\]+$/)?.[0]
                                    : "Ответ отсутствует"}
                            </div>
                        </div>

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Комментарий к ответу:</div>
                            <div className="LrRateInfoBlockInfo">Отсутствует</div>
                        </div>

                    </div>

                    <div className="LrRateInfoBlock">

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Оценка:</div>
                            <div className="LrRateInfoBlockInfo">Не оценено</div>
                        </div>

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Оценено в:</div>
                            <div className="LrRateInfoBlockInfo">Не оценено</div>
                        </div>

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Оценил:</div>
                            <div className="LrRateInfoBlockInfo">Не оценено</div>
                        </div>


                    </div>

                    <div id="LrRateManageButtons">

                        <button id="LrRateChangeButton"
                                style={{cursor: "pointer"}}>
                            Оценить
                        </button>


                        <button id="LrRateDeleteButton" onClick={() => navigate(-1)}
                                style={{cursor: "pointer"}}>
                            Назад
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default LrRate;
