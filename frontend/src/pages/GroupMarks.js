import React from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import '../styles/GroupMarks.css';
import lab from '../assets/icons/lab.svg'
import GroupMarksTable from "../components/Statistics/GroupMarksTable";


function GroupMarks() {
    return (
        <div id="GroupMarksWrapper">


            <div id="GroupMarksContainer">

                <div id="GroupMarksHeaderContainer">

                    <div id="GroupMarksHeader">Успеваемость групп по курсу</div>
                    <div id="GroupMarksDelimiter"></div>
                </div>

                <div id="GroupMarksCourceContainer">

                    <GroupMarksTable></GroupMarksTable>


                </div>

            </div>

        </div>
    );
}

export default GroupMarks;
