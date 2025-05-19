import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const SkinContext = createContext();

export const SkinProvider = ({ children }) => {
    const { getCurrentUser } = useAuth();
    const [skins, setSkins] = useState([]);
    const [userSkins, setUserSkins] = useState([]);
    const [loading, setLoading] = useState(true);
    const urlApi = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchSkins(), fetchUserSkins()]);
            setLoading(false);
        };

        loadData();
    }, []);

    // Obtener todas las skins
    const fetchSkins = async () => {
        try {
            const response = await fetch(`${urlApi}/api/skins`);
            if (!response.ok) {
                throw new Error('Error al obtener las skins');
            }
            const data = await response.json();
            setSkins(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Obtener una skin por ID
    const fetchSkinById = async (id) => {
        try {
            const response = await fetch(`${urlApi}/api/skins/${id}`);
            if (!response.ok) {
                throw new Error('Error fetching skin by ID');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    // Obtener un userSkin por ID
    const fetchUserSkinById = async (id) => {
        try {
            const response = await fetch(`${urlApi}/api/user_skins/${id}`);
            if (!response.ok) {
                throw new Error('Error fetching user skin by ID');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    // Obtener las skins del usuario
    const fetchUserSkins = async () => {
        const user = getCurrentUser();
        if (!user) return;

        try {
            const response = await fetch(`${urlApi}/api/user/${user.id}/unlocked_skins`);
            if (!response.ok) {
                throw new Error('Error al obtener las skins del usuario');
            }
            const data = await response.json();
            // console.log("fetchUserSkins: ", data);
            setUserSkins(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Desbloquear una nueva skin para el usuario
    const unlockSkin = async (skinId) => {
        const user = getCurrentUser();
        if (!user) return;

        try {
            const response = await fetch(`${urlApi}/api/user_skins`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                    // 'Accept': 'application/ld+json'
                },
                body: JSON.stringify({
                    "user": `/api/users/${user.id}`,
                    "skin": `/api/skin/${skinId}`,
                    "unlocked": true,
                    "quantity": 1
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error('Error al desbloquear la skin');
            }

            // Actualizar la lista de skins del usuario
            await fetchUserSkins();
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    // Actualizar la cantidad de una skin del usuario
    const updateSkinQuantity = async (userSkinId, newQuantity) => {
        try {
            const response = await fetch(`${urlApi}/api/user_skins/${userSkinId}`, {
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

            // Actualizar la lista de skins del usuario
            await fetchUserSkins();
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    // Crear una nueva skin
    const createSkin = async (skinData, hasImage = false) => {
        try {
            let response;

            if (hasImage) {
                // Si hay imagen, enviamos como FormData
                response = await fetch(`${urlApi}/api/skin/new`, {
                    method: 'POST',
                    body: skinData // Ya es un FormData
                });
            } else {
                // Si no hay imagen, enviamos como JSON
                response = await fetch(`${urlApi}/api/skin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/ld+json',
                        'Accept': 'application/ld+json'
                    },
                    body: JSON.stringify(skinData)
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error('Error al crear la skin');
            }

            // Actualizar la lista de skins
            await fetchSkins();
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    // Actualizar una skin existente
    const updateSkin = async (skinId, skinData, hasImage = false) => {
        try {
            let response;

            if (hasImage) {
                // Si hay imagen, enviamos como FormData
                response = await fetch(`${urlApi}/api/skin/${skinId}/edit`, {
                    method: 'POST',
                    body: skinData // Ya es un FormData
                });
            } else {
                // Si no hay imagen, enviamos como JSON
                response = await fetch(`${urlApi}/api/skin/${skinId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/merge-patch+json',
                    },
                    body: JSON.stringify(skinData)
                });
            }

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    throw new Error(errorData.message || 'Error al actualizar la skin');
                } else {
                    const errorText = await response.text();
                    console.error('Error response (text):', errorText);
                    throw new Error('Error al actualizar la skin: respuesta no válida del servidor');
                }
            }

            // Actualizar la lista de skins
            await fetchSkins();
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    // Eliminar una skin
    const deleteSkin = async (skinId) => {
        try {
            const response = await fetch(`${urlApi}/api/skin/${skinId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la skin');
            }

            // Actualizar la lista de skins
            await fetchSkins();
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    const equipSkin = async (userSkinId) => {
        try {
            // Buscar la skin actualmente activa y desactivarla
            const activeSkin = userSkins?.find(userSkin => userSkin.active === true);
            console.log("userSkins", userSkins)
            console.log("activeSkin", activeSkin)
            if (activeSkin && activeSkin.id !== userSkinId) {
                await fetch(`${urlApi}/api/user_skins/${activeSkin.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/merge-patch+json',
                    },
                    body: JSON.stringify({ active: false })
                });
                console.log("Paso1")
            }

            // Activar la nueva skin
            await fetch(`${urlApi}/api/user_skins/${userSkinId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify({ active: true })
            });
            console.log("Paso2")

            await fetchUserSkins();
            console.log("Paso3")

            return true;
        } catch (error) {
            console.error('Error al equipar la skin:', error);
            return false;
        }
    };

    return (
        <SkinContext.Provider value={{
            skins,
            userSkins,
            loading,
            createSkin,
            updateSkin,
            deleteSkin,
            unlockSkin,
            updateSkinQuantity,
            fetchUserSkins,
            fetchUserSkinById,
            equipSkin,
            fetchSkinById,
        }}>
            {children}
        </SkinContext.Provider>
    );
};

export const useSkin = () => {
    const context = useContext(SkinContext);
    if (!context) {
        throw new Error("useSkin debe estar dentro del proveedor SkinProvider");
    }
    return context;
};