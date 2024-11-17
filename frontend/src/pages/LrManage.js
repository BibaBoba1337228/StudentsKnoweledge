import React from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import '../styles/LrManage.css';
import lab from '../assets/icons/lab.svg'
import FileAttachment from "../components/CoursePage/FileAttachment";


function LrManage() {
    return (
        <div id="LrManageWrapper">


            <div id="LrManageContainer">

                <div id="LrManageHeaderContainer">

                    <div id="LrManageHeader">Лабораторная работа №1</div>
                    <div id="LrManageDelimiter"></div>
                </div>

                <div id="LrManageCourceContainer">

                    <div className="LrManageInfoBlock">

                        <div className="LrManageTextBlock">
                            <div className="LrManageInfoBlockHeader">Срок сдачи:</div>
                            <div className="LrManageInfoBlockInfo">25.03.2024 15:59</div>
                        </div>

                    </div>

                    <div className="LrManageInfoBlock">

                        <div className="LrManageTextBlock">
                            <div className="LrManageInfoBlockHeader">Описание:</div>
                            <div className="LrManageInfoBlockInfo">Реализовать нужно только пункты 1.1-1.3 из
                                методички
                            </div>
                        </div>

                    </div>

                    <div className="LrManageInfoBlock">

                        <div id="LrManageInfoFileHeader">Прикрепите файл</div>
                        <FileAttachment></FileAttachment>

                    </div>


                    <div id="LrManageManageButtons">

                        <button id="LrManageChangeButton">
                            Сохранить
                        </button>


                        <button id="LrManageDeleteButton">
                            Отмена
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default LrManage;
