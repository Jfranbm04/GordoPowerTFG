import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodContext';

const ProfilePage = () => {
    const { user, character, loading: userLoading, updateCharacter } = useUser();
    const { foods, userFoods, updateFoodQuantity, refreshUserFoods } = useFood();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('foods');
    const [feedingStatus, setFeedingStatus] = useState({ show: false, message: '', success: true });
    const [isFeeding, setIsFeeding] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedingItemId, setFeedingItemId] = useState(null);
    const [showLevelUpModal, setShowLevelUpModal] = useState(false);
    const [newLevel, setNewLevel] = useState(null);

    const { equippedItems, setEquippedItems } = useState({
        head: null,
        body: null,
        legs: null,
        feet: null
    });

    useEffect(() => {
        console.log('Datos del personaje:', character);
        console.log('Datos del usuario:', user);
        
        // Verificar si todos los datos necesarios están cargados
        if (user && character && foods && userFoods) {
            // Añadir un pequeño retraso para asegurar que todo esté listo
            const timer = setTimeout(() => {
                setIsPageLoading(false);
            }, 1000);
            
            return () => clearTimeout(timer);
        }
    }, [character, user, foods, userFoods]);

    // Función para alimentar al personaje
    const handleFeed = async (userFoodId, food) => {
        if (!character || !user) return;

        setFeedingItemId(userFoodId);
        setIsModalOpen(true);

        try {
            const userFood = userFoods?.member?.find(uf => uf.id === userFoodId);
            if (!userFood || userFood.quantity < 1) {
                setFeedingStatus({
                    show: true,
                    message: 'No tienes suficiente cantidad de este alimento',
                    success: false
                });
                setFeedingItemId(null);
                setIsModalOpen(false);
                return;
            }

            // Calcular nuevas estadísticas base
            const totalProtein = character.protein + (food.protein || 0);
            const totalFat = character.fat + (food.fat || 0);

            // Calcular fuerza y peso basados en los totales acumulados
            const newStrength = Math.floor(totalProtein / 20);
            const newWeight = Math.floor(totalFat / 50);

            // Calcular experiencia basada en la rareza
            let expGain = 10; // XP base para comidas comunes
            switch (food.rarity.toUpperCase()) {
                case 'RARE':
                    expGain = 20;
                    break;
                case 'EPIC':
                    expGain = 50;
                    break;
                case 'LEGENDARY':
                    expGain = 100;
                    break;
            }

            // Calcular nueva experiencia y nivel
            const currentExp = character.experience || 0;
            const newExp = currentExp + expGain;
            const currentLevel = Math.floor(currentExp / 1000) + 1;
            const calculatedNewLevel = Math.floor(newExp / 1000) + 1;

            // Verificar si subió de nivel
            if (currentLevel < calculatedNewLevel) {
                setTimeout(() => {
                    setIsModalOpen(false);
                    setNewLevel(calculatedNewLevel);
                    setShowLevelUpModal(true);
                    setTimeout(() => {
                        setShowLevelUpModal(false);
                    }, 2000);
                }, 1000);
            } else {
                setTimeout(() => {
                    setIsModalOpen(false);
                    setFeedingStatus({
                        show: true,
                        message: `¡Has alimentado a tu personaje con ${food.name}! (+${expGain} XP)`,
                        success: true
                    });
                }, 1000);
            }

            // Actualizar personaje con todas las estadísticas
            await updateCharacter(character.id, {
                protein: totalProtein,
                fat: totalFat,
                strength: newStrength,
                weight: newWeight,
                level: calculatedNewLevel,
                experience: newExp
            });

            // Reducir la cantidad del alimento
            await updateFoodQuantity(userFoodId, userFood.quantity - 1);

            setTimeout(() => {
                setFeedingStatus({ show: false, message: '', success: true });
            }, 4000);

        } catch (error) {
            console.error('Error al alimentar:', error);
            setFeedingStatus({
                show: true,
                message: 'Error al alimentar al personaje',
                success: false
            });
            setIsModalOpen(false);
        } finally {
            setFeedingItemId(null);
        }
    };

    // Si está cargando, mostrar pantalla de carga
    if (userLoading || isPageLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
                    <p className="text-purple-300">Cargando perfil...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 relative">
            {/* Modal de carga */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center">
                        <svg className="animate-spin h-10 w-10 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-white text-lg">Alimentando...</p>
                    </div>
                </div>
            )}

            {/* Modal de Subida de Nivel Simplificado */}
            {showLevelUpModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
                    <div className="bg-purple-900 p-6 rounded-lg shadow-xl text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            ¡Felicidades!
                        </h2>
                        <p className="text-white">
                            Has alcanzado el nivel {newLevel}
                        </p>
                    </div>
                </div>
            )}

            {/* Resto del contenido */}
            {feedingStatus.show && (
                <div className={`fixed bottom-4 right-4 p-4 rounded-lg ${feedingStatus.success ? 'bg-green-500/80' : 'bg-red-500/80'} text-white shadow-lg transition-all duration-300 ease-in-out`}>
                    {feedingStatus.message}
                </div>
            )}

            {/* Resto del contenido de la página */}
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
                                <div className="bg-white/5 p-4 rounded-lg col-span-2 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-white">{character?.level || 1}</span>
                                        </div>
                                        <div className="flex-1 min-w-[200px]">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-purple-300">Nivel {character?.level || 1}</span>
                                                <span className="text-sm text-purple-300">
                                                    {character?.experience}/{character?.level * 1000} XP
                                                </span>
                                            </div>
                                            <div className="w-full bg-purple-900/30 rounded-full h-2">
                                                <div
                                                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${((character?.experience || 0) % 1000) / 1000 * 100}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                                    <p className="text-purple-300">Protein</p>
                                    <p className="text-2xl font-bold text-white">{character?.protein || 'N/A'}</p>
                                </div>
                                <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                                    <p className="text-purple-300">Fat</p>
                                    <p className="text-2xl font-bold text-white">{character?.fat || 'N/A'}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-purple-300">Strength</p>
                                    <p className="text-2xl font-bold text-white">{character?.strength || 'N/A'}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-purple-300">Weight</p>
                                    <p className="text-2xl font-bold text-white">{character?.weight || 'N/A'}</p>
                                </div>
                                <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
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
                    {activeTab === 'foods' && userFoods?.member?.filter(uf => uf.quantity > 0).map((userFood) => {
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
                                    className={`px-4 py-2 rounded-lg text-white text-sm transition-colors ${userFood.quantity > 0
                                        ? 'bg-purple-600 hover:bg-purple-700'
                                        : 'bg-gray-600 cursor-not-allowed'
                                        }`}
                                    onClick={() => userFood.quantity > 0 && handleFeed(userFood.id, food)}
                                    disabled={userFood.quantity <= 0 || feedingItemId !== null}
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