import React, {useState} from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import '../../styles/AuthorizedContainer.css';
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import MyCourses from "../../pages/MyCourses";
import CourseDetail from "../../pages/CourseDetail";
import LrDetail from "../../pages/LrManage";
import LrManage from "../../pages/LrManage";
import FileAttachment from "../CoursePage/FileAttachment";
import AllStudentMarks from "../../pages/AllStudentMarks";
import AllStudentMarksForCurrentSubject from "../../pages/AllStudentMarksForCurrentSubject";
import CourseElement from "../CoursePage/CourseElement";
import TestDetail from "../../pages/TestDetail";
import TestOverview from "../../pages/TestOverview";
import Testik from "../../pages/DoingTest";
import MyProfile from "../../pages/StudingUserProfile";
import OtherProfile from "../../pages/OtherProfile";
import GroupMarksTable from "../Statistics/GroupMarksTable";
import GroupMarks from "../../pages/GroupMarks";
import MyChats from "../../pages/MyChats";
import FindContacts from "../../pages/FindContacts";


function AuthorizedContainer() {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

    // Колбек для обновления состояния родителя
    const handleMenuToggle = (collapsedState) => {
        setIsMenuCollapsed(collapsedState);
    };

    return (
        <div
            className="MainContainer"
            style={{
                marginLeft: isMenuCollapsed ? "60px" : "200px", // Меняем отступ для центрального контента
            }}
        >
            <div className={`LeftMenu ${isMenuCollapsed ? "collapsed" : ""}`}>
                <LeftMenu onMenuToggle={handleMenuToggle}/>
            </div>
            <div className="Content">
                <Outlet></Outlet>
            </div>
            <div className="RightMenu">
                <RightMenu/>
            </div>
        </div>
    );
}

export default AuthorizedContainer;
