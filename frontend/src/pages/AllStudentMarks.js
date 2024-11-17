import '../styles/AllStudentMarks.css'
import React from "react";
import {useNavigate} from "react-router-dom";


function AllStudentMarks() {

    const navigate = useNavigate();
    return (
        <div id="AllStudentMarksWrapper">


            <div id="AllStudentMarksContainer">

                <div id="AllStudentMarksHeaderContainer">

                    <div id="AllStudentMarksHeader">Мои оценки</div>
                    <div id="AllStudentMarksDelimiter"></div>
                </div>

                <div id="AllStudentMarksCourceContainer">

                    <div className="AllStudentMarksInfoBlock" onClick={() => navigate('/system/mymarks/subject')}
                         style={{cursor: "pointer"}}>

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Технологии программирования</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Управление ланными</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Управление ланными</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Управление ланными</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Управление ланными</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Управление ланными</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Управление ланными</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Управление ланными</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Управление ланными</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Управление ланными</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Философия</div>
                            <div className="AllStudentMarksInfoBlockInfo">92.5</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Тестирование ПО</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Графическое моделирование</div>
                            <div className="AllStudentMarksInfoBlockInfo">-</div>
                        </div>

                    </div>

                    <div className="AllStudentMarksInfoBlock">

                        <div className="AllStudentMarksTextBlock">
                            <div className="AllStudentMarksInfoBlockHeader">Основы алгоритмов</div>
                            <div className="AllStudentMarksInfoBlockInfo">76.2</div>
                        </div>

                    </div>


                </div>

            </div>

        </div>
    );
}

export default AllStudentMarks;
