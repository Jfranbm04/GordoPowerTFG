import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodContext';

export function CollectionPage() {
    const [activeTab, setActiveTab] = useState('foods');
    const { user } = useUser();
    const { foods = [], userFoods = [], loading } = useFood();

    useEffect(() => {
        console.log('Comidas en el array member:', foods.member);
    }, [foods]);

    if (loading) {
        return <div className="text-center">Cargando...</div>;
    }

    const foodsList = foods?.member || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Tu Colección</h1>

            <div className="mb-6">
                <div className="flex border-b border-gray-700">
                    <button
                        className={`px-4 py-2 ${activeTab === 'foods' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('foods')}
                    >
                        Comidas
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'clothing' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('clothing')}
                    >
                        Ropa
                    </button>
                </div>
            </div>

            {activeTab === 'foods' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.isArray(foodsList) && foodsList.map(food => {
                        const userFood = userFoods.find(uf => uf.food === `/api/food/${food.id}`);
                        const quantity = userFood ? userFood.quantity : 0;

                        return (
                            <div
                                key={food.id}
                                className={`p-4 rounded-lg ${quantity > 0 ? 'bg-white/10' : 'bg-white/5 opacity-50'}`}
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-4xl mb-2">{food.emoji}</span>
                                    <h3 className="font-medium text-center">{food.name}</h3>
                                    <p className="text-sm text-gray-400 text-center">{food.description}</p>
                                    {quantity > 0 && (
                                        <div className="mt-2 text-sm">
                                            <span className="text-yellow-300">Cantidad: {quantity}</span>
                                        </div>
                                    )}
                                    <div className={`mt-1 text-xs px-2 py-0.5 rounded-full ${food.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                                            food.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                                                food.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                                                    'bg-gray-500/20 text-gray-300'
                                        }`}>
                                        {food.rarity.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {(!foodsList || foodsList.length === 0) && (
                        <div className="col-span-full text-center text-gray-400">
                            No hay comidas disponibles
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'clothing' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {clothing.map(item => (
                        <div
                            key={item.id}
                            className={`p-4 rounded-lg ${getQuantity(item.id) > 0 ? 'bg-white/10' : 'bg-white/5 opacity-50'}`}
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-4xl mb-2">{item.emoji}</span>
                                <h3 className="font-medium text-center">{item.name}</h3>
                                <p className="text-sm text-gray-400 text-center">{item.description}</p>
                                {getQuantity(item.id) > 0 && (
                                    <div className="mt-2 text-sm">
                                        <span className="text-yellow-300">Cantidad: {getQuantity(item.id)}</span>
                                    </div>
                                )}
                                <div className={`mt-1 text-xs px-2 py-0.5 rounded-full ${item.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                                        item.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                                            item.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                                                'bg-gray-500/20 text-gray-300'
                                    }`}>
                                    {item.rarity.toUpperCase()}
                                </div>
                                <div className="mt-1 text-xs text-gray-400">
                                    {item.type}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CollectionPage;