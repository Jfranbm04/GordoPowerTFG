import { useContext, useState } from "react";
import { createContext } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const loginUser = async ({ email, password }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/custom_login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Usuario o contraseña incorrectos");
            }
            const data = await response.json();

            // Verificar si el usuario está baneado
            if (!data.user.active) {
                // logOut(); // Limpiar cualquier dato de sesión
                throw new Error("Tu cuenta ha sido baneada. No puedes iniciar sesión.");
            }

            setToken(data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            return {
                token: data.token,
                user: data.user
            };

        } catch (error) {
            console.log("Error al iniciar sesion", error)
            throw error;
        }
    }

    const logOut = () => {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    const registerUser = async ({ email, username, password }) => {
        try {
            const response = await fetch(`${BASE_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Error al registrar usuario");
            }
            
            return {
                success: data.success,
                message: data.message,
                user: data.user
            };
        } catch (error) {
            console.log("Error al registrar usuario", error);
            return {
                success: false,
                message: error.message || "Error al registrar usuario"
            };
        }
    }

    // Función para decodificar el token JWT
    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return null;
        }
    };



    const getCurrentUser = () => {
        if (!token) return null;

        const userData = localStorage.getItem('user');
        if (!userData) return null;

        return JSON.parse(userData);
    }

    return <authContext.Provider value={{ token, loginUser, logOut, registerUser, getCurrentUser }}>{children}</authContext.Provider>
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
    }
    return context;
};