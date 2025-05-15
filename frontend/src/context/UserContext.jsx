import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { getCurrentUser, token } = useAuth();
    const [user, setUser] = useState(getCurrentUser());
    const [users, setUsers] = useState([])
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        setUser(getCurrentUser());
    }, [getCurrentUser]);

    useEffect(() => {
        fetchCharacter();
    }, [user, BASE_URL]);

    useEffect(() => {
        fetchUsers();
    }, [])

    const updateUserCoins = async (userId, newCoins) => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify({
                    coins: newCoins
                })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar monedas');
            }

            const updatedUser = await response.json();
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return updatedUser;
        } catch (error) {
            console.error('Error actualizando monedas:', error);
            throw error;
        }
    };

    const updateUserFood = async (userId, foodId) => {
        try {
            // Primero verificamos si el usuario ya tiene esta comida
            const response = await fetch(`${BASE_URL}/api/user_foods?user=${userId}&food=${foodId}`);
            const data = await response.json();
            const existingUserFood = data['hydra:member'][0];

            if (existingUserFood) {
                // Si ya existe, actualizamos la cantidad
                const updateResponse = await fetch(`${BASE_URL}/api/user_foods/${existingUserFood.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/merge-patch+json',
                    },
                    body: JSON.stringify({
                        quantity: existingUserFood.quantity + 1
                    })
                });

                if (!updateResponse.ok) {
                    throw new Error('Error al actualizar la cantidad de comida');
                }
            } else {
                // Si no existe, creamos un nuevo registro
                const createResponse = await fetch(`${BASE_URL}/api/user_foods`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/ld+json',
                    },
                    body: JSON.stringify({
                        user: `/api/users/${userId}`,
                        food: `/api/food/${foodId}`,
                        unlocked: true,
                        quantity: 1
                    })
                });

                if (!createResponse.ok) {
                    throw new Error('Error al crear el registro de comida');
                }
            }

            return true;
        } catch (error) {
            console.error('Error actualizando comida del usuario:', error);
            throw error;
        }
    };
    const fetchCharacter = async () => {
        if (user && user.id) {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/api/character/user/${user.id}`, {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        // "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Server response:', errorData);
                    throw new Error(errorData.message || 'Failed to fetch character');
                }

                const data = await response.json();
                // console.log('Character data:', data);
                setCharacter(data);
            } catch (error) {
                console.error('Error fetching character:', error);
                setCharacter(null);
            }
            setLoading(false);
        } else {
            setCharacter(null);
            setLoading(false);
        }
    };


    const updateCharacter = async (characterId, updates) => {
        try {
            const response = await fetch(`${BASE_URL}/api/characters/${characterId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el personaje');
            }

            const updatedCharacter = await response.json();
            setCharacter(updatedCharacter);
            return updatedCharacter;
        } catch (error) {
            console.error('Error al actualizar el personaje:', error);
            throw error;
        }
    };
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/users`);

            if (!response.ok) {
                throw new Error("Error al obtener usuarios");
            }

            const data = await response.json();
            console.log("Datos fetchUsers:", data)
            setUsers(data);
            return data;
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const updateUser = async (userId, updates) => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }

            const updatedUser = await response.json();

            // Actualizar el localStorage si es el usuario actual
            const currentUser = getCurrentUser();
            if (currentUser && currentUser.id === userId) {
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }

            return updatedUser;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{ user, character, loading, updateCharacter, updateUserCoins, updateUserFood, users, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
