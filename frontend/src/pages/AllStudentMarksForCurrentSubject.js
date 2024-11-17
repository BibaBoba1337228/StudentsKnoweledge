import '../styles/AllStudentMarksForCurrentSubject.css'
import React from "react";
import {useNavigate} from "react-router-dom";


function AllStudentMarksForCurrentSubject() {

    const navigate = useNavigate();
    return (
        <div id="AllStudentMarksForCurrentSubjectWrapper">


            <div id="AllStudentMarksForCurrentSubjectContainer">

                <div id="AllStudentMarksForCurrentSubjectHeaderContainer">

                    <div id="AllStudentMarksForCurrentSubjectHeader">Мои оценки по "Технологии программирования"</div>
                    <div id="AllStudentMarksForCurrentSubjectDelimiter"></div>
                </div>

                <div id="AllStudentMarksForCurrentSubjectCourceContainer">


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock"
                         onClick={() => navigate('/system/course/task')}
                         style={{cursor: "pointer"}}>

                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №1
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">10/10</div>
                        </div>
                    </div>

                    <div className="AllStudentMarksForCurrentSubjectInfoBlock"
                         onClick={() => navigate('/system/course/test')}
                         style={{cursor: "pointer"}}>
                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">РК №1
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">5/10</div>
                        </div>

                    </div>


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">
                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №3
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">9/10</div>
                        </div>

                    </div>


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">
                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №4
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">4.5/10</div>
                        </div>


                    </div>


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">
                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №5
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">1/10</div>
                        </div>

                    </div>


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">
                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №6
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">10/10</div>
                        </div>

                    </div>


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">

                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №7
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">-</div>
                        </div>
                    </div>


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">

                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №1
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">10/10</div>
                        </div>
                    </div>

                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">
                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №2
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">5/10</div>
                        </div>

                    </div>


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">
                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №3
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">9/10</div>
                        </div>

                    </div>


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">
                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №4
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">4.5/10</div>
                        </div>


                    </div>


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">
                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №5
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">1/10</div>
                        </div>

                    </div>


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">
                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №6
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">10/10</div>
                        </div>

                    </div>


                    <div className="AllStudentMarksForCurrentSubjectInfoBlock">

                        <div className="AllStudentMarksForCurrentSubjectTextBlock">
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockHeader">Лабораторная работа №7
                            </div>
                            <div className="AllStudentMarksForCurrentSubjectInfoBlockInfo">-</div>
                        </div>
                    </div>


                </div>


            </div>

        </div>
    );
}

export default AllStudentMarksForCurrentSubject;
