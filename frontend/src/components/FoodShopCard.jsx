import React from 'react';
import { useUser } from '../context/UserContext';

export function FoodShopCard({ food, userFood, onBuy }) {
    const quantity = userFood ? userFood.quantity : 0;
    const unlocked = userFood ? userFood.unlocked : false;
    const { user } = useUser();

    return (
        <div className={`bg-purple-900/30 rounded-xl p-6 backdrop-blur-sm relative`}>
            {/* Contador de cantidad */}
            <div className="absolute top-4 right-4 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                <span className="text-purple-300 text-sm font-medium">
                    Tienes: {quantity}
                </span>
            </div>

            <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                    {food.image ? (
                        <div className="w-10 h-10 overflow-hidden rounded-lg">
                            <img 
                                src={`${import.meta.env.VITE_BASE_URL}/${food.image}`} 
                                alt={food.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <span className="text-2xl">{food.emoji}</span>
                    )}
                    <h3 className="text-xl font-semibold text-white">{food.name}</h3>
                </div>

                <p className="text-sm text-gray-300">{food.description}</p>

                <div className="flex justify-between text-sm text-gray-300">
                    <div className="flex items-center">
                        <span className="text-yellow-300 mr-1">💰</span>
                        {food.price}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                        food.rarity.toLowerCase() === 'legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                        food.rarity.toLowerCase() === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                        food.rarity.toLowerCase() === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-gray-500/20 text-gray-300'
                    }`}>
                        {food.rarity.toUpperCase()}
                    </div>
                </div>

                <div className="flex flex-col space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                        <span>💪 Proteína:</span>
                        <span>{food.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                        <span>🍖 Grasas:</span>
                        <span>{food.fat}g</span>
                    </div>
                </div>

                <button
                    onClick={() => onBuy(food.id, food.price)}
                    disabled={!user || user.coins < food.price || !unlocked}
                    className={`w-full py-2 rounded-lg text-center transition-colors ${
                        user && user.coins >= food.price && unlocked
                        ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {!unlocked
                        ? '🔒 Bloqueado'
                        : user && user.coins >= food.price
                            ? 'Comprar'
                            : 'No tienes suficientes monedas'}
                </button>
            </div>
        </div>
    );
}

export default FoodShopCard;