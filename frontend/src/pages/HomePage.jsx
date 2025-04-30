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
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-purple-900/90 p-8 rounded-xl backdrop-blur-sm max-w-2xl w-full mx-4 relative">
                        <button 
                            onClick={() => setShowTutorial(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-center">Tutorial de GordoPower</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">🎮 Minijuegos</h3>
                                <p className="text-gray-300">Juega a diferentes minijuegos para ganar monedas:</p>
                                <ul className="list-disc list-inside mt-2 text-gray-400">
                                    <li>Country Guesser: Adivina países y gana monedas</li>
                                    <li>Food Zoom Challenge: Identifica comidas antes de que se revelen por completo</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">🎲 Sistema Gacha</h3>
                                <p className="text-gray-300">Prueba tu suerte en el sistema gacha para obtener:</p>
                                <ul className="list-disc list-inside mt-2 text-gray-400">
                                    <li>Comidas raras y legendarias</li>
                                    <li>Ropa exclusiva para tu personaje</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">🏪 Tienda</h3>
                                <p className="text-gray-300">Compra comidas y objetos para mejorar tu personaje usando las monedas ganadas.</p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">📚 Colección</h3>
                                <p className="text-gray-300">Explora tu colección de comidas y ropa, organizadas por rareza y tipo.</p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-purple-300">👤 Perfil</h3>
                                <p className="text-gray-300">Gestiona tu personaje, visualiza tus estadísticas y equipa los objetos coleccionados.</p>
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