
import './App.css';
import './styles/fonts.css'
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import Calendar from "./Test";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
import AuthorizedContainer from "./AuthorizedContainer";

function App() {
    const router = createBrowserRouter([
        {
            index: true,
            element: <AuthorizedContainer />,

        }
       ]);

    return <RouterProvider router={router} />;
}

export default App;
