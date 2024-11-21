import './App.css';
import './styles/fonts.css'
import LeftMenu from "./components/MainContainer/LeftMenu";
import RightMenu from "./components/MainContainer/RightMenu";
import Calendar from "./components/MainContainer/Calendar";
import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from 'react-router-dom';
import AuthorizedContainer from "./components/MainContainer/AuthorizedContainer";
import Login from "./pages/Login";
import MyCourses from "./pages/MyCourses";
import CourseDetail from "./pages/CourseDetail";
import MyChats from "./pages/MyChats";
import MyProfile from "./pages/MyProfile";
import AllStudentMarks from "./pages/AllStudentMarks";
import AllStudentMarksForCurrentSubject from "./pages/AllStudentMarksForCurrentSubject";
import LrDetail from "./pages/LrDetail";
import TestDetail from "./pages/TestDetail";
import LrManage from "./pages/LrManage";
import TestOverview from "./pages/TestOverview";
import DoingTest from "./pages/DoingTest";
import FindContacts from "./pages/FindContacts";
import OtherProfile from "./pages/OtherProfile";
import Chat from "./pages/Chat";
import AllSendendTasksFromStudent from "./pages/AllSendendTasksFromStudent";
import AllSendendTasks from "./pages/AllSendendTasks";
import LrRate from "./pages/LrRate";
import AllEvents from "./pages/AllEvents";
import ChangeTask from "./pages/ChangeTask";

function App() {
    const router = createBrowserRouter([
        {
            index: true,
            element: <Login/>,

        },
        {
            path: "/system",
            element: <AuthorizedContainer/>,
            children: [
                {
                    path: "/system/courses/",
                    element: <MyCourses></MyCourses>
                },
                {
                    path: "/system/course/",
                    element: <CourseDetail></CourseDetail>
                },
                {
                    path: "/system/profile",
                    element: <MyProfile></MyProfile>,
                },
                {
                    path: "/system/chats",
                    element: <MyChats></MyChats>,
                },
                {
                    path: "/system/chats/chat",
                    element: <Chat></Chat>,
                },
                {
                    path: "/system/findcontacts",
                    element: <FindContacts></FindContacts>
                },
                {
                    path: "/system/profile/profileid",
                    element: <OtherProfile></OtherProfile>
                },
                {
                    path: "/system/mymarks",
                    element: <AllStudentMarks></AllStudentMarks>,
                },
                {
                    path: "/system/mymarks/subject",
                    element: <AllStudentMarksForCurrentSubject></AllStudentMarksForCurrentSubject>

                },
                {
                    path: "/system/course/task",
                    element: <LrDetail></LrDetail>
                },
                {
                    path: "/system/course/task/change",
                    element: <ChangeTask></ChangeTask>
                },
                {
                    path: "/system/course/test",
                    element: <TestDetail></TestDetail>
                },
                {
                    path: "/system/course/answers",
                    element: <AllSendendTasks></AllSendendTasks>
                },
                {
                    path: "/system/course/answers/students",
                    element: <AllSendendTasksFromStudent></AllSendendTasksFromStudent>
                },
                {
                    path: "/system/course/answers/students/student",
                    element: <LrRate></LrRate>
                },
                {
                    path: "/system/course/events",
                    element: <AllEvents></AllEvents>
                },
                {
                    path: "/system/course/task/manage",
                    element: <LrManage></LrManage>
                },
                {
                    path: "/system/course/test/manage",
                    element: <TestDetail></TestDetail>
                },
                {
                    path: "/system/course/test/complete",
                    element: <DoingTest></DoingTest>
                },
                {
                    path: "/system/course/test/overview",
                    element: <TestOverview></TestOverview>
                }, {
                    index: true,
                    element: <MyCourses/>,

                },
            ]
        },

    ]);

    return <RouterProvider router={router}/>;
}

export default App;
