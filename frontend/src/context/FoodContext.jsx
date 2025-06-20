import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const { getCurrentUser } = useAuth();
    const [foods, setFoods] = useState([]);
    const [userFoods, setUserFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchFoods(), fetchUserFoods()]);
            setLoading(false);
        };

        loadData();
    }, []);


    // Obtener todas las comidas
    const fetchFoods = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/food`);
            if (!response.ok) {
                throw new Error('Error al obtener las comidas');
            }
            const data = await response.json();
            setFoods(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Obtener las comidas del usuario
    const fetchUserFoods = async () => {
        const user = getCurrentUser();
        if (!user) return;

        try {
            const response = await fetch(`${BASE_URL}/api/user_foods?user=${user.id}`);
            if (!response.ok) {
                throw new Error('Error al obtener las comidas del usuario');
            }
            const data = await response.json();
            console.log("dataUser", data);

            // Filtrar solo los alimentos del usuario actual
            if (data && data.member && Array.isArray(data.member)) {
                const filteredFoods = data.member.filter(food => {
                    // Extraer el ID del usuario de la URL
                    const userId = food.user.split('/').pop();
                    return userId === user.id.toString();
                });
                console.log("filteredFoods", filteredFoods);
                setUserFoods(filteredFoods);
            } else {
                setUserFoods([]);
            }
        } catch (error) {
            console.error('Error:', error);
            setUserFoods([]);
        }
    };

    // Desbloquear una nueva comida para el usuario
    const unlockFood = async (foodId) => {
        const user = getCurrentUser();
        if (!user) return;

        try {
            const response = await fetch(`${BASE_URL}/api/user_foods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                    'Accept': 'application/ld+json'
                },
                body: JSON.stringify({

                    "user": `/api/users/${user.id}`,
                    "food": `/api/food/${foodId}`,
                    "unlocked": true,
                    "quantity": 1
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error('Error al desbloquear la comida');
            }

            // Actualizar la lista de comidas del usuario
            await fetchUserFoods();
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    // Actualizar la cantidad de una comida del usuario
    const updateFoodQuantity = async (userFoodId, newQuantity) => {
        try {
            const response = await fetch(`${BASE_URL}/api/user_foods/${userFoodId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify({
                    quantity: newQuantity
                })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la cantidad');
            }

            // Actualizar la lista de comidas del usuario
            await fetchUserFoods();
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    // Crear un nuevo plato
    const createFood = async (foodData, hasImage = false) => {
        try {
            let response;

            if (hasImage) {
                // Si hay imagen, enviamos como FormData
                response = await fetch(`${BASE_URL}/api/food/new`, {
                    method: 'POST',
                    body: foodData // Ya es un FormData
                });
            } else {
                // Si no hay imagen, enviamos como JSON
                response = await fetch(`${BASE_URL}/api/food`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/ld+json',
                        'Accept': 'application/ld+json'
                    },
                    body: JSON.stringify(foodData)
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error('Error al crear el plato');
            }

            // Actualizar la lista de comidas
            await fetchFoods();
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    // Actualizar un plato existente
    const updateFood = async (foodId, foodData, hasImage = false) => {
        try {
            let response;

            if (hasImage) {
                // Si hay imagen, enviamos como FormData
                response = await fetch(`${BASE_URL}/api/food/${foodId}/edit`, {
                    method: 'POST',
                    body: foodData // Ya es un FormData
                });
            } else {
                // Si no hay imagen, enviamos como JSON
                response = await fetch(`${BASE_URL}/api/food/${foodId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/merge-patch+json',
                    },
                    body: JSON.stringify(foodData)
                });
            }

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    throw new Error(errorData.message || 'Error al actualizar el plato');
                } else {
                    // Si la respuesta no es JSON, obtenemos el texto
                    const errorText = await response.text();
                    console.error('Error response (text):', errorText);
                    throw new Error('Error al actualizar el plato: respuesta no válida del servidor');
                }
            }

            // Actualizar la lista de comidas
            await fetchFoods();
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    // Eliminar un plato
    const deleteFood = async (foodId) => {
        try {
            const response = await fetch(`${BASE_URL}/api/food/${foodId}`, {
                method: 'DELETE',

            });

            if (!response.ok) {
                throw new Error('Error al eliminar el plato');
            }

            // Actualizar la lista de comidas
            await fetchFoods();
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };



    return (
        <FoodContext.Provider
            value={{
                foods,
                userFoods,
                loading,
                unlockFood,
                updateFoodQuantity,
                refreshUserFoods: fetchUserFoods,
                createFood,
                updateFood,
                deleteFood
            }}
        >
            {children}
        </FoodContext.Provider>
    );
};

export const useFood = () => {
    const context = useContext(FoodContext);
    if (!context) {
        throw new Error("useFood debe ser usado dentro de un FoodProvider");
    }
    return context;
};