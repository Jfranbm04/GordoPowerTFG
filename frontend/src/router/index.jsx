
import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/LoginPage";
import RootLayout from "../layout/RootLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import DataFormPage from "../pages/DataFormPage";
import RegisterPage from "../pages/RegisterPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
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
                path: "installation/dataForm",
                element:
                    <ProtectedRoute>
                        <DataFormPage />
                    </ProtectedRoute>
            }

        ]
    }

]);