import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

export const FoodShopCard = ({ food, userFood, onBuy, quantity }) => {
    const unlocked = userFood ? userFood.unlocked : false;
    const { user } = useUser();
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);

    const handleIncrement = () => {
        setPurchaseQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setPurchaseQuantity(prev => Math.max(1, prev - 1));
    };

    const totalPrice = food.price * purchaseQuantity;

    quantity = userFood ? userFood.quantity : 0;

    return (
        <div className="bg-purple-900/30 rounded-xl overflow-hidden backdrop-blur-sm relative">
            {/* Imagen del plato */}
            <div className="relative w-full h-48">
                {food.image ? (
                    <div className="w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent z-10" />
                        <img
                            src={`${import.meta.env.VITE_BASE_URL}/${food.image}`}
                            alt={food.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-purple-800/30 flex items-center justify-center">
                        <span className="text-6xl">{food.emoji || '🍽️'}</span>
                    </div>
                )}

                {/* Contador de cantidad */}
                <div className="absolute top-4 right-4 z-20 bg-gray-800/20 px-3 py-1 rounded-full border border-gray-500/30">
                    <span className=" text-sm font-medium">
                        Tienes: {quantity}
                    </span>
                </div>
            </div>

            {/* Información del plato */}
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{food.name}</h3>
                    <div className={`px-3 py-1 rounded-full text-xs ${food.rarity.toLowerCase() === 'legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                        food.rarity.toLowerCase() === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                            food.rarity.toLowerCase() === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                                'bg-gray-500/20 text-gray-300'
                        }`}>
                        {food.rarity.toUpperCase()}
                    </div>
                </div>

                <p className="text-sm text-gray-300">{food.description}</p>

                <div className="flex flex-col space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                        <span>💪 Proteína:</span>
                        <span>{food.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                        <span>🍖 Grasas:</span>
                        <span>{food.fat}g</span>
                    </div>
                    <div className="flex flex-col space-y-4 pt-2 border-t border-purple-500/20">
                        {/* Contenedor para precio y controles de cantidad */}
                        <div className="flex items-center justify-between bg-purple-800/30 p-3 rounded-lg">
                            {/* Precio */}
                            <div className="flex items-center">
                                <span className="text-yellow-300 text-xl mr-2">💰</span>
                                <span className="text-yellow-300 text-xl font-medium">{totalPrice}</span>
                            </div>

                            {/* Controles de cantidad */}
                            {unlocked && user && (
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={handleDecrement}
                                        className="bg-purple-700 hover:bg-purple-800 w-8 h-8 rounded-full flex items-center justify-center text-white text-lg font-bold transition-colors"
                                    > - </button>
                                    <span className="text-white font-medium text-lg w-8 text-center">{purchaseQuantity}</span>
                                    <button
                                        onClick={handleIncrement}
                                        className="bg-purple-700 hover:bg-purple-800 w-8 h-8 rounded-full flex items-center justify-center text-white text-lg font-bold transition-colors"
                                    > + </button>
                                </div>
                            )}
                        </div>

                        {/* Botón de compra */}
                        <button
                            onClick={() => onBuy(food.id, totalPrice, purchaseQuantity)}
                            disabled={!user || user.coins < totalPrice || !unlocked}
                            className={`w-full py-3 rounded-lg text-sm font-medium transition-all transform hover:scale-105 ${user && user.coins >= totalPrice && unlocked
                                ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-lg hover:shadow-purple-500/50'
                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {!unlocked
                                ? '🔒 Bloqueado'
                                : user && user.coins >= totalPrice
                                    ? 'Comprar'
                                    : '❌ No tienes suficientes monedas'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodShopCard;