import React from 'react';
import {Navigate, Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import '../styles/LrDetail.css';
import lab from '../assets/icons/lab.svg'


function LrDetail() {


    const navigate = useNavigate();

    return (
        <div id="LrDetailWrapper">


            <div id="LrDetailContainer">

                <div id="LrDetailHeaderContainer">

                    <div id="LrDetailHeader">Лабораторная работа №1</div>
                    <div id="LrDetailDelimiter"></div>
                </div>

                <div id="LrDetailCourceContainer">

                    <div className="LrDetailInfoBlock">

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Срок сдачи:</div>
                            <div className="LrDetailInfoBlockInfo">25.03.2024 15:59</div>
                        </div>

                    </div>

                    <div className="LrDetailInfoBlock">

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Описание:</div>
                            <div className="LrDetailInfoBlockInfo">Реализовать нужно только пункты 1.1-1.3 из
                                методички
                            </div>
                        </div>

                    </div>

                    <div className="LrDetailInfoBlock">

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Максимальный балл:</div>
                            <div className="LrDetailInfoBlockInfo">5</div>
                        </div>

                    </div>

                    <div className="LrDetailInfoBlock">

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Состояние ответа:</div>
                            <div className="LrDetailInfoBlockInfo">Отправлено на проверку</div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Оставшееся время:</div>
                            <div className="LrDetailInfoBlockInfo">2 дня 12 часов 35 минут</div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Последнее изменение:</div>
                            <div className="LrDetailInfoBlockInfo">5 часов назад</div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Ответ в виде файла:</div>
                            <div className="LrDetailInfoBlockInfoWithImage">
                                <img src={lab} style={{width: '20px'}}/>
                                ЛР№1_ЕрофеевАА.docx
                            </div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Комментарий к ответу:</div>
                            <div className="LrDetailInfoBlockInfo">Отсутствует</div>
                        </div>

                    </div>

                    <div className="LrDetailInfoBlock">

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Оценка:</div>
                            <div className="LrDetailInfoBlockInfo">Не оценено</div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Оценено в:</div>
                            <div className="LrDetailInfoBlockInfo">Не оценено</div>
                        </div>

                        <div className="LrDetailTextBlock">
                            <div className="LrDetailInfoBlockHeader">Оценил:</div>
                            <div className="LrDetailInfoBlockInfo">Не оценено</div>
                        </div>


                    </div>

                    <div id="LrDetailManageButtons">

                        <button id="LrDetailChangeButton" onClick={() => navigate('/system/course/task/manage')}
                                style={{cursor: "pointer"}}>
                            Изменить
                        </button>


                        <button id="LrDetailDeleteButton" onClick={() => navigate('/system/course/task')}
                                style={{cursor: "pointer"}}>
                            Удалить
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default LrDetail;
