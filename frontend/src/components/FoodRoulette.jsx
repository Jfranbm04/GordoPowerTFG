import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const FOOD_ITEMS = [
    { name: 'PIZZA', emoji: '🍕', rarity: 'legendary' },
    { name: 'SUSHI', emoji: '🍣', rarity: 'epic' },
    { name: 'HAMBURGUESA', emoji: '🍔', rarity: 'rare' },
    { name: 'ESPAGUETIS', emoji: '🍝', rarity: 'common' },
    { name: 'TACOS', emoji: '🌮', rarity: 'epic' },
    { name: 'RAMEN', emoji: '🍜', rarity: 'rare' },
    // Puedes añadir más comidas aquí
];

export function FoodRoulette({ cost, onClose }) {
    const [isRunning, setIsRunning] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [finalResult, setFinalResult] = useState(null);
    const [items, setItems] = useState([]);
    const { user } = useUser();
    const { getCurrentUser } = useAuth();

    const getRandomFood = (excludeLegendary = false) => {
        const filtered = FOOD_ITEMS.filter(f =>
            excludeLegendary ? f.rarity !== 'legendary' : f.rarity === 'legendary'
        );
        return filtered[Math.floor(Math.random() * filtered.length)];
    };

    const spin = async () => {
        if (!user || user.coins < cost || isRunning) return;

        const newItems = [
            { type: 'nothing' },
            { type: 'nothing' },
            { type: 'nothing' },
            { type: 'nothing' },
            { type: 'coins', amount: 200 },
            { type: 'coins', amount: 300 },
            { type: 'coins', amount: 400 },
            { type: 'coins', amount: 500 },
            { type: 'food', food: getRandomFood(true) },
            { type: 'food', food: getRandomFood(false) }
        ];

        try {
            // Restar monedas
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify({
                    coins: user.coins - cost
                })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setItems(newItems);
                setFinalResult(null);
                setCurrentIndex(0);
                setIsRunning(true);
            }
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
                        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/${user.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/merge-patch+json',
                            },
                            body: JSON.stringify({
                                coins: user.coins + result.amount
                            })
                        });

                        if (response.ok) {
                            const updatedUser = await response.json();
                            localStorage.setItem('user', JSON.stringify(updatedUser));
                        }
                    } else if (result.type === 'food') {
                        // Aquí implementarías la lógica para guardar la comida en el inventario
                        console.log('Comida ganada:', result.food);
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