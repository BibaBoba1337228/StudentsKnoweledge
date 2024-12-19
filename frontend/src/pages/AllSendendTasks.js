import '../styles/AllStudentTasks.css'
import React from "react";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";


function AllSendendTasks() {

    const data = useLoaderData()
    const {courseId} = useParams();

    const navigate = useNavigate();
    return (
        <div id="AllSendendTasksWrapper">
            <div id="AllSendendTasksContainer">
                <div id="AllSendendTasksHeaderContainer">
                    <div id="AllSendendTasksHeader">Проверить работу</div>
                    <div id="AllSendendTasksDelimiter"></div>
                </div>

                <div id="AllSendendTasksCourceContainer">
                    {data.map((task) => (
                        <div
                            key={task.id}
                            className="AllSendendTasksInfoBlock"
                            onClick={() => navigate(`/system/courses/course/${courseId}/task/${task.id}/answers/students`)}
                            style={{cursor: "pointer"}}
                        >
                            <div className="AllSendendTasksTextBlock">
                                <div className="AllSendendTasksInfoBlockHeader">{task.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllSendendTasks;
