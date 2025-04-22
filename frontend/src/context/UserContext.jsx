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

    useEffect(() => {
        const fetchCharacter = async () => {
            if (user && user.id) {  // Check if token exists
                setLoading(true);
                try {
                    console.log('Fetching with token:', token);
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
                    console.log('Character data:', data);
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
        <UserContext.Provider value={{ user, character, loading }}>
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