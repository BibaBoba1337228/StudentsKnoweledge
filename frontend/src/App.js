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
import AdminPanel from "./pages/AdminPanel";
import GroupMarks from "./pages/GroupMarks";
import LoginErrorBoundary from "./components/LoginErrorBoundary";
import MainPage from "./pages/MainPage";
import {mainPageLoader} from "./api/loaders/MainPageLoader";
import {myCourcesLoader} from "./api/loaders/MyCourcesLoader";
import {courseDetailLoader} from "./api/loaders/CourseDetailLoader";
import {adminPanelLoader} from "./api/loaders/AdminPanelLoader";
import {courseWorksLoader} from "./api/loaders/CourseWorksLoader";
import {studentsWorksLoader} from "./api/loaders/StudentsWorksLoader";
import ProtectedRoute from "./api/ProtectedRoute";
import {lrDetailLoader} from "./api/loaders/LrDetailLoader";
import {lrDetailLoader2} from "./api/loaders/LrDetailLoader2";


function App() {
    const router = createBrowserRouter([
        {
            index: true,
            element: <MainPage/>,
            loader: mainPageLoader,
            errorElement: <LoginErrorBoundary/>

        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/system",
            element: (
                <ProtectedRoute>
                    <AuthorizedContainer/>
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/system/courses/",
                    element: <Outlet/>,
                    children: [
                        {
                            path: "/system/courses/course/:courseId",
                            element: <Outlet/>,
                            children: [
                                {
                                    index: true,
                                    element: <CourseDetail></CourseDetail>,
                                    loader: courseDetailLoader,
                                    errorElement: <LoginErrorBoundary></LoginErrorBoundary>
                                },
                                {
                                    path: "/system/courses/course/:courseId/task/:taskId/manage",
                                    element: <LrManage></LrManage>,
                                    loader: lrDetailLoader2,
                                    errorElement: <LoginErrorBoundary></LoginErrorBoundary>
                                },
                                {
                                    path: "/system/courses/course/:courseId/task/:taskId/edit",
                                    element: <ChangeTask></ChangeTask>,
                                    errorElement: <LoginErrorBoundary></LoginErrorBoundary>
                                },
                                {
                                    path: "/system/courses/course/:courseId/answers",
                                    element: <AllSendendTasks></AllSendendTasks>,
                                    loader: courseWorksLoader,
                                    errorElement: <LoginErrorBoundary></LoginErrorBoundary>
                                },
                                {
                                    path: "/system/courses/course/:courseId/task/:taskId/answers/students",
                                    element: <AllSendendTasksFromStudent></AllSendendTasksFromStudent>,
                                    loader: studentsWorksLoader,
                                    errorElement: <LoginErrorBoundary></LoginErrorBoundary>
                                },
                                {
                                    path: "/system/courses/course/:courseId/task/:taskId",
                                    element: <LrDetail></LrDetail>,
                                    loader: lrDetailLoader,
                                    errorElement: <LoginErrorBoundary></LoginErrorBoundary>
                                },
                                {
                                    path: "/system/courses/course/:courseId/events/",
                                    element: <AllEvents></AllEvents>,
                                    errorElement: <LoginErrorBoundary></LoginErrorBoundary>
                                },
                                {
                                    path: "/system/courses/course/:courseId/marks",
                                    element: <GroupMarks></GroupMarks>,
                                    errorElement: <LoginErrorBoundary></LoginErrorBoundary>
                                },
                            ]
                        },
                        {
                            index: true,
                            element: <MyCourses></MyCourses>,
                            loader: myCourcesLoader,
                            errorElement: <LoginErrorBoundary></LoginErrorBoundary>
                        },

                    ]

                },
                {
                    path: "/system/admin",
                    element: <AdminPanel></AdminPanel>,
                    errorElement: <LoginErrorBoundary></LoginErrorBoundary>
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
                    path: "/system/course/test",
                    element: <TestDetail></TestDetail>
                },


                {
                    path: "/system/course/answers/students/student",
                    element: <LrRate></LrRate>
                },

                {
                    index: true,
                    element: <MyCourses/>,

                },
            ]
        },

    ]);

    return <RouterProvider router={router}/>;
}

export default App;
