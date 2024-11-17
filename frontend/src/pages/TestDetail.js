import '../styles/TestDetail.css'
import React from "react";
import {useNavigate} from "react-router-dom";


function TestDetail() {

    const navigate = useNavigate();
    return (
        <div id="TestDetailWrapper">


            <div id="TestDetailContainer">

                <div id="TestDetailHeaderContainer">

                    <div id="TestDetailHeader">Рейтинг контроль №1</div>
                    <div id="TestDetailDelimiter"></div>
                </div>

                <div id="TestDetailCourceContainer">


                    <div className="TestDetailInfoBlock">

                        <div className="TestDetailTextBlock">
                            <div className="TestDetailInfoBlockHeader">Срок сдачи:
                            </div>
                            <div className="TestDetailInfoBlockInfo">25.03.2024 11:50</div>
                        </div>
                    </div>

                    <div className="TestDetailInfoBlock">
                        <div className="TestDetailTextBlock">
                            <div className="TestDetailInfoBlockHeader">Описание
                            </div>
                            <div className="TestDetailInfoBlockInfo">Тестирование по лекции 1-3</div>
                        </div>

                    </div>


                    <div className="TestDetailInfoBlock">
                        <div className="TestDetailTextBlock">
                            <div className="TestDetailInfoBlockHeader">Попыток всего
                            </div>
                            <div className="TestDetailInfoBlockInfo">3</div>
                        </div>

                    </div>


                    <div className="TestDetailInfoBlock">
                        <div className="TestDetailTextBlock">
                            <div className="TestDetailInfoBlockHeader">Максимальный балл
                            </div>
                            <div className="TestDetailInfoBlockInfo">5</div>
                        </div>


                    </div>


                    <div className="TestDetailInfoBlock">
                        <div className="TestDetailTextBlock">
                            <div className="TestDetailInfoBlockHeader">Время выполнения
                            </div>
                            <div className="TestDetailInfoBlockInfo">1 час 30 минут</div>
                        </div>

                    </div>

                    <div className="TestDetailInfoBlock">
                        <div id="TestDetailTryInfoBlockHeader">Результаты попыток</div>
                        <div className="TestDetailTextBlockTry">

                            <div className="TestDetailTextBlockAndHeader">
                                <div className="TestDetailInfoBlockHeader">Попытка №1:
                                </div>
                                <div className="TestDetailInfoBlockInfo">8.5/10</div>
                            </div>

                            <div className="TestDetailInfoBlockInfo" id="TryUnderline">К попытке</div>
                        </div>

                        <div className="TestDetailTextBlockTry">

                            <div className="TestDetailTextBlockAndHeader">
                                <div className="TestDetailInfoBlockHeader">Попытка №2:
                                </div>
                                <div className="TestDetailInfoBlockInfo">9.5/10</div>
                            </div>

                            <div className="TestDetailInfoBlockInfo" id="TryUnderline">К попытке</div>
                        </div>
                        <div className="TestDetailTextBlockTry">

                            <div className="TestDetailTextBlockAndHeader">
                                <div className="TestDetailInfoBlockHeader">Попытка №3:
                                </div>
                                <div className="TestDetailInfoBlockInfo">Не пройдена</div>
                            </div>

                        </div>

                    </div>


                    <div id="TestDetailManageButtons">

                        <button id="TestDetailChangeButton" onClick={() => navigate('/system/course/test/complete')}
                                style={{cursor: "pointer"}}>
                            Начать тест
                        </button>


                        <button id="TestDetailDeleteButton" onClick={() => navigate(-1)}
                                style={{cursor: "pointer"}}>
                            Назад
                        </button>

                    </div>


                </div>


            </div>

        </div>
    );
}

export default TestDetail;
