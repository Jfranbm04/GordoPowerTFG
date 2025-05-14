import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodContext';
import { Info, Check, X } from 'lucide-react';
import { FoodInventoryCard } from '../components/FoodInventoryCard';

const ProfilePage = () => {
    const { user, character, loading: userLoading, updateCharacter, updateUser } = useUser();
    const { foods, userFoods, updateFoodQuantity, refreshUserFoods } = useFood();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('foods');
    const [feedingStatus, setFeedingStatus] = useState({ show: false, message: '', success: true });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedingItemId, setFeedingItemId] = useState(null);
    const [showLevelUpModal, setShowLevelUpModal] = useState(false);
    const [newLevel, setNewLevel] = useState(null);
    const [showTutorial, setShowTutorial] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [newUsername, setNewUsername] = useState('');

    useEffect(() => {
        console.log('Datos del personaje:', character);
        console.log('Datos del usuario:', user);

        // Verificar si todos los datos necesarios están cargados
        if (user && character && foods && userFoods) {
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

            const totalProtein = character.protein + (food.protein || 0);
            const totalFat = character.fat + (food.fat || 0);
            const newStrength = Math.floor(totalProtein / 20);
            const newWeight = Math.floor(totalFat / 50);

            let expGain = 10;
            switch (food.rarity.toUpperCase()) {
                case 'RARE': expGain = 20; break;
                case 'EPIC': expGain = 50; break;
                case 'LEGENDARY': expGain = 100; break;
            }

            const currentExp = character.experience || 0;
            const newExp = currentExp + expGain;
            const currentLevel = Math.floor(currentExp / 1000) + 1;
            const calculatedNewLevel = Math.floor(newExp / 1000) + 1;

            if (currentLevel < calculatedNewLevel) {
                setTimeout(() => {
                    setIsModalOpen(false);
                    setNewLevel(calculatedNewLevel);
                    setShowLevelUpModal(true);
                    setTimeout(() => setShowLevelUpModal(false), 2000);
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

            await updateCharacter(character.id, {
                protein: totalProtein,
                fat: totalFat,
                strength: newStrength,
                weight: newWeight,
                level: calculatedNewLevel,
                experience: newExp
            });

            await updateFoodQuantity(userFoodId, userFood.quantity - 1);

            setTimeout(() => setFeedingStatus({ show: false, message: '', success: true }), 4000);

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


    // Función para iniciar la edición del nombre
    const handleStartEditing = () => {
        setNewUsername(user?.username || '');
        setIsEditingName(true);
    };

    // Función para cancelar la edición
    const handleCancelEdit = () => {
        setIsEditingName(false);
    };

    // Función para guardar el nuevo nombre
    const handleSaveUsername = async () => {
        if (!newUsername.trim() || !user) {
            return;
        }

        try {
            // Usar el método del contexto para actualizar el nombre
            await updateUser(user.id, { username: newUsername });

            // Mostrar notificación de éxito
            setFeedingStatus({
                show: true,
                message: '¡Nombre actualizado correctamente!',
                success: true
            });

            // Ocultar la notificación después de 3 segundos
            setTimeout(() => {
                setFeedingStatus({ show: false, message: '', success: true });
            }, 3000);

            // Desactivar modo edición
            setIsEditingName(false);
        } catch (error) {
            console.error('Error al actualizar el nombre:', error);

            // Mostrar notificación de error
            setFeedingStatus({
                show: true,
                message: 'Error al actualizar el nombre. Inténtalo de nuevo.',
                success: false
            });

            // Ocultar la notificación después de 3 segundos
            setTimeout(() => {
                setFeedingStatus({ show: false, message: '', success: false });
            }, 3000);
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
        <div className="space-y-8 p-4 sm:p-6 relative">
            {/* Modal Tutorial */}
            {showTutorial && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto min-h-screen">
                    <div className="bg-purple-900/90 p-4 md:p-8 rounded-xl backdrop-blur-sm max-w-2xl w-[95%] mx-auto relative my-auto">
                        <button
                            onClick={() => setShowTutorial(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-center">Sistema de Progresión</h2>

                        <div className="space-y-4 md:space-y-6 max-h-[80vh] overflow-y-auto pr-2">
                            <div className="bg-purple-800/30 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">⭐ Experiencia y Niveles</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>Cada nivel requiere 1000 puntos de experiencia.</li>
                                    <li>Comida común: +10 XP</li>
                                    <li>Comida rara: +20 XP</li>
                                    <li>Comida épica: +50 XP</li>
                                    <li>Comida legendaria: +100 XP</li>
                                </ul>
                            </div>

                            <div className="bg-purple-800/30 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">💪 Sistema de Fuerza</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>La fuerza se calcula a partir de la proteína acumulada.</li>
                                    <li>Cada 20g de proteína = 1 punto de fuerza.</li>
                                    <li>La proteína se acumula permanentemente al alimentar al personaje.</li>
                                </ul>
                            </div>

                            <div className="bg-purple-800/30 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">⚖️ Sistema de Peso</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>El peso se calcula a partir de la grasa acumulada.</li>
                                    <li>Cada 50g de grasa = 1 punto de peso.</li>
                                    <li>La grasa se acumula permanentemente al alimentar al personaje.</li>
                                </ul>
                            </div>

                            <div className="bg-purple-800/30 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">🎯 Consejos</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>Usa comidas legendarias y épicas para subir de nivel más rápido.</li>
                                    <li>Equilibra la proteína y la grasa según tu estrategia.</li>
                                    <li>Colecciona comidas de mayor rareza para obtener mejores bonificaciones.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
            {/* Modal de alimentar al personaje */
                isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-purple-900/90 p-4 sm:p-6 rounded-xl backdrop-blur-sm max-w-sm w-[90%] mx-auto">
                            <div className="text-center space-y-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
                                <p className="text-purple-300">Alimentando a tu personaje...</p>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Modal de subida de nivel */
                showLevelUpModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-purple-900/90 p-4 sm:p-6 rounded-xl backdrop-blur-sm max-w-sm w-[90%] mx-auto">
                            <div className="text-center space-y-4">
                                <div className="text-5xl">🎉</div>
                                <h3 className="text-2xl font-bold text-yellow-300">¡Nivel {newLevel}!</h3>
                                <p className="text-purple-300">Tu personaje ha subido de nivel</p>
                            </div>
                        </div>
                    </div>
                )
            }
            { /* Notificación de alimentación */
                feedingStatus.show && (
                    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-40 ${feedingStatus.success ? 'bg-green-500/80' : 'bg-red-500/80'} text-white max-w-[90%] sm:max-w-md`}>
                        {feedingStatus.message}
                    </div>
                )
            }
            {/* Encabezado del perfil */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                {/* Avatar del personaje */}
                <div className="relative">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center overflow-hidden">
                        <span className="text-6xl">👨‍🍳</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-purple-900">
                        {character?.level || 1}
                    </div>
                </div>

                {/* Información del personaje */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            {isEditingName ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        className="bg-white/10 border border-purple-500 rounded px-2 py-1 text-white text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        autoFocus
                                    />
                                    <button
                                        onClick={handleSaveUsername}
                                        className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-full transition duration-200"
                                        aria-label="Guardar nombre"
                                    >
                                        <Check size={16} />
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full transition duration-200"
                                        aria-label="Cancelar edición"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-2xl sm:text-3xl font-bold">{user?.username || 'Usuario'}</h1>
                                    <button
                                        onClick={handleStartEditing}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white p-1.5 rounded-full transition duration-200"
                                        aria-label="Editar nombre"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="flex-grow"></div>
                        <button
                            onClick={() => setShowTutorial(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition duration-200 mx-auto md:mx-0"
                            aria-label="Mostrar tutorial"
                        >
                            <Info size={20} />
                        </button>
                    </div>
                    <p className="text-purple-300 mt-1">Nivel {character?.level || 1}</p>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-sm text-purple-300">Fuerza</div>
                            <div className="text-xl font-bold">{character?.strength || 0}</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-sm text-purple-300">Peso</div>
                            <div className="text-xl font-bold">{character?.weight || 0}</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-sm text-purple-300">Proteína</div>
                            <div className="text-xl font-bold">{character?.protein || 0}g</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-sm text-purple-300">Grasa</div>
                            <div className="text-xl font-bold">{character?.fat || 0}g</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra de progreso de nivel */}
            <div className="bg-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Nivel {character?.level || 1}</span>
                    <span className="text-sm">Nivel {(character?.level || 1) + 1}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                    <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full"
                        style={{
                            width: `${((character?.experience || 0) % 1000) / 10}%`
                        }}
                    ></div>
                </div>
                <div className="text-center mt-2 text-sm text-purple-300">
                    {(character?.experience || 0) % 1000} / 1000 XP
                </div>
            </div>

            {/* Pestañas */}
            <div className="bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="flex border-b border-white/10">
                    <button
                        className={`flex-1 py-3 text-center transition-colors ${activeTab === 'foods' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                        onClick={() => setActiveTab('foods')}
                    >
                        Comida
                    </button>
                    <button
                        className={`flex-1 py-3 text-center transition-colors ${activeTab === 'clothing' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                        onClick={() => setActiveTab('clothing')}
                    >
                        Ropa
                    </button>
                </div>

                {/* Contenido de la pestaña de comida */}
                {activeTab === 'foods' && (
                    <div className="p-4 sm:p-6">
                        <h2 className="text-xl font-bold mb-4">Tu inventario de comida</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {userFoods?.member?.filter(uf => uf.quantity > 0).map(userFood => {
                                const foodId = userFood.food.split('/').pop();
                                const food = foods?.member?.find(f => f.id.toString() === foodId);
                                if (!food) return null;

                                return (
                                    <FoodInventoryCard
                                        key={userFood.id}
                                        food={food}
                                        userFood={userFood}
                                        feed={handleFeed}
                                    />
                                );
                            })}
                            {(!userFoods?.member || userFoods.member.filter(uf => uf.quantity > 0).length === 0) && (
                                <div className="col-span-full text-center p-6 bg-white/5 rounded-lg">
                                    <p className="text-gray-400">No tienes comida en tu inventario</p>
                                    <p className="text-sm text-gray-500 mt-2">Visita la tienda para comprar comida</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Contenido de la pestaña de ropa */}
                {activeTab === 'clothing' && (
                    <div className="p-4 sm:p-6">
                        <h2 className="text-xl font-bold mb-4">Tu inventario de ropa</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            <div className="col-span-full text-center p-6 bg-white/5 rounded-lg">
                                <p className="text-gray-400">Próximamente...</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

export default ProfilePage;