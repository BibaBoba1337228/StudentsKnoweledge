import '../styles/AllStudentTasks.css'
import React from "react";
import {useNavigate} from "react-router-dom";


function AllSendendTasks() {

    const navigate = useNavigate();
    return (
        <div id="AllSendendTasksWrapper">


            <div id="AllSendendTasksContainer">

                <div id="AllSendendTasksHeaderContainer">

                    <div id="AllSendendTasksHeader">Проверить работу</div>
                    <div id="AllSendendTasksDelimiter"></div>
                </div>

                <div id="AllSendendTasksCourceContainer">

                    <div className="AllSendendTasksInfoBlock"
                         onClick={() => navigate('/system/course/answers/students')}
                         style={{cursor: "pointer"}}>

                        <div className="AllSendendTasksTextBlock">
                            <div className="AllSendendTasksInfoBlockHeader">Лабораторная работа №1</div>
                        </div>

                    </div>

                    <div className="AllSendendTasksInfoBlock">

                        <div className="AllSendendTasksTextBlock">
                            <div className="AllSendendTasksInfoBlockHeader">Лабораторная работа №2</div>
                        </div>

                    </div>

                    <div className="AllSendendTasksInfoBlock">

                        <div className="AllSendendTasksTextBlock">
                            <div className="AllSendendTasksInfoBlockHeader">Лабораторная работа №3</div>
                        </div>

                    </div>

                    <div className="AllSendendTasksInfoBlock">

                        <div className="AllSendendTasksTextBlock">
                            <div className="AllSendendTasksInfoBlockHeader">Лабораторная работа №4</div>
                        </div>

                    </div>

                    <div className="AllSendendTasksInfoBlock">

                        <div className="AllSendendTasksTextBlock">
                            <div className="AllSendendTasksInfoBlockHeader">Лабораторная работа №5</div>
                        </div>

                    </div>

                    <div className="AllSendendTasksInfoBlock">

                        <div className="AllSendendTasksTextBlock">
                            <div className="AllSendendTasksInfoBlockHeader">Лабораторная работа №6</div>
                        </div>

                    </div>

                    <div className="AllSendendTasksInfoBlock">

                        <div className="AllSendendTasksTextBlock">
                            <div className="AllSendendTasksInfoBlockHeader">Лабораторная работа №7</div>
                        </div>

                    </div>


                </div>

            </div>

        </div>
    );
}

export default AllSendendTasks;
