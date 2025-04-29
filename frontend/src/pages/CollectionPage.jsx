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
    const userFoodsList = userFoods?.member || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Conoce nuestra colección
            </h1>

            <div className="mb-8">
                <div className="flex justify-center border-b border-gray-700">
                    <button
                        className={`px-6 py-3 text-lg transition-all duration-300 ${activeTab === 'foods'
                            ? 'border-b-2 border-purple-500 text-purple-400 scale-105'
                            : 'text-gray-400 hover:text-purple-300'
                            }`}
                        onClick={() => setActiveTab('foods')}
                    >
                        🍽️ Comidas
                    </button>
                    <button
                        className={`px-6 py-3 text-lg transition-all duration-300 ${activeTab === 'clothing'
                            ? 'border-b-2 border-indigo-500 text-indigo-400 scale-105'
                            : 'text-gray-400 hover:text-indigo-300'
                            }`}
                        onClick={() => setActiveTab('clothing')}
                    >
                        👕 Ropa
                    </button>
                </div>
            </div>

            {activeTab === 'foods' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.isArray(foodsList) && foodsList.map(food => {
                        const userFood = userFoodsList.find(uf => uf.food === `/api/food/${food.id}`);
                        const quantity = userFood ? userFood.quantity : 0;

                        return (
                            <div
                                key={food.id}
                                className={`relative group p-6 rounded-xl ${quantity > 0
                                    ? 'bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105'
                                    : 'bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-sm'
                                    }`}
                            >
                                <div className="absolute top-2 right-2">
                                    {quantity > 0 ? (
                                        <div className="bg-yellow-500/20 px-2 py-0.5 rounded-full border border-yellow-500/30">
                                            <span className="text-yellow-300 text-sm font-medium">
                                                x{quantity}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-800/50 p-1 rounded-full border border-gray-700/30">
                                            <span className="text-gray-400 text-lg">
                                                🔒
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className={`flex flex-col items-center space-y-4 ${quantity === 0 ? 'opacity-60' : ''}`}>
                                    <div className={`text-6xl mb-2 ${quantity > 0 ? 'transform group-hover:scale-110 transition-transform duration-300' : ''
                                        }`}>
                                        {food.emoji}
                                    </div>
                                    <h3 className="text-xl font-bold text-center text-white">
                                        {food.name}
                                    </h3>
                                    <p className="text-sm text-gray-300 text-center italic">
                                        {food.description}
                                    </p>
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="text-sm text-gray-300 flex justify-between">
                                            <span>🌍 Origen:</span>
                                            <span className="text-purple-300">{food.origin}</span>
                                        </div>
                                        <div className="text-sm text-gray-300 flex justify-between">
                                            <span>🍽️ Tipo:</span>
                                            <span className="text-purple-300">{food.type}</span>
                                        </div>
                                        {food.protein && (
                                            <div className="text-sm text-gray-300 flex justify-between">
                                                <span>💪 Proteína:</span>
                                                <span className="text-purple-300">{food.protein}g</span>
                                            </div>
                                        )}
                                        {food.fat && (
                                            <div className="text-sm text-gray-300 flex justify-between">
                                                <span>🥑 Grasas:</span>
                                                <span className="text-purple-300">{food.fat}g</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`mt-1 text-sm px-4 py-1 rounded-full font-medium ${food.rarity === 'Legendary' ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30' :
                                        food.rarity === 'Epic' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' :
                                            food.rarity === 'Rare' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30' :
                                                'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border border-gray-500/30'
                                        }`}>
                                        {food.rarity.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {(!foodsList || foodsList.length === 0) && (
                        <div className="col-span-full text-center p-8 bg-white/5 rounded-xl">
                            <p className="text-gray-400 text-lg">No hay comidas disponibles</p>
                            <p className="text-sm text-gray-500 mt-2">¡Juega minijuegos para conseguir nuevas comidas!</p>
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