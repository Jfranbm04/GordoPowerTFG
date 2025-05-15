import React from 'react';

export const FoodInventoryCard = ({ food, userFood, feed }) => { // Le paso la funcion completa por parámetro ya que desde la vista se llama también a la notificación
    const quantity = userFood ? userFood.quantity : 0;

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

    // Función para obtener clases de color según rareza
    const getRarityClasses = (rarity) => {
        switch (rarity.toUpperCase()) {
            case 'LEGENDARY':
                return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30';
            case 'EPIC':
                return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30';
            case 'RARE':
                return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30';
            default:
                return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border border-gray-500/30';
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl overflow-hidden backdrop-blur-sm relative shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
            {/* Imagen del plato */}
            <div className="relative w-full h-48 sm:h-40 md:h-48 overflow-hidden">
                {food.image ? (
                    <div className="w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent z-10" />
                        <img
                            src={`${import.meta.env.VITE_BASE_URL}/${food.image}`}
                            alt={food.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-purple-800/30 flex items-center justify-center">
                        <span className="text-6xl">{food.emoji || '🍽️'}</span>
                    </div>
                )}

                {/* Contador de cantidad */}
                <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 shadow-lg">
                    <span className="text-sm font-medium flex items-center">
                        x {quantity}
                    </span>
                </div>

                {/* Etiqueta de rareza */}
                <div className={`absolute bottom-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-medium ${getRarityClasses(food.rarity)}`}>
                    {food.rarity.toUpperCase()}
                </div>
            </div>

            {/* Información del plato */}
            <div className="p-4 sm:p-5 space-y-3 flex-grow flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-white truncate">{food.name}</h3>

                <p className="text-sm text-gray-300 line-clamp-2 flex-grow">{food.description}</p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 mt-2">
                    <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center">
                        <span className="text-purple-300 text-xs">Proteína</span>
                        <span className="font-semibold flex items-center">
                            <span className="mr-1">💪</span> {food.protein}g
                        </span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center">
                        <span className="text-purple-300 text-xs">Grasas</span>
                        <span className="font-semibold flex items-center">
                            <span className="mr-1">🍖</span> {food.fat}g
                        </span>
                    </div>
                </div>

                <div className="bg-white/5 rounded-lg p-2 flex justify-center items-center mt-1">
                    <span className="text-purple-300 text-xs mr-2">Experiencia:</span>
                    <span className="font-semibold flex items-center">
                        <span className="mr-1">⭐</span> {getXPValue(food.rarity)} XP
                    </span>
                </div>

                <button
                    onClick={() => feed(userFood.id, food)}
                    disabled={!userFood || quantity <= 0}
                    className={`w-full mt-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${userFood && quantity > 0
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-green-600/30'
                        : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    {userFood && quantity > 0 ? (
                        <span className="flex items-center justify-center">
                            <span className="mr-2">🍽️</span> Alimentar
                        </span>
                    ) : (
                        'No disponible'
                    )}
                </button>
            </div>
        </div>
    );
}

export default FoodInventoryCard;