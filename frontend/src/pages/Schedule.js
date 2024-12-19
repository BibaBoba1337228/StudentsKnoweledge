import React from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import '../styles/GroupMarks.css';
import lab from '../assets/icons/lab.svg'
import GroupMarksTable from "../components/Statistics/GroupMarksTable";
import ScheduleTable from "../components/Statistics/ScheduleTable";


function GroupMarks() {
    return (
        <div id="GroupMarksWrapper">


            <div id="GroupMarksContainer">

                <div id="GroupMarksHeaderContainer">

                    <div id="GroupMarksHeader">Расписание</div>
                    <div id="GroupMarksDelimiter"></div>
                </div>

                <div id="GroupMarksCourceContainer">

                    <ScheduleTable></ScheduleTable>


                </div>

            </div>

        </div>
    );
}

export default GroupMarks;
