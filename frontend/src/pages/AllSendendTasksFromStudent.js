import '../styles/AllStudentTasksFromStudent.css'
import React from "react";
import {useNavigate} from "react-router-dom";


function AllSendedTasksFromUser() {

    const navigate = useNavigate();
    return (
        <div id="AllSendedTasksFromUserWrapper">


            <div id="AllSendedTasksFromUserContainer">

                <div id="AllSendedTasksFromUserHeaderContainer">

                    <div id="AllSendedTasksFromUserHeader">Предоставленные ответы</div>
                    <div id="AllSendedTasksFromUserDelimiter"></div>
                </div>

                <div id="AllSendedTasksFromUserCourceContainer">

                    <div className="AllSendedTasksFromUserInfoBlock"
                         onClick={() => navigate('/system/course/answers/students/student')}
                         style={{cursor: "pointer"}}>

                        <div className="AllSendedTasksFromUserTextBlock">
                            <div className="AllSendedTasksFromUserInfoBlockHeader">Ерофеев А.А.</div>
                        </div>

                    </div>

                    <div className="AllSendedTasksFromUserInfoBlock">

                        <div className="AllSendedTasksFromUserTextBlock">
                            <div className="AllSendedTasksFromUserInfoBlockHeader">Ерофеев А.А.</div>
                        </div>

                    </div>

                    <div className="AllSendedTasksFromUserInfoBlock">

                        <div className="AllSendedTasksFromUserTextBlock">
                            <div className="AllSendedTasksFromUserInfoBlockHeader">Ерофеев А.А.</div>
                        </div>

                    </div>

                    <div className="AllSendedTasksFromUserInfoBlock">

                        <div className="AllSendedTasksFromUserTextBlock">
                            <div className="AllSendedTasksFromUserInfoBlockHeader">Ерофеев А.А.</div>
                        </div>

                    </div>

                    <div className="AllSendedTasksFromUserInfoBlock">

                        <div className="AllSendedTasksFromUserTextBlock">
                            <div className="AllSendedTasksFromUserInfoBlockHeader">Ерофеев А.А.</div>
                        </div>

                    </div>

                    <div className="AllSendedTasksFromUserInfoBlock">

                        <div className="AllSendedTasksFromUserTextBlock">
                            <div className="AllSendedTasksFromUserInfoBlockHeader">Ерофеев А.А.</div>
                        </div>

                    </div>

                    <div className="AllSendedTasksFromUserInfoBlock">

                        <div className="AllSendedTasksFromUserTextBlock">
                            <div className="AllSendedTasksFromUserInfoBlockHeader">Ерофеев А.А.</div>
                        </div>

                    </div>

                    <div className="AllSendedTasksFromUserInfoBlock">

                        <div className="AllSendedTasksFromUserTextBlock">
                            <div className="AllSendedTasksFromUserInfoBlockHeader">Ерофеев А.А.</div>
                        </div>

                    </div>


                </div>

            </div>

        </div>
    );
}

export default AllSendedTasksFromUser;
