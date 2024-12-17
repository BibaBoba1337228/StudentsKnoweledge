import '../styles/AllStudentMarks.css'
import React from "react";
import {useLoaderData, useNavigate, useParams} from "react-router-dom";


function AllStudentMarks() {

    const navigate = useNavigate();

    const data = useLoaderData();

    const {userId} = useParams();


    return (
        <div id="AllStudentMarksWrapper">


            <div id="AllStudentMarksContainer">

                <div id="AllStudentMarksHeaderContainer">

                    <div id="AllStudentMarksHeader">Мои оценки</div>
                    <div id="AllStudentMarksDelimiter"></div>
                </div>

                <div id="AllStudentMarksCourceContainer">


                    {data.map((item, index) => (
                        <div className="AllStudentMarksInfoBlock"
                             onClick={() => navigate(`/system/profile/${userId}/mymarks/${item.id}`, {
                                 state: {courseName: item.name},
                             })}
                             style={{cursor: "pointer"}}>

                            <div className="AllStudentMarksTextBlock">
                                <div className="AllStudentMarksInfoBlockHeader">{item.name}</div>
                            </div>

                        </div>
                    ))}


                </div>

            </div>

        </div>
    );
}

export default AllStudentMarks;
