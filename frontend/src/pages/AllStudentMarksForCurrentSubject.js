import '../styles/AllStudentMarksForCurrentSubject.css'
import React from "react";
import {useLoaderData, useLocation, useNavigate, useParams} from "react-router-dom";


function AllStudentMarksForCurrentSubject() {

    const navigate = useNavigate();
    const {courseId} = useParams();
    const data = useLoaderData();
    const location = useLocation();
    const state = location.state;
    return (
        <div id="AllStudentMarksForCurrentSubjectWrapper">


            <div id="AllStudentMarksForCurrentSubjectContainer">

                <div id="AllStudentMarksForCurrentSubjectHeaderContainer">

                    <div id="AllStudentMarksForCurrentSubjectHeader">Мои оценки по {state.courseName}</div>
                    <div id="AllStudentMarksForCurrentSubjectDelimiter"></div>
                </div>

                <div id="AllStudentMarksForCurrentSubjectCourceContainer">


                    {data.map((item, index) => (
                        <div className="AllStudentMarksForCurrentSubjectInfoBlock"
                             onClick={() => navigate(`/system/courses/course/${courseId}/task/${item.material.id}`)}
                             style={{cursor: "pointer"}}>

                            <div className="AllStudentMarksForCurrentSubjectTextBlock">
                                <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">{item.material.title}
                                </div>
                                <div
                                    className="AllStudentMarksForCurrentSubjectInfoBlockInfo">{item.grade}/{item.material.grade}</div>
                            </div>
                        </div>
                    ))}


                </div>


            </div>

        </div>
    );
}

export default AllStudentMarksForCurrentSubject;
