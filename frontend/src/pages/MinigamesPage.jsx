
import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Minigames() {
    const navigate = useNavigate();

    const minigames = [
        {
            name: 'Country Guesser',
            description: '¡Prueba tus conocimientos sobre geografía!',
            path: '/country'
        },
        {
            name: 'Food Zoom Challenge',
            description: '¡Adivina el plato antes de que la imagen sea clara!',
            path: '/foodzoom'
        },
        {
            name: 'Objeto o Comida',
            description: '¡Identifica rápido si es comida o no!',
            path: '/foodornot'
        }
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Minigames</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {minigames.map((game, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                        <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center mb-4">
                            <Gamepad2 className="w-16 h-16 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                        <p className="text-purple-200 mb-4">{game.description}</p>
                        <button
                            onClick={() => game.path && navigate(game.path)}
                            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition duration-200"
                        >
                            JUGAR
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}