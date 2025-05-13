import React from 'react';

export const FoodInventoryCard = ({ food, userFood, feed }) => {
    const quantity = userFood ? userFood.quantity : 0;
    const unlocked = userFood ? userFood.unlocked : false;

    // Función para mostrar el XP basado en la rareza
    const getXPValue = (rarity) => {
        switch (rarity.toUpperCase()) {
            case 'LEGENDARY':
                return 100;
            case 'EPIC':
                return 50;
            case 'RARE':
                return 20;
            default:
                return 10;
        }
    };

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
                <div className="absolute top-4 right-4 z-20 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                    <span className="text-yellow-300 text-sm font-medium">
                        x{quantity}
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
                    <div className="flex justify-between">
                        <span>⭐ XP:</span>
                        <span className="text-purple-300">{getXPValue(food.rarity)} XP</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-purple-500/20">
                        <button
                            onClick={() => feed(userFood.id, food)}
                            disabled={!userFood || quantity <= 0}
                            className={`w-full px-4 py-2 rounded-lg text-sm transition-colors ${userFood && quantity > 0
                                ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {userFood && quantity > 0
                                ? 'Alimentar'
                                : 'No disponible'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodInventoryCard;