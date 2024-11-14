import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import Forgotpassword from "../pages/Forgotpassword";
import Mainpage from "../pages/Mainpage";
import Notfound from "../pages/Notfound";

const router = createBrowserRouter([
{
    path : "/",
    element : <App/>,
    children : [
        {
            path : "register",
            element : <RegisterPage/>
        },
        {
            path : 'email',
            element : <CheckEmailPage/>
        },
        {
            path : 'password',
            element : <CheckPasswordPage/>
                },
        {
            path : 'forgot-password',
            element : <Forgotpassword/>
            },
        {
            path:'',
            element: <Mainpage></Mainpage>
        },
        {
            path : "home",
            element : <Home/>,
            children : [
                {
                    path : ':userId',
                    element : <MessagePage/>
                }
            ]
        },
        {
            path: "*",
            element: <Notfound />
        }
    ]
}
])

export default router