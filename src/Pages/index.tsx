import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LayoutPage} from "./Layout.page";
import {ErrorPage} from "./ErrorPage/Error.page";
import {AuthPage} from "./AuthPage/Auth.page";
import {MailingPage} from "./MailingPage/Mailing.page";
import {HistoryPage} from "./HistoryPage/History.page";
import {ReportPage} from "./ReportPage/Report.page";
import {selectCurrentUser} from "../Entities/Auth";
import { ProtectedRoute } from "Features";
import {useAppSelector} from "Shared";
import {Navigate} from "react-router";

export const Routing = () => {
    const user = useAppSelector(selectCurrentUser)
    const router = createBrowserRouter([
        {
            path: '/',
            element: <LayoutPage />,
            errorElement: <ErrorPage/>,
            children: [
                {
                    index: !user,
                    element: <AuthPage/>
                },
                {
                    index: !!user,
                    element: (
                        <Navigate to={"/history"}/>
                    )
                },
                {
                    element: <ProtectedRoute isAllowed={!!user}/>,
                    children: [
                        {
                            path: 'mailing',
                            element: (
                                <MailingPage/>
                            )
                        },
                        {
                            path: 'history',
                            children: [
                                {
                                    index: true,
                                    element: <HistoryPage/>
                                },
                                {
                                    path: ':reportID',
                                    element: <ReportPage/>
                                }
                            ]
                        }
                    ]
                },
            ]
        },
    ])

    return (
        <RouterProvider router={router}/>
    );
};