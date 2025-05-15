
import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Minigames() {
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (id) => {
        setActiveModal(id);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Minijuegos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Country Guesser */}
                <div className="bg-purple-900/70 backdrop-blur-sm p-6 rounded-lg text-center relative">
                    <button
                        onClick={() => openModal(1)}
                        className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition duration-200"
                        aria-label="Mostrar información"
                    >
                        <Info size={18} />
                    </button>

                    <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                        <img
                            src="public/images/CountryGuesser.png"
                            alt="Country Guesser"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Country Guesser</h3>
                    <p className="text-purple-200 mb-4">¡Prueba tus conocimientos sobre geografía!</p>

                    <button
                        onClick={() => navigate('/country')}
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition duration-200"
                    >
                        JUGAR
                    </button>
                </div>

                {/* Food Zoom Challenge */}
                <div className="bg-purple-900/70 backdrop-blur-sm p-6 rounded-lg text-center relative">
                    <button
                        onClick={() => openModal(2)}
                        className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition duration-200"
                        aria-label="Mostrar información"
                    >
                        <Info size={18} />
                    </button>

                    <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                        <img
                            src="public/images/FoodZoom.png"
                            alt="Food Zoom Challenge"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Food Zoom Challenge</h3>
                    <p className="text-purple-200 mb-4">¡Adivina el plato antes de que la imagen sea clara!</p>

                    <button
                        onClick={() => navigate('/foodzoom')}
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition duration-200"
                    >
                        JUGAR
                    </button>
                </div>

                {/* Objeto o Comida */}
                <div className="bg-purple-900/70 backdrop-blur-sm p-6 rounded-lg text-center relative">
                    <button
                        onClick={() => openModal(3)}
                        className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition duration-200"
                        aria-label="Mostrar información"
                    >
                        <Info size={18} />
                    </button>

                    <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                        <img
                            src="public/images/ObjetoComida.png"
                            alt="Objeto o Comida"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Objeto o Comida</h3>
                    <p className="text-purple-200 mb-4">¡Identifica rápido si es comida o no!</p>

                    <button
                        onClick={() => navigate('/foodornot')}
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition duration-200"
                    >
                        JUGAR
                    </button>
                </div>
            </div>

            {/* Información de coste de partida */}
            <div className="text-center text-gray-400 mt-8 mb-4">
                <p className="text-sm">Coste de partida: 20 🍖 / 10 💪</p>
                <p className="text-xs mt-1">Perder una partida: 10 🍖 / 50 💪 adicionales</p>
            </div>

            {/* Modal de información del juego */}
            {activeModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-purple-900/90 p-6 rounded-xl backdrop-blur-sm max-w-md w-full mx-4 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-bold mb-4 text-center">
                            {activeModal === 1 ? "Country Guesser" :
                                activeModal === 2 ? "Food Zoom Challenge" :
                                    "Objeto o Comida"}
                        </h3>

                        <div className="bg-purple-800/30 p-4 rounded-lg space-y-4">
                            {activeModal === 1 ? (
                                <>
                                    <div className="border-b border-purple-700/50 pb-3">
                                        <h4 className="font-bold text-purple-300 mb-1">🎮 Cómo jugar</h4>
                                        <p className="text-purple-100">Adivina el país correcto en 5 intentos. Cada intento te dará pistas adicionales.</p>
                                    </div>
                                    <div className="border-b border-purple-700/50 pb-3">
                                        <h4 className="font-bold text-purple-300 mb-1">💰 Recompensas</h4>
                                        <p className="text-purple-100">Ganarás hasta 100 monedas si aciertas rápido. Perderás 100 monedas si fallas todos los intentos.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-purple-300 mb-1">🍔 Nutrientes</h4>
                                        <p className="text-purple-100">Cada intento consume 20g de grasa y 10g de proteína. Perder el juego te costará 10g adicionales de grasa y 50g de proteína.</p>
                                    </div>
                                </>
                            ) : activeModal === 2 ? (
                                <>
                                    <div className="border-b border-purple-700/50 pb-3">
                                        <h4 className="font-bold text-purple-300 mb-1">🎮 Cómo jugar</h4>
                                        <p className="text-purple-100">Identifica el plato a partir de una imagen ampliada. Con cada intento fallido, la imagen se hace más clara.</p>
                                    </div>
                                    <div className="border-b border-purple-700/50 pb-3">
                                        <h4 className="font-bold text-purple-300 mb-1">💰 Recompensas</h4>
                                        <p className="text-purple-100">Ganarás hasta 100 monedas si aciertas rápido. Perderás 50 monedas si fallas todos los intentos.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-purple-300 mb-1">🍔 Nutrientes</h4>
                                        <p className="text-purple-100">Cada intento consume 20g de grasa y 10g de proteína. Perder el juego te costará 10g adicionales de grasa y 50g de proteína.</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="border-b border-purple-700/50 pb-3">
                                        <h4 className="font-bold text-purple-300 mb-1">🎮 Cómo jugar</h4>
                                        <p className="text-purple-100">Clasifica rápidamente si la palabra mostrada es comida o no. Tienes 3 vidas y 15 segundos para conseguir la mayor puntuación.</p>
                                    </div>
                                    <div className="border-b border-purple-700/50 pb-3">
                                        <h4 className="font-bold text-purple-300 mb-1">💰 Recompensas</h4>
                                        <p className="text-purple-100">Ganarás 10 monedas por cada respuesta correcta.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-purple-300 mb-1">🍔 Nutrientes</h4>
                                        <p className="text-purple-100">Jugar consume 20g de grasa y 10g de proteína. Perder el juego te costará 10g adicionales de grasa y 50g de proteína.</p>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() => {
                                    const path = activeModal === 1 ? '/country' :
                                        activeModal === 2 ? '/foodzoom' : '/foodornot';
                                    navigate(path);
                                    closeModal();
                                }}
                                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg transition duration-200"
                            >
                                JUGAR AHORA
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}