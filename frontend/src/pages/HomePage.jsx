import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PanelTop, FileSpreadsheet, ClipboardList, Settings, Info } from 'lucide-react';

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
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto py-[10vh]">
                    <div className="bg-purple-900/90 p-8 rounded-xl backdrop-blur-sm max-w-2xl w-full mx-4 relative">
                        <button
                            onClick={() => setShowTutorial(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-center">¡Bienvenido a GordoPower!</h2>

                        <div className="space-y-6">
                            <div className="bg-purple-800/30 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">💪 Mejora tu Personaje</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>Alimenta a tu personaje para ganar estadísticas</li>
                                    <li>Proteína = Fuerza (1 punto cada 20g)</li>
                                    <li>Grasa = Peso (1 punto cada 50g)</li>
                                </ul>
                            </div>

                            <div className="bg-purple-800/30 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">💰 Gana Monedas</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>Juega Country Guesser y Food Zoom Challenge</li>
                                    <li>Usa las monedas en la tienda o el gacha</li>
                                </ul>
                            </div>

                            <div className="bg-purple-800/30 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">🎯 Consejos Rápidos</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-300">
                                    <li>Prioriza alimentos legendarios y épicos</li>
                                    <li>Equilibra proteínas y grasas</li>
                                    <li>Juega minijuegos a diario</li>
                                    <li>Colecciona diferentes tipos de comida</li>
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
                    className="absolute top-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition duration-200"
                >
                    <Info size={24} />
                </button>
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Gordo Power
                    </h1>
                    <p className="text-xl mb-8 text-purple-200">
                        Personaliza tu personaje, colecciona platos raros y conviértete en el maestro de la comida definitivo.
                    </p>

                    {!user ? (
                        <div className="space-y-4">
                            <p className="text-lg text-purple-300 mb-4">
                                Únete ahora para empezar tu aventura.
                            </p>
                            <div className="space-x-4">
                                <Link
                                    to="/register"
                                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
                                >
                                    Empieza tu aventura
                                </Link>
                                <Link
                                    to="/login"
                                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
                                >
                                    Continuar aventura
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* <button
                                onClick={handleLogout}
                                className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                            >
                                Cerrar Sesión
                            </button> */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                                <Link
                                    to="/profile"
                                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-white">Your Character</h3>
                                    <p className="text-purple-200">Customize and level up your character</p>
                                </Link>
                                <Link
                                    to="/shop"
                                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-white">Shop</h3>
                                    <p className="text-purple-200">Buy food and clothes for your character</p>
                                </Link>
                                <Link
                                    to="/gacha"
                                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-white">Gacha</h3>
                                    <p className="text-purple-200">Try your luck with food and clothing rolls</p>
                                </Link>
                                <Link
                                    to="/minigames"
                                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-white">Minigames</h3>
                                    <p className="text-purple-200">Play games to earn coins</p>
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