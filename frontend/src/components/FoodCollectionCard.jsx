import React from 'react';

export const FoodCollectionCard = ({ food, userFood }) => {
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
        <div
            className={`relative rounded-xl overflow-hidden ${unlocked
                ? 'bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-sm'
                : 'bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-sm'
                }`}
        >
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

                {/* Indicador de cantidad/bloqueo */}
                <div className="absolute top-4 right-4 z-20">
                    {unlocked ? (
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
            </div>

            {/* Información del plato */}
            <div className={`p-6 space-y-4 ${!unlocked ? 'opacity-60' : ''}`}>
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">
                        {food.name}
                    </h3>
                    <div className={`text-sm px-4 py-1 rounded-full font-medium ${food.rarity.toUpperCase() === 'LEGENDARY' ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30' :
                        food.rarity.toUpperCase() === 'EPIC' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' :
                            food.rarity.toUpperCase() === 'RARE' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30' :
                                'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border border-gray-500/30'
                        }`}>
                        {food.rarity.toUpperCase()}
                    </div>
                </div>

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
                            <span>🍖 Grasas:</span>
                            <span className="text-purple-300">{food.fat}g</span>
                        </div>
                    )}
                    <div className="text-sm text-gray-300 flex justify-between mt-2 pt-2 border-t border-purple-500/20">
                        <span>⭐ XP:</span>
                        <span className="text-purple-300">{getXPValue(food.rarity)} XP</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodCollectionCard;