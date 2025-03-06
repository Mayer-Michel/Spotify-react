import { createBrowserRouter } from "react-router-dom";
import HomeOffline from "../screens/OfflineScreens/HomeOffline";
import Login from "../screens/OfflineScreens/Login";
import Subscription from "../screens/OfflineScreens/Subscription";
import Register from "../screens/OfflineScreens/Register";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import PaymentCancel from "../screens/OfflineScreens/PaymentCancel";
import PaymentSuccess from "../screens/OfflineScreens/PaymentSuccess";

const OfflineRouter = createBrowserRouter([
    {
        // élément qui sera retourné sur toutes les vues
        element: <HomeOffline/>,
        // élément retourné en cas d'erreur
        erroElement: <ErrorPage/>,
        children: [
            {
                // chemin de la vue
                path: '/',
                // élément à retourner
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/subscription',
                element: <Subscription/>
            },
            {
                path: '/cancel',
                element: <PaymentCancel/>
            },
            {
                path: '/success',
                element: <PaymentSuccess />
            }
        ]
    }
])

export default OfflineRouter;