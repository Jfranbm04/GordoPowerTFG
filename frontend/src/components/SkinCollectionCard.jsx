import React from 'react';

export const SkinCollectionCard = ({ skin, userSkin }) => {
    const quantity = userSkin ? userSkin.quantity : 0;
    const unlocked = userSkin ? userSkin.unlocked : false;

    return (
        <div
            className={`relative rounded-xl overflow-hidden ${unlocked
                ? 'bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-sm'
                : 'bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-sm'
                }`}
        >
            {/* Imagen de la skin */}
            <div className="relative w-full h-48">
                {skin.image ? (
                    <div className="w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent z-10" />
                        <img
                            src={`${import.meta.env.VITE_BASE_URL}/${skin.image}`}
                            alt={skin.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-purple-800/30 flex items-center justify-center">
                        <span className="text-6xl">👕</span>
                    </div>
                )}

                {/* Indicador de cantidad/bloqueo */}
                <div className="absolute top-4 right-4 z-20">
                    {!unlocked ? (
                        <div className="bg-gray-800/50 p-1 rounded-full border border-gray-700/30">
                            <span className="text-gray-400 text-lg">
                                🔒
                            </span>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            {/* Información de la skin */}
            <div className={`p-6 space-y-4 ${!unlocked ? 'opacity-60' : ''}`}>
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">
                        {skin.name}
                    </h3>
                    <div className={`text-sm px-4 py-1 rounded-full font-medium ${skin.rarity.toUpperCase() === 'LEGENDARY' ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30' :
                        skin.rarity.toUpperCase() === 'EPIC' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' :
                            skin.rarity.toUpperCase() === 'RARE' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30' :
                                'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border border-gray-500/30'
                        }`}>
                        {skin.rarity.toUpperCase()}
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <div className="text-sm text-gray-300 flex justify-between">
                        <span>⭐ Nivel requerido:</span>
                        <span className="text-purple-300">{skin.levelcondition}</span>
                    </div>

                    <div className="text-sm text-gray-300 flex justify-between">
                        <span>💪 Proteína requerida:</span>
                        <span className="text-purple-300">{skin.proteincondition}g</span>
                    </div>

                    <div className="text-sm text-gray-300 flex justify-between">
                        <span>🍖 Grasa requerida:</span>
                        <span className="text-purple-300">{skin.fatcondition}g</span>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SkinCollectionCard;