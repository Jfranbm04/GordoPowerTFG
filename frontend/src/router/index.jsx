
import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../pages/LoginPage";
import RootLayout from "../layout/RootLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import MinigamesPage from "../pages/MinigamesPage";
import CountryGame from "../pages/CountryGamePage";
import FoodZoomPage from "../pages/FoodZoomPage";
import GachaPage from "../pages/GachaPage";
import CollectionPage from "../pages/CollectionPage";
import AdminPage from "../pages/AdminPage";
import ShopPage from "../pages/ShopPage";
import AdminUserPage from "../components/AdminUser";
import AdminFood from "../components/AdminFood";
import AdminUser from "../components/AdminUser";
import AdminSkin from "../components/AdminSkin";
import FoodOrNotPage from "../pages/FoodOrNotPage";

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
                path: "shop",
                element:
                    <ProtectedRoute>
                        <ShopPage />
                    </ProtectedRoute>
            },
            {
                path: "collection",
                element:
                    <ProtectedRoute>
                        <CollectionPage />
                    </ProtectedRoute>
            },
            {
                path: "gacha",
                element:
                    <ProtectedRoute>
                        <GachaPage />
                    </ProtectedRoute>
            },
            {
                path: "minigames",
                element:
                    <ProtectedRoute>
                        <MinigamesPage />
                    </ProtectedRoute>,
            },
            {
                path: "country",
                element:
                    <ProtectedRoute>
                        <CountryGame />
                    </ProtectedRoute>
            },
            {
                path: "foodzoom",
                element:
                    <ProtectedRoute>
                        <FoodZoomPage />
                    </ProtectedRoute>
            },
            {
                path: "foodornot",
                element:
                    <ProtectedRoute>
                        <FoodOrNotPage />
                    </ProtectedRoute>
            },
            {
                path: "admin",
                element:
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>,
                children: [
                    {
                        path: "platos",
                        element: <AdminFood />
                    },
                    {
                        path: "users",
                        element: <AdminUser />
                    },
                    {
                        path: "skins",
                        element: <AdminSkin />
                    },
                ]
            },
            // {
            //     path: "admin-users",
            //     element:
            //         <ProtectedRoute>
            //             <AdminUserPage />
            //         </ProtectedRoute>
            // },

        ]
    }

]);