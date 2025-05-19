import React from 'react';

export const SkinInventoryCard = ({ skin, userSkin, equipSkin }) => {
    const unlocked = userSkin ? userSkin.unlocked : false;

    // Función para obtener clases de color según rareza
    const getRarityClasses = (rarity) => {
        switch (rarity?.toUpperCase()) {
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
        <div className={`bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-xl overflow-hidden backdrop-blur-sm relative shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col ${!unlocked ? 'opacity-60' : ''}`}>
            {/* Imagen del skin */}
            <div className="relative w-full h-48 sm:h-40 md:h-48 overflow-hidden">
                {skin.image ? (
                    <div className="w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent z-10" />
                        <img
                            src={`${import.meta.env.VITE_BASE_URL}/${skin.image}`}
                            alt={skin.name}
                            className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-indigo-800/30 flex items-center justify-center">
                        <span className="text-6xl">👕</span>
                    </div>
                )}

                {/* Etiqueta de rareza */}
                <div className={`absolute bottom-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-medium ${getRarityClasses(skin.rarity)}`}>
                    {skin.rarity?.toUpperCase()}
                </div>
            </div>

            {/* Información del skin */}
            <div className="p-4 sm:p-5 space-y-3 flex-grow flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-white truncate">{skin.name}</h3>
                <p className="text-sm text-gray-300 line-clamp-2 flex-grow">{skin.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 mt-2">
                    <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center">
                        <span className="text-indigo-300 text-xs">Nivel Req.</span>
                        <span className="font-semibold flex items-center">
                            <span className="mr-1">🏅</span> {skin.levelcondition}
                        </span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center">
                        <span className="text-indigo-300 text-xs">Proteína Req.</span>
                        <span className="font-semibold flex items-center">
                            <span className="mr-1">💪</span> {skin.proteincondition}
                        </span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center">
                        <span className="text-indigo-300 text-xs">Grasa Req.</span>
                        <span className="font-semibold flex items-center">
                            <span className="mr-1">🍖</span> {skin.fatcondition}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => equipSkin(userSkin.id)}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-200 ${userSkin.active
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-indigo-600/30'
                        }`}
                    disabled={userSkin.active}
                >
                    {userSkin.active ? 'Equipado' : 'Equipar'}
                </button>
            </div>
        </div>
    );
}

export default SkinInventoryCard;