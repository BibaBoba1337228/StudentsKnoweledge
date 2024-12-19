import React from 'react';
import '../styles/GroupMarks.css';
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
