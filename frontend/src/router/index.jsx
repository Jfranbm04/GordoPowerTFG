
import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/LoginPage";
import RootLayout from "../layout/RootLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";

export const router = createBrowserRouter([
    {
        path: "login",
        element:
            <LoginPage />
    },
    {
        path: "register",
        element:
            <RegisterPage />
    },
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "profile",
                element:
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
            }

        ]
    }

]);