import React from 'react';
import '../styles/Questionnaire.css';
import {useNavigate} from "react-router-dom";

function Questionnaire() {

    const navigate = useNavigate();
    return (
        <div id="TestDetailWrapper">


            <div id="TestDetailContainer">

                <div id="TestDetailHeaderContainer">

                    <div id="TestDetailHeader">Рейтинг контроль №1</div>
                    <div id="TestDetailDelimiter"></div>
                </div>
                <div className="questionnaire-container">
                    <div className="question-container">
                        <div className="question-header">Вопрос 1</div>
                        <div className="question-question">Как выучить C#?</div>
                        <form>
                            <label className="custom-radio">
                                <input type="radio" name="q1" value="1"/>
                                <span className="custom-radio-icon"></span>
                                Никак
                            </label>
                            <br/>
                            <label className="custom-radio">
                                <input type="radio" name="q1" value="2"/>
                                <span className="custom-radio-icon"></span>
                                Не знаю
                            </label>
                            <br/>
                            <label className="custom-radio">
                                <input type="radio" name="q1" value="3"/>
                                <span className="custom-radio-icon"></span>
                                По курсам
                            </label>
                            <br/>
                            <label className="custom-radio">
                                <input type="radio" name="q1" value="4" defaultChecked/>
                                <span className="custom-radio-icon"></span>
                                Добри добри C#
                            </label>
                        </form>
                    </div>

                    <div className="question-container">
                        <div className="question-header">Вопрос 2</div>
                        <div className="question-question">Как выучить C#?</div>
                        <form>
                            <label className="custom-checkbox">
                                <input type="checkbox" name="q2" value="1"/>
                                <span className="custom-checkbox-icon"></span>
                                Никак
                            </label>
                            <br/>
                            <label className="custom-checkbox">
                                <input type="checkbox" name="q2" value="2"/>
                                <span className="custom-checkbox-icon"></span>
                                Не знаю
                            </label>
                            <br/>
                            <label className="custom-checkbox">
                                <input type="checkbox" name="q2" value="3"/>
                                <span className="custom-checkbox-icon"></span>
                                По курсам
                            </label>
                            <br/>
                            <label className="custom-checkbox">
                                <input type="checkbox" name="q2" value="4" defaultChecked/>
                                <span className="custom-checkbox-icon"></span>
                                Добри добри C#
                            </label>
                        </form>
                    </div>

                    <div className="question-container">
                        <div className="question-header">Вопрос 3</div>
                        <div className="question-question">Как выучить C#?</div>
                        <form>
                            <label className="custom-checkbox">
                                <input type="checkbox" name="q2" value="1"/>
                                <span className="custom-checkbox-icon"></span>
                                Никак
                            </label>
                            <br/>
                            <label className="custom-checkbox">
                                <input type="checkbox" name="q2" value="2"/>
                                <span className="custom-checkbox-icon"></span>
                                Не знаю
                            </label>
                            <br/>
                            <label className="custom-checkbox">
                                <input type="checkbox" name="q2" value="3"/>
                                <span className="custom-checkbox-icon"></span>
                                По курсам
                            </label>
                            <br/>
                            <label className="custom-checkbox">
                                <input type="checkbox" name="q2" value="4" defaultChecked/>
                                <span className="custom-checkbox-icon"></span>
                                Добри добри C#
                            </label>
                        </form>
                    </div>

                    <div className="question-container">
                        <div className="question-header">Вопрос 4</div>
                        <div className="question-question">Как выучить C#?</div>
                        <textarea placeholder="" rows="4" className="custom-textarea"/>
                    </div>

                    <div id="TestDetailManageButtons">

                        <button id="TestDetailChangeButton" onClick={() => navigate('/system/course/test/overview')}
                                style={{cursor: "pointer"}}>
                            Закончить попытку
                        </button>


                    </div>
                </div>

            </div>
        </div>
    );
}

export default Questionnaire;
