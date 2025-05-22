import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white p-4">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-lg w-full text-center relative overflow-hidden">

                <div className="relative z-10">
                    {/* Emoji grande de error */}
                    <div className="text-9xl mb-4 animate-bounce-slow">🍽️</div>

                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text">
                        ¡Ups! Plato no encontrado
                    </h1>

                    <p className="text-xl mb-6 text-purple-200">
                        Parece que esta página se la ha comido alguien antes que tú.
                    </p>


                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                    >
                        <Home size={20} />
                        Volver al menú principal
                    </Link>
                </div>
            </div>

            <p className="mt-8 text-purple-300 text-sm">
                Error 404: La página que buscas no está disponible
            </p>
        </div>
    );
};

export default ErrorPage;