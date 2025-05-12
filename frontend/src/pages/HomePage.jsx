import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PanelTop, FileSpreadsheet, ClipboardList, Settings, Info, Zap, Utensils, Gamepad } from 'lucide-react'; // Añadidos Zap, Utensils, Gamepad

const HomePage = () => {
    const { getCurrentUser, logOut } = useAuth();
    const navigate = useNavigate();
    const user = getCurrentUser();
    const [showTutorial, setShowTutorial] = useState(false);

    const handleLogout = () => {
        logOut();
        navigate('/');
    };

    return (
        <div>
            {/* Modal Tutorial */}
            {showTutorial && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto py-[5vh] md:py-[10vh]">
                    <div className="bg-purple-900/90 p-6 md:p-8 rounded-xl backdrop-blur-sm max-w-2xl w-full mx-4 relative">
                        <button
                            onClick={() => setShowTutorial(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-center">¡Bienvenido a GordoPower!</h2>

                        <div className="space-y-4 md:space-y-6 max-h-[80vh] overflow-y-auto pr-2">
                            <div className="bg-purple-800/30 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">💪 Mejora tu Personaje</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>Alimenta a tu personaje para ganar estadísticas y experiencia.</li>
                                    <li>Sube de nivel para volverte más fuerte.</li>
                                    <li>Proteína = Fuerza (1 punto cada 20g)</li>
                                    <li>Grasa = Peso (1 punto cada 50g)</li>
                                </ul>
                            </div>

                            <div className="bg-purple-800/30 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">💰 Gana Monedas</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>Juega minijuegos como Country Guesser, Food Zoom Challenge y Objeto o Comida.</li>
                                    <li>Usa las monedas en la tienda para comprar alimentos o en el Gacha para probar tu suerte.</li>
                                </ul>
                            </div>

                            <div className="bg-purple-800/30 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">🍽️ Colecciona Comida</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>Descubre y colecciona una gran variedad de platos.</li>
                                    <li>Cada plato tiene diferente rareza y otorga distintas bonificaciones.</li>
                                    <li>¡Algunos platos son legendarios!</li>
                                </ul>
                            </div>

                            <div className="bg-purple-800/30 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">🎯 Consejos Rápidos</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>Prioriza alimentos legendarios y épicos para mayores ganancias de XP.</li>
                                    <li>Equilibra proteínas y grasas según la evolución que quieras para tu personaje.</li>
                                    <li>Juega minijuegos a diario para acumular monedas.</li>
                                    <li>Visita la tienda y el Gacha regularmente.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center relative">
                {/* Botón de Tutorial */}
                <button
                    onClick={() => setShowTutorial(true)}
                    className="absolute top-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition duration-200 z-10"
                    aria-label="Mostrar tutorial"
                >
                    <Info size={24} />
                </button>
                <div className="text-center">
                    {!user ? (
                        // Vista para usuarios no logueados (Landing Page Moderna)
                        <div className="pt-8 pb-16 px-4">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
                                Gordo Power
                            </h1>
                            <p className="text-xl md:text-2xl mb-10 text-purple-200 max-w-3xl mx-auto">
                                ¡Embárcate en una aventura culinaria épica! Personaliza tu avatar, colecciona platos exóticos y domina divertidos minijuegos para convertirte en la leyenda gastronómica definitiva.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-left transform hover:scale-105 transition-transform duration-300">
                                    <Utensils className="w-12 h-12 text-pink-400 mb-3" />
                                    <h3 className="text-xl font-semibold mb-2 text-white">Colecciona Platos</h3>
                                    <p className="text-purple-300 text-sm">Descubre y reúne una vasta colección de comidas, desde comunes hasta legendarias.</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-left transform hover:scale-105 transition-transform duration-300">
                                    <Zap className="w-12 h-12 text-yellow-400 mb-3" />
                                    <h3 className="text-xl font-semibold mb-2 text-white">Personaliza tu Avatar</h3>
                                    <p className="text-purple-300 text-sm">Alimenta y entrena a tu personaje para aumentar su fuerza, peso y nivel.</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-left transform hover:scale-105 transition-transform duration-300">
                                    <Gamepad className="w-12 h-12 text-green-400 mb-3" />
                                    <h3 className="text-xl font-semibold mb-2 text-white">Juega Minijuegos</h3>
                                    <p className="text-purple-300 text-sm">Diviértete y gana monedas con nuestros adictivos minijuegos de temática culinaria.</p>
                                </div>
                            </div>

                            <div className="space-y-4 md:space-y-0 md:space-x-6">
                                <Link
                                    to="/register"
                                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-10 rounded-lg transition duration-300 transform hover:shadow-xl text-lg"
                                >
                                    Empieza tu Aventura
                                </Link>
                                <Link
                                    to="/login"
                                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-lg transition duration-300 transform hover:shadow-xl text-lg"
                                >
                                    Continuar Aventura
                                </Link>
                            </div>
                        </div>
                    ) : (
                        // Vista para usuarios logueados (Dashboard)
                        <>
                            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                                Gordo Power
                            </h1>
                            <p className="text-xl mb-8 text-purple-200">
                                ¡Bienvenido de nuevo, {user.username}! Continúa tu aventura.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                                <Link
                                    to="/profile"
                                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-white">Tu personaje</h3>
                                    <p className="text-purple-200">Personaliza, mejora y sube el nivel de tu personaje</p>
                                </Link>
                                <Link
                                    to="/shop"
                                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-white">Tienda</h3>
                                    <p className="text-purple-200">Compra comida y ropa para tu personaje</p>
                                </Link>
                                <Link
                                    to="/gacha"
                                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-white">Gacha</h3>
                                    <p className="text-purple-200">Prueba tu suerte con ruletas de comida y ropa</p>
                                </Link>
                                <Link
                                    to="/minigames"
                                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-white">Minijuegos</h3>
                                    <p className="text-purple-200">Juega para ganar monedas</p>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;