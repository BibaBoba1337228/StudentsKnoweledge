import React from 'react';
import '../styles/GroupMarks.css';

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
