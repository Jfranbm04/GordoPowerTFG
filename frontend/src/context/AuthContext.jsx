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
            const response = await fetch(`${BASE_URL}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/ld+json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    username,
                    coins: 1000,
                    roles: ["ROLE_USER"]
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Error al registrar usuario");
            }
            const data = await response.json();

            // Crear el personaje para el usuario
            const characterResponse = await fetch(`${BASE_URL}/api/characters`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/ld+json",
                },
                body: JSON.stringify({
                    user: `/api/users/${data.id}`,
                    level: 1,
                    strength: 1,
                    weight: 50,
                    protein: 100,
                    fat: 100,
                    experience: 0
                })
            });

            if (!characterResponse.ok) {
                throw new Error("Error al crear el personaje");
            }

            return data;
        } catch (error) {
            console.log("Error al registrar usuario", error);
            throw error;
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