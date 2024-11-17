import '../styles/CourseDetail.css'
import '../styles/fonts.css'
import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from 'react-router-dom';
import CourseElement from "../components/CoursePage/CourseElement";


function MyCourses() {

    return (
        <div id="CourceDetailWrapper">


            <div id="CourceDetailContainer">

                <div id="CourceDetailHeaderContainer">

                    <div id="CourceDetailHeader">Технологии программирования</div>
                    <div id="CourceDetailDelimiter"></div>
                </div>

                <div id="CourceDetailCourceContainer">

                    <CourseElement></CourseElement>
                </div>

            </div>

        </div>
    );
}

export default MyCourses;
