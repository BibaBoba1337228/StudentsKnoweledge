import '../styles/TestOverview.css'
import React from "react";


function TestOverview() {
    return (
        <div id="TestOverviewWrapper">


            <div id="TestOverviewContainer">

                <div id="TestOverviewHeaderContainer">

                    <div id="TestOverviewHeader">Рейтинг контроль №1</div>
                    <div id="TestOverviewDelimiter"></div>
                </div>

                <div id="TestOverviewCourceContainer">

                    <div className="TestOverviewInfoBlock">

                        <div className="TestOverviewTextBlock">
                            <div className="TestOverviewInfoBlockHeader">Вопрос №1</div>
                            <div className="TestOverviewInfoBlockInfo">Ответ дан</div>
                        </div>

                        <div className="TestOverviewTextBlock">
                            <div className="TestOverviewInfoBlockHeader">Вопрос №2</div>
                            <div className="TestOverviewInfoBlockInfo">Ответ дан</div>
                        </div>

                        <div className="TestOverviewTextBlock">
                            <div className="TestOverviewInfoBlockHeader">Вопрос №3</div>
                            <div className="TestOverviewInfoBlockInfo">Ответ дан</div>
                        </div>

                        <div className="TestOverviewTextBlock">
                            <div className="TestOverviewInfoBlockHeader">Вопрос №4</div>
                            <div className="TestOverviewInfoBlockInfo">Ответ дан</div>
                        </div>

                        <div className="TestOverviewTextBlock">
                            <div className="TestOverviewInfoBlockHeader">Вопрос №5</div>
                            <div className="TestOverviewInfoBlockInfo">Ответ дан</div>
                        </div>

                        <div className="TestOverviewTextBlock">
                            <div className="TestOverviewInfoBlockHeader">Вопрос №6</div>
                            <div className="TestOverviewInfoBlockInfo">Ответ дан</div>
                        </div>

                        <div className="TestOverviewTextBlock">
                            <div className="TestOverviewInfoBlockHeader">Вопрос №7</div>
                            <div className="TestOverviewInfoBlockInfo">Ответ дан</div>
                        </div>

                        <div className="TestOverviewTextBlock">
                            <div className="TestOverviewInfoBlockHeader">Вопрос №8</div>
                            <div className="TestOverviewInfoBlockInfo">Ответ дан</div>
                        </div>

                        <div className="TestOverviewTextBlock">
                            <div className="TestOverviewInfoBlockHeader">Вопрос №9</div>
                            <div className="TestOverviewInfoBlockInfo">Ответ дан</div>
                        </div>

                        <div className="TestOverviewTextBlock">
                            <div className="TestOverviewInfoBlockHeader">Вопрос №10</div>
                            <div className="TestOverviewInfoBlockInfo">Ответ дан</div>
                        </div>


                    </div>


                    <div id="TestOverviewManageButtons">

                        <button id="TestOverviewChangeButton">
                            Отправить
                        </button>


                        <button id="TestOverviewDeleteButton">
                            Назад
                        </button>

                    </div>


                </div>

            </div>

        </div>
    );
}

export default TestOverview;
