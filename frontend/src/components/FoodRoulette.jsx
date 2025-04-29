import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';

export function FoodRoulette({ cost, onClose }) {
    const [isRunning, setIsRunning] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [finalResult, setFinalResult] = useState(null);
    const [items, setItems] = useState([]);
    const { user, updateUserCoins } = useUser();
    const { getCurrentUser } = useAuth();
    const { foods, unlockFood, userFoods, updateFoodQuantity } = useFood();

    const getRandomFood = (excludeLegendary = false) => {
        const foodsList = foods?.member || [];
        const filtered = foodsList.filter(f =>
            excludeLegendary ? f.rarity !== 'legendary' : f.rarity === 'legendary'
        );
        return filtered[Math.floor(Math.random() * filtered.length)];
    };

    const spin = async () => {
        if (!user || user.coins < cost || isRunning) return;

        const newItems = [
            // { type: 'nothing' },
            // { type: 'nothing' },
            // { type: 'nothing' },
            // { type: 'nothing' },
            // { type: 'coins', amount: 200 },
            // { type: 'coins', amount: 300 },
            // { type: 'coins', amount: 400 },
            // { type: 'coins', amount: 500 },
            { type: 'food', food: getRandomFood(true) },
            // { type: 'food', food: getRandomFood(false) }
        ];

        try {
            // Restar monedas usando el nuevo método
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
                console.log(result)
                try {
                    if (result.type === 'coins') {
                        await updateUserCoins(user.id, user.coins + result.amount);
                    } else if (result.type === 'food') {
                        console.log("UserFoods: ", userFoods)

                        // Verificar si el usuario ya tiene esta comida
                        const existingUserFood = userFoods?.member?.find(uf => {
                            // Extraer el ID de la URL de la comida del usuario
                            const foodId = uf.food.split('/').pop();
                            return foodId === result.food.id.toString();
                        });
                        console.log(existingUserFood)
                        if (existingUserFood) {
                            // Si ya existe, actualizar la cantidad
                            console.log("actualizar cantidad", existingUserFood)
                            await updateFoodQuantity(existingUserFood.id, existingUserFood.quantity + 1);
                        } else {
                            // Si no existe, desbloquear nueva comida
                            console.log("desbloquear comida", result.food.id)
                            await unlockFood(result.food.id);
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
                            ) : item.type === 'food' && item.food ? (
                                <>
                                    <span className="text-2xl mr-1">{item.food.emoji}</span>
                                    <div className="text-sm">
                                        <div>{item.food.name}</div>
                                        <div className={
                                            item.food.rarity === 'legendary' ? 'text-yellow-300' :
                                                item.food.rarity === 'epic' ? 'text-purple-300' :
                                                    item.food.rarity === 'rare' ? 'text-blue-300' :
                                                        'text-gray-300'
                                        }>
                                            {item.food.rarity.toUpperCase()}
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