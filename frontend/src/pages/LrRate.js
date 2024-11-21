import React from 'react';
import {Navigate, Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import '../styles/LrRate.css';
import lab from '../assets/icons/lab.svg'


function LrRate() {


    const navigate = useNavigate();

    return (
        <div id="LrRateWrapper">


            <div id="LrRateContainer">

                <div id="LrRateHeaderContainer">

                    <div id="LrRateHeader">Лабораторная работа №1</div>
                    <div id="LrRateDelimiter"></div>
                </div>

                <div id="LrRateCourceContainer">

                    <div className="LrRateInfoBlock">

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Срок сдачи:</div>
                            <div className="LrRateInfoBlockInfo">25.03.2024 15:59</div>
                        </div>

                    </div>

                    <div className="LrRateInfoBlock">

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Описание:</div>
                            <div className="LrRateInfoBlockInfo">Реализовать нужно только пункты 1.1-1.3 из
                                методички
                            </div>
                        </div>

                    </div>

                    <div className="LrRateInfoBlock">

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Максимальный балл:</div>
                            <div className="LrRateInfoBlockInfo">5</div>
                        </div>

                    </div>

                    <div className="LrRateInfoBlock">


                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Оставшееся время:</div>
                            <div className="LrRateInfoBlockInfo">2 дня 12 часов 35 минут</div>
                        </div>

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Последнее изменение:</div>
                            <div className="LrRateInfoBlockInfo">5 часов назад</div>
                        </div>

                        <div className="LrRateTextBlock">
                            <div className="LrRateInfoBlockHeader">Ответ в виде файла:</div>
                            <div className="LrRateInfoBlockInfoWithImage">
                                <img src={lab} style={{width: '20px'}}/>
                                ЛР№1_ЕрофеевАА.docx
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


                        <button id="LrRateDeleteButton" onClick={() => navigate('/system/course/answers/students')}
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
