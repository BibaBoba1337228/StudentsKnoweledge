import React, { useState } from 'react';
import './styles/RightMenu.css';
import './styles/fonts.css';
import Calendar from "./Test";


function RightMenu() {


    return (
        <div id="RightMenuContainer">


            <div className="RightMenuSection">

                <h1 className="RightMenuSectionHeader">Недавние события</h1>
                <div className="RightMenuSectionDelimiter"></div>
                <div id="RightMenuSectionLastEvents">

                    <div className="RightMenuSectionEvent">

                        <h1 className="RightMenuSectionEventHeader">Технологии программирования</h1>
                        <div className="RightMenuSectionEventDataAndDescription">
                            <div className="RightMenuSectionEventDescription">
                                Всем 5 за курсовик
                            </div>
                            <div className="RightMenuSectionEventData">
                                25.03.2024
                            </div>
                        </div>

                    </div>

                    <div className="RightMenuSectionEvent">

                        <h1 className="RightMenuSectionEventHeader">Технологии программирования</h1>
                        <div className="RightMenuSectionEventDataAndDescription">
                            <div className="RightMenuSectionEventDescription">
                                Всем 5 за курсовик
                            </div>
                            <div className="RightMenuSectionEventData">
                                25.03.2024
                            </div>
                        </div>


                    </div>

                    <div className="RightMenuSectionEvent">

                        <h1 className="RightMenuSectionEventHeader">Технологии программирования</h1>
                        <div className="RightMenuSectionEventDataAndDescription">
                            <div className="RightMenuSectionEventDescription">
                                Всем 5 за курсовик
                            </div>
                            <div className="RightMenuSectionEventData">
                                25.03.2024
                            </div>
                        </div>


                    </div>



                </div>


            </div>


            <div className="RightMenuSection">

                <h1 className="RightMenuSectionHeader">Последние сообщения</h1>
                <div className="RightMenuSectionDelimiter"></div>
                <div id="RightMenuSectionLastMessages">
                    <div className="RightMenuSectionMessage">

                        <h1 className="RightMenuSectionMessageHeader">Вершинин В.В.</h1>
                        <div className="RightMenuSectionMessageDataAndDescription">
                            <div className="RightMenuSectionMessageDescription">
                                Всем 5 за курсовик
                            </div>
                            <div className="RightMenuSectionMessageData">
                                25.03.2024
                            </div>
                        </div>

                    </div>



                    <div className="RightMenuSectionMessage">

                        <h1 className="RightMenuSectionMessageHeader">Вершинин В.В.</h1>
                        <div className="RightMenuSectionMessageDataAndDescription">
                            <div className="RightMenuSectionMessageDescription">
                                Всем 5 за курсовик
                            </div>
                            <div className="RightMenuSectionMessageData">
                                25.03.2024
                            </div>
                        </div>

                    </div>

                    <div className="RightMenuSectionMessage">

                        <h1 className="RightMenuSectionMessageHeader">Вершинин В.В.</h1>
                        <div className="RightMenuSectionMessageDataAndDescription">
                            <div className="RightMenuSectionMessageDescription">
                                Всем 5 за курсовик
                            </div>
                            <div className="RightMenuSectionMessageData">
                                25.03.2024
                            </div>
                        </div>

                    </div>
                </div>

            </div>


            <div className="RightMenuSection">

                <h1 className="RightMenuSectionHeader">Календарь событий</h1>
                <div className="RightMenuSectionDelimiter"></div>
                <div id="RightMenuSectionCalendar">
                    <Calendar></Calendar>

                </div>

            </div>


        </div>
    );
}

export default RightMenu;
