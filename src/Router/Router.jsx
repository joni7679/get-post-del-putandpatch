import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UserData from "../component/Userdata";
import Edit from "../component/Edit";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,  
    },
    {
        path: "/userdata",
        element: <UserData />,  
    },
    {
        path: "/editdata",
        element: <Edit/>,  
    },
]);
