import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodContext';
import { useSkin } from '../context/SkinContext';
import { FoodCollectionCard } from '../components/FoodCollectionCard';
import { SkinCollectionCard } from '../components/SkinCollectionCard';
import Loading from '../components/loading';

export const CollectionPage = () => {
    const [activeTab, setActiveTab] = useState('foods');
    const { user } = useUser();
    const { foods = [], userFoods = [], loading: foodLoading } = useFood();
    const { skins = [], userSkins = [], loading: skinLoading } = useSkin();
    const [isLoading, setIsLoading] = useState(false);

    const loading = foodLoading || skinLoading;

    if (loading) {
        return <Loading />;
    }

    const foodsList = foods?.member || [];
    const skinsList = skins?.member || [];
    const userSkinsList = userSkins || [];

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoading && <Loading />}
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Conoce nuestra colección
            </h1>

            <div className=" bg-white/10 rounded-t-xl overflow-hidden backdrop-blur-sm">
                <div className="flex border-b border-white/10">
                    <button
                        className={`flex-1 py-3 text-center transition-colors ${activeTab === 'foods' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('foods')}
                    >
                        Comidas
                    </button>
                    <button
                        className={`flex-1 py-3 text-center transition-colors ${activeTab === 'skins' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('skins')}
                    >
                        Skins
                    </button>
                </div>
            </div>

            {activeTab === 'foods' && (
                <div className="bg-white/10 rounded-b-xl p-4 sm:p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-bold mb-4">Colección de comidas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.isArray(foodsList) && foodsList.map(food => {
                            const userFood = userFoods.find(uf => uf.food === `/api/food/${food.id}`);
                            return (
                                <FoodCollectionCard
                                    key={food.id}
                                    food={food}
                                    userFood={userFood}
                                />
                            );
                        })}
                        {(!foodsList || foodsList.length === 0) && (
                            <div className="col-span-full text-center p-8 bg-white/5 rounded-xl">
                                <p className="text-gray-400 text-lg">No hay comidas disponibles</p>
                                <p className="text-sm text-gray-500 mt-2">¡Juega minijuegos para conseguir nuevas comidas!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'skins' && (
                <div className="bg-white/10 rounded-b-xl p-4 sm:p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-bold mb-4">Colección de skins</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.isArray(skinsList) && skinsList.map(skin => {
                            // Buscar si el usuario tiene esta skin
                            const userSkin = userSkinsList.find(us => {
                                const skinId = us.skin.split('/').pop();
                                return skinId === skin.id.toString();
                            });

                            return (
                                <SkinCollectionCard
                                    key={skin.id}
                                    skin={skin}
                                    userSkin={userSkin}
                                />
                            );
                        })}
                        {(!skinsList || skinsList.length === 0) && (
                            <div className="col-span-full text-center p-8 bg-white/5 rounded-xl">
                                <p className="text-gray-400 text-lg">No hay skins disponibles</p>
                                <p className="text-sm text-gray-500 mt-2">¡Juega minijuegos o usa el Gacha para conseguir nuevas skins!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CollectionPage;