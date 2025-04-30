import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodContext';

const ProfilePage = () => {
    const { user, character, loading } = useUser();
    const { foods, userFoods } = useFood();
    const [activeTab, setActiveTab] = useState('foods');
    const [equippedItems, setEquippedItems] = useState({
        head: null,
        body: null,
        legs: null,
        feet: null
    });
    // Añade este useEffect para ver los datos en la consola
    useEffect(() => {
        console.log('Datos del personaje:', character);
        console.log('Datos del usuario:', user);
    }, [character, user]);

    if (loading) {
        return <div className="text-white text-center">Cargando perfil...</div>;
    }

    if (!user) {
        return <div className="text-white text-center">Usuario no encontrado</div>;
    }

    if (!character) {
        return <div className="text-white text-center">Personaje no encontrado</div>;
    }

    return (
        <div className="space-y-8 p-6">
            <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold text-white">Hola {user.username}.</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-2xl font-bold text-white">Your Character</h2>
                </div>
                <div className="flex gap-8">
                    <div className="w-48 h-72 bg-white/5 rounded-lg relative overflow-hidden">
                        <img
                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`}
                            alt="Character"
                            className="w-full h-full object-contain"
                        />
                        {/* Equipment overlays will go here later */}
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-white">Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-purple-300">Level</p>
                                    <p className="text-2xl font-bold text-white">{character?.level || 'N/A'}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-purple-300">Strength</p>
                                    <p className="text-2xl font-bold text-white">{character?.strength || 'N/A'}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-purple-300">Weight</p>
                                    <p className="text-2xl font-bold text-white">{character?.weight || 'N/A'}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-purple-300">Coins</p>
                                    <p className="text-2xl font-bold text-white">{user?.coins || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Mi Inventario</h3>

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeTab === 'foods' && userFoods?.member?.map((userFood) => {
                        const food = foods?.member?.find(f => `/api/food/${f.id}` === userFood.food);
                        if (!food) return null;

                        return (
                            <div key={userFood.id} className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{food.emoji}</span>
                                    <div>
                                        <h4 className="font-semibold text-white">{food.name}</h4>
                                        <p className="text-sm text-gray-400">Cantidad: x{userFood.quantity}</p>
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-yellow-300">💪 {food.protein}g</span>
                                            <span className="text-red-300">🍖 {food.fat}g</span>
                                        </div>
                                        <span className={`text-xs ${food.rarity.toUpperCase() === 'LEGENDARY' ? 'text-yellow-300' :
                                                food.rarity.toUpperCase() === 'EPIC' ? 'text-purple-300' :
                                                    food.rarity.toUpperCase() === 'RARE' ? 'text-blue-300' :
                                                        'text-gray-300'
                                            }`}>
                                            {food.rarity.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white text-sm transition-colors"
                                    onClick={() => console.log('Alimentar clicked')}
                                >
                                    Alimentar
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage