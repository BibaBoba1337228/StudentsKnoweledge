import '../styles/AllStudentTasksFromStudent.css'
import React from "react";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";


function AllSendedTasksFromUser() {

    const navigate = useNavigate();
    const data = useLoaderData();

    const {courseId, taskId} = useParams();


    return (
        <div id="AllSendedTasksFromUserWrapper">
            <div id="AllSendedTasksFromUserContainer">
                <div id="AllSendedTasksFromUserHeaderContainer">
                    <div id="AllSendedTasksFromUserHeader">Предоставленные ответы</div>
                    <div id="AllSendedTasksFromUserDelimiter"></div>
                </div>

                <div id="AllSendedTasksFromUserCourceContainer">
                    {data.map((task) => (
                        <div
                            key={task.id}
                            className="AllSendedTasksFromUserInfoBlock"
                            onClick={() => navigate(`/system/courses/course/${courseId}/task/${taskId}/rate`, {state: {data: task}})}
                            Adjust route as needed
                            style={{cursor: "pointer"}}
                        >
                            <div className="AllSendedTasksFromUserTextBlock">
                                <div className="AllSendedTasksFromUserInfoBlockHeader">
                                    {task.student.middleName} {task.student.name} {task.student.lastName}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllSendedTasksFromUser;
