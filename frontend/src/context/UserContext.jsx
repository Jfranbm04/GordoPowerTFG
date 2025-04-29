import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { getCurrentUser, token } = useAuth();
    const [user, setUser] = useState(getCurrentUser());
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        setUser(getCurrentUser());
    }, [getCurrentUser]);

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

    useEffect(() => {
        const fetchCharacter = async () => {
            if (user && user.id) {  // Check if token exists
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
                console.log('Missing user ID or token:', { userId: user?.id, hasToken: !!token });
                setCharacter(null);
                setLoading(false);
            }
        };
        fetchCharacter();
    }, [user, BASE_URL]);

    return (
        <UserContext.Provider value={{ user, character, loading, updateUserCoins, updateUserFood }}>
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