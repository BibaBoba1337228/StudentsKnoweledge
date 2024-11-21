import React, {useState} from 'react';
import {Navigate, Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import '../styles/ChangeTask.css';
import lab from '../assets/icons/lab.svg'
import FileAttachment from "../components/CoursePage/FileAttachment";


function ChangeTask() {


    const [materialType, setMaterialType] = useState('Ответ студента');  // Состояние для выбранного типа материала
    const navigate = useNavigate();

    // Функция для обновления состояния выбранного типа материала
    const handleDropdownChange = (e) => {
        setMaterialType(e.target.value);
    };


    return (
        <div id="ChangeTaskWrapper">


            <div id="ChangeTaskContainer">

                <div id="ChangeTaskHeaderContainer">

                    <div id="ChangeTaskHeader">Лабораторная работа №1</div>
                    <div id="ChangeTaskDelimiter"></div>
                </div>

                <div id="ChangeTaskCourceContainer">


                    <div className="ChangeTaskInfoBlock">

                        <div className="ChangeTaskTextBlock">
                            <div className="ChangeTaskInfoBlockHeader">Вид материала:</div>
                            <div style={{padding: "0px", marginLeft: "20px"}}>
                                <select
                                    value={materialType}  // Это значение будет отображать выбранный вариант
                                    onChange={handleDropdownChange}  // Обработчик изменения
                                    id="dropdown"
                                    id="CourceDetailSectionAddModalInputCourseInputDropDown"
                                    style={{zIndex: 2, position: 'relative'}}
                                >
                                    <option value="Ответ студента">Ответ студента</option>
                                    <option value="Файл">Файл</option>
                                    <option value="Текстовый блок">Текстовый блок</option>
                                </select>
                            </div>
                        </div>


                    </div>

                    {/* Условный рендеринг блоков в зависимости от выбранного значения */}
                    {materialType === 'Файл' && (
                        <div className="LrManageInfoBlock">
                            <div id="LrManageInfoFileHeader">Прикрепите файл</div>
                            <FileAttachment/>
                        </div>
                    )}

                    {materialType === 'Текстовый блок' && (
                        <div className="LrManageInfoBlock">
                            <div id="LrManageInfoFileHeader">Текст</div>
                            <textarea
                                style={{width: '100%', height: '350px', marginTop: "20px", maxHeight: "350px"}}
                                placeholder="Начните писать сообщение..."
                            />
                        </div>
                    )}

                    {/* Блок для "Ответ студента" можно добавить, если необходимо */}
                    {materialType === 'Ответ студента' && (
                        <div className="ChangeTaskInfoBlock">

                            <div className="ChangeTaskTextBlock">
                                <div className="ChangeTaskInfoBlockHeader">Срок сдачи:</div>
                                <div className="ChangeTaskInfoBlockInfo">25.03.2024 15:59</div>
                            </div>

                        </div>
                    )}


                    <div id="ChangeTaskManageButtons">

                        <button id="ChangeTaskChangeButton" onClick={() => navigate('/system/course/')}
                                style={{cursor: "pointer"}}>
                            Сохранить
                        </button>


                        <button id="ChangeTaskDeleteButton" onClick={() => navigate('/system/course/')}
                                style={{cursor: "pointer"}}>
                            Отмена
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ChangeTask;
