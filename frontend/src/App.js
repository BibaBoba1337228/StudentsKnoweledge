import './App.css';
import './styles/fonts.css'
import LeftMenu from "./components/MainContainer/LeftMenu";
import RightMenu from "./components/MainContainer/RightMenu";
import Calendar from "./components/MainContainer/Calendar";
import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from 'react-router-dom';
import AuthorizedContainer from "./components/MainContainer/AuthorizedContainer";
import Login from "./pages/Login";

function App() {
    const router = createBrowserRouter([
        {
            index: true,
            element: <AuthorizedContainer/>,

        }
    ]);

    return <RouterProvider router={router}/>;
}

export default App;
