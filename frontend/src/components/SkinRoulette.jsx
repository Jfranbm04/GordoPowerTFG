import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { useSkin } from '../context/SkinContext';

export const SkinRoulette = ({ cost, onClose, character }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [finalResult, setFinalResult] = useState(null);
    const [items, setItems] = useState([]);
    const { user, updateUserCoins } = useUser();
    const { getCurrentUser } = useAuth();
    const { skins, unlockSkin, userSkins } = useSkin();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // Función para verificar si una skin cumple con las condiciones del personaje
    const skinMeetsConditions = (skin) => {
        if (!character) return false;

        // Verificar si las estadísticas del personaje son mayores que las condiciones de la skin
        const levelOk = !skin.levelcondition || character.level >= skin.levelcondition;
        const proteinOk = !skin.proteincondition || character.protein >= skin.proteincondition;
        const fatOk = !skin.fatcondition || character.fat >= skin.fatcondition;

        return levelOk && proteinOk && fatOk;
    };

    // Función para obtener skins aleatorias que el usuario no tenga desbloqueadas y que cumplan con las condiciones
    const getRandomUnlockedSkin = (rarity) => {
        if (!skins?.member || !userSkins) return null;

        // Filtrar las skins que el usuario no tiene desbloqueadas
        const unlockedSkinIds = userSkins.map(us => {
            return us.skin.split('/').pop();
        });

        // Filtrar por rareza, que no estén desbloqueadas y que cumplan con las condiciones del personaje
        const availableSkins = skins.member.filter(skin =>
            !unlockedSkinIds.includes(skin.id.toString()) &&
            (rarity ? skin.rarity.toUpperCase() === rarity : true) &&
            skinMeetsConditions(skin)
        );

        // Si no hay skins disponibles, retornar null
        if (availableSkins.length === 0) return null;

        // Retornar una skin aleatoria
        return availableSkins[Math.floor(Math.random() * availableSkins.length)];
    };

    const spin = async () => {
        if (!user || user.coins < cost || isRunning) return;

        // Obtener skins aleatorias que el usuario no tenga y que cumplan con las condiciones
        const commonSkin = getRandomUnlockedSkin('COMMON') || getRandomUnlockedSkin('RARE');
        const rareSkin = getRandomUnlockedSkin('EPIC') || getRandomUnlockedSkin('LEGENDARY');

        // Si no hay skins disponibles, mostrar monedas
        const newItems = [];


        // Agregar más opciones de monedas para tener variedad
        newItems.push({ type: 'nothing' });
        newItems.push({ type: 'nothing' });
        newItems.push({ type: 'nothing' });
        newItems.push({ type: 'nothing' });
        newItems.push({ type: 'coins', amount: 200 });
        newItems.push({ type: 'coins', amount: 400 });
        newItems.push({ type: 'coins', amount: 600 });
        newItems.push({ type: 'coins', amount: 800 });
        if (commonSkin) {
            newItems.push({ type: 'skin', skin: commonSkin });
        } else {
            newItems.push({ type: 'coins', amount: 1000 });
        }

        if (rareSkin) {
            newItems.push({ type: 'skin', skin: rareSkin });
        } else {
            newItems.push({ type: 'coins', amount: 2000 });
        }

        try {
            await updateUserCoins(user.id, user.coins - cost);
            setItems(newItems);
            setFinalResult(null);
            setCurrentIndex(0);
            setIsRunning(true);
        } catch (error) {
            console.error('Error al actualizar monedas:', error);
        }
    };

    useEffect(() => {
        let interval;
        let timeout;

        if (isRunning && items.length > 0) {
            const speed = Math.floor(Math.random() * (200 - 50) + 50);
            const duration = Math.floor(Math.random() * (8000 - 3000) + 3000);

            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % items.length);
            }, speed);

            timeout = setTimeout(async () => {
                clearInterval(interval);
                setIsRunning(false);
                const resultIndex = Math.floor(Math.random() * items.length);
                setCurrentIndex(resultIndex);
                setFinalResult(resultIndex);

                const result = items[resultIndex];
                try {
                    if (result.type === 'coins') {
                        await updateUserCoins(user.id, user.coins + result.amount);
                    } else if (result.type === 'skin') {
                        // Desbloquear la skin directamente usando la API
                        try {
                            const response = await fetch(`${BASE_URL}/api/user_skins`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/ld+json',
                                },
                                body: JSON.stringify({
                                    "user": `/api/users/${user.id}`,
                                    "skin": `/api/skins/${result.skin.id}`,
                                    "unlocked": true,
                                    "active": false
                                })
                            });

                            if (!response.ok) {
                                throw new Error('Error al desbloquear la skin');
                            }
                        } catch (error) {
                            console.error('Error al desbloquear la skin:', error);
                        }
                    }
                } catch (error) {
                    console.error('Error al procesar el resultado:', error);
                }
            }, duration);
        }

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [isRunning, items, user]);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/10 p-8 rounded-lg max-w-2xl w-full mx-4">
                {!isRunning && !finalResult && (
                    <div className="mb-4 p-4 bg-purple-800/30 rounded-lg">
                        <p className="text-center text-purple-200">
                            Solo aparecerán skins que puedas usar con tus estadísticas actuales:
                            <br />
                            <span className="font-bold">Nivel: {character?.level || 0}</span> |
                            <span className="font-bold"> Proteína: {character?.protein || 0}</span> |
                            <span className="font-bold"> Grasa: {character?.fat || 0}</span>
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-5 grid-rows-2 gap-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`aspect-square rounded-lg flex items-center justify-center p-4 text-center 
                                ${index === currentIndex ? 'bg-purple-500/50' : 'bg-white/5'}
                                ${finalResult === index ? 'bg-green-500/50' : ''}
                                transition-colors duration-200`}
                        >
                            {item.type === 'coins' ? (
                                <>
                                    <span className="text-yellow-300 mr-1">💰</span>
                                    {item.amount}
                                </>
                            ) : item.type === 'skin' && item.skin ? (
                                <>
                                    <div className="text-sm">
                                        <div>{item.skin.name}</div>
                                        <div className={
                                            item.skin.rarity.toUpperCase() === 'LEGENDARY' ? 'text-yellow-300' :
                                                item.skin.rarity.toUpperCase() === 'EPIC' ? 'text-purple-300' :
                                                    item.skin.rarity.toUpperCase() === 'RARE' ? 'text-blue-300' :
                                                        'text-gray-300'
                                        }>
                                            {item.skin.rarity.toUpperCase()}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <span className="text-gray-400">❌ Nada</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex gap-4 justify-center">
                    <button
                        onClick={spin}
                        disabled={isRunning || !user || user.coins < cost}
                        className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        {isRunning ? 'Girando...' : `Tirar (${cost} monedas)`}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={isRunning}
                        className="bg-gray-600 hover:bg-gray-700 px-8 py-3 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}