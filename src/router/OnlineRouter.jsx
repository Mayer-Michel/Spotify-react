import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OnlineScreens/Home";
import PaymentSuccess from "../screens/OfflineScreens/PaymentSuccess";

const OnlineRouter = createBrowserRouter([
    {
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/success",
                element: <PaymentSuccess />
            },
        ]
    }
]);

export default OnlineRouter;