import '../styles/AllEvents.css'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


function AllEvents() {

    const navigate = useNavigate();


    return (
        <div id="AllEventsWrapper">


            <div id="AllEventsContainer">

                <div id="AllEventsHeaderContainer">

                    <div id="AllEventsHeader">Все события курса</div>
                    <div id="AllEventsDelimiter"></div>
                </div>

                <div id="AllEventsCourceContainer">

                    <div className="AllEventsInfoBlock" onClick={() => navigate('/system/course/task')}
                         style={{cursor: "pointer"}}>

                        <div className="AllEventsTextBlock">
                            <div className="AllEventsInfoBlockHeader">Лабораторная №1</div>
                            <div className="AllEventsInfoBlockInfo">до 12.12.2025</div>
                        </div>

                    </div>

                    <div className="AllEventsInfoBlock" onClick={() => navigate('/system/course/task')}
                         style={{cursor: "pointer"}}>

                        <div className="AllEventsTextBlock">
                            <div className="AllEventsInfoBlockHeader">Лабораторная №2</div>
                            <div className="AllEventsInfoBlockInfo">закрывается сегодня</div>
                        </div>

                    </div>

                    <div className="AllEventsInfoBlock" onClick={() => navigate('/system/course/task')}
                         style={{cursor: "pointer"}}>

                        <div className="AllEventsTextBlock">
                            <div className="AllEventsInfoBlockHeader">Лабораторная №3</div>
                            <div className="AllEventsInfoBlockInfo">открывается 12.12.2025</div>
                        </div>

                    </div>

                    <div className="AllEventsInfoBlock" onClick={() => navigate('/system/course/task')}
                         style={{cursor: "pointer"}}>

                        <div className="AllEventsTextBlock">
                            <div className="AllEventsInfoBlockHeader">Лабораторная №4</div>
                            <div className="AllEventsInfoBlockInfo">до 12.12.2025</div>
                        </div>

                    </div>


                </div>


            </div>

        </div>
    );
}

export default AllEvents;
