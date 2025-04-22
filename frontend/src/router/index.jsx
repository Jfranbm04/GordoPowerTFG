
import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/LoginPage";
import RootLayout from "../layout/RootLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import MinigamesPage from "../pages/MinigamesPage";
import { CountryGuesser } from "../components/CountryGuesser";

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
            },
            {
                path: "minigames",
                element:
                    <ProtectedRoute>
                        <MinigamesPage />
                    </ProtectedRoute>,
                children: [
                    {
                        path: "countryguesser",
                        element: <CountryGuesser />
                    },
                    // {
                    //     path: "food-zoom",
                    //     element: <FoodZoom />
                    // },
                    // {
                    //     path: "minigame-3",
                    //     element: <Minigame3 />
                    // }
                ]
            }

        ]
    }

]);