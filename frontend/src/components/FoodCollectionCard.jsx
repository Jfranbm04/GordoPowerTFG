import React from 'react';

export function FoodCollectionCard({ food, userFood }) {
    const quantity = userFood ? userFood.quantity : 0;
    const unlocked = userFood ? userFood.unlocked : false;

    return (
        <div
            className={`relative group p-6 rounded-xl ${unlocked
                ? 'bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-sm transition-all duration-300 transform hover:scale-105'
                : 'bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-sm'
                }`}
        >
            <div className="absolute top-2 right-2">
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
            <div className={`flex flex-col items-center space-y-4 ${!unlocked ? 'opacity-60' : ''}`}>
                {food.image ? (
                    <div className={`w-24 h-24 mb-2 overflow-hidden rounded-lg ${unlocked ? 'transform group-hover:scale-110 transition-transform duration-300' : ''}`}>
                        <img 
                            src={`${import.meta.env.VITE_BASE_URL}/${food.image}`} 
                            alt={food.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className={`text-6xl mb-2 ${unlocked ? 'transform group-hover:scale-110 transition-transform duration-300' : ''}`}>
                        {food.emoji}
                    </div>
                )}
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
                            <span>🍖 Grasas:</span>
                            <span className="text-purple-300">{food.fat}g</span>
                        </div>
                    )}
                </div>
                <div className={`mt-1 text-sm px-4 py-1 rounded-full font-medium ${food.rarity.toUpperCase() === 'LEGENDARY' ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30' :
                    food.rarity.toUpperCase() === 'EPIC' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' :
                        food.rarity.toUpperCase() === 'RARE' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30' :
                            'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border border-gray-500/30'
                    }`}>
                    {food.rarity.toUpperCase()}
                </div>
            </div>
        </div>
    );
}

export default FoodCollectionCard;