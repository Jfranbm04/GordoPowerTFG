import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FOOD_CHALLENGES = [
    {
        name: 'PIZZA',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
        hint: 'Un plato italiano redondo y plano',
        origin: 'Italia',
        type: 'Principal'
    },
    {
        name: 'SUSHI',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
        hint: 'Arroz enrollado con pescado',
        origin: 'Japón',
        type: 'Principal'
    },
    {
        name: 'HAMBURGUESA',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        hint: 'Sándwich redondo con carne',
        origin: 'Estados Unidos',
        type: 'Principal'
    },
    {
        name: 'ESPAGUETIS',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
        hint: 'Pasta larga y delgada',
        origin: 'Italia',
        type: 'Principal'
    },
    {
        name: 'TACOS',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
        hint: 'Tortilla doblada con relleno',
        origin: 'México',
        type: 'Principal'
    },
    {
        name: 'RAMEN',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
        hint: 'Sopa de fideos japonesa',
        origin: 'Japón',
        type: 'Principal'
    },
    {
        name: 'TORTITAS',
        image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93',
        hint: 'Discos planos y dulces para el desayuno',
        origin: 'Estados Unidos',
        type: 'Desayuno'
    },
    {
        name: 'HELADO',
        image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f',
        hint: 'Postre frío y cremoso',
        origin: 'Italia',
        type: 'Postre'
    },
    {
        name: 'DONUT',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b',
        hint: 'Rosquilla dulce con agujero',
        origin: 'Estados Unidos',
        type: 'Postre'
    },
    {
        name: 'SANDWICH',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af',
        hint: 'Alimento entre dos rebanadas de pan',
        origin: 'Inglaterra',
        type: 'Aperitivo'
    },
    {
        name: 'FILETE',
        image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef',
        hint: 'Corte de carne grueso',
        origin: 'Internacional',
        type: 'Principal'
    },
    {
        name: 'ENSALADA',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        hint: 'Mezcla de vegetales frescos',
        origin: 'Internacional',
        type: 'Entrante'
    }
];

export function FoodZoom() {
    const [targetFood, setTargetFood] = useState(null);
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(500);
    const [gameWon, setGameWon] = useState(false);
    const { getCurrentUser } = useAuth();
    const [user, setUser] = useState(getCurrentUser());
    const [coins, setCoins] = useState(user?.coins || 0);

    // Este useEffect se ejecutará cada vez que las monedas cambien
    useEffect(() => {
        // Actualizar el estado del usuario cuando cambien las monedas
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setCoins(currentUser?.coins || 0);
    }, [getCurrentUser]);

    useEffect(() => {
        resetGame();
        // Configurar un intervalo para actualizar las monedas cada 2 segundos
        const interval = setInterval(() => {
            const currentUser = getCurrentUser();
            setUser(currentUser);
            setCoins(currentUser?.coins || 0);
        }, 2000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);

    const handleGuess = async () => {
        if (!targetFood || gameOver || !guess) return;

        const formattedGuess = guess.toUpperCase();
        setGuess('');
        setAttempts(prev => prev + 1);
        
        // Reducimos el zoom con cada intento
        setZoomLevel(prev => Math.max(100, prev - 100));

        if (formattedGuess === targetFood.name) {
            setGameOver(true);
            setGameWon(true);
            const coinsWon = Math.max(100 - (attempts * 10), 20);

            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/merge-patch+json',
                    },
                    body: JSON.stringify({
                        coins: user.coins + coinsWon
                    })
                });

                if (response.ok) {
                    const updatedUser = await response.json();
                    // Actualizar el localStorage
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    // Actualizar el estado local
                    setUser(updatedUser);
                    setCoins(updatedUser.coins);
                }
            } catch (error) {
                console.error('Error actualizando monedas:', error);
            }
        } else if (attempts >= 4) {
            setGameOver(true);
            setGameWon(false);
            setZoomLevel(100);
            
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/merge-patch+json',
                    },
                    body: JSON.stringify({
                        coins: Math.max(0, user.coins - 50)
                    })
                });

                if (response.ok) {
                    const updatedUser = await response.json();
                    // Actualizar el localStorage
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    // Actualizar el estado local
                    setUser(updatedUser);
                    setCoins(updatedUser.coins);
                }
            } catch (error) {
                console.error('Error actualizando monedas:', error);
            }
        }
    };

    const getHints = () => {
        if (!targetFood || attempts < 1) return null;

        const hints = [];
        if (attempts >= 1) hints.push(`Origen: ${targetFood.origin}`);
        if (attempts >= 2) hints.push(`Tipo: ${targetFood.type}`);
        if (attempts >= 3) hints.push(`Pista: ${targetFood.hint}`);

        return hints;
    };

    const resetGame = () => {
        const randomFood = FOOD_CHALLENGES[Math.floor(Math.random() * FOOD_CHALLENGES.length)];
        setTargetFood(randomFood);
        setAttempts(0);
        setGameOver(false);
        setGameWon(false);
        setZoomLevel(500);
        // Actualizar el usuario para reflejar cualquier cambio en las monedas
        setUser(getCurrentUser());
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">Adivina la Comida</h2>
            
            {/* Mostrar las monedas actuales */}
            <div className="text-center text-yellow-300 mb-4">
                <span className="mr-2">💰</span> {coins} monedas
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
                {targetFood && (
                    <div className="mb-6">
                        <div className="w-full h-64 overflow-hidden rounded-lg mb-4 relative">
                            <img
                                src={targetFood.image}
                                alt="Comida para adivinar"
                                className="w-full h-full object-cover absolute inset-0"
                                style={{
                                    transform: `scale(${zoomLevel}%)`,
                                    transformOrigin: 'center center',
                                    transition: 'transform 0.5s ease-out'
                                }}
                            />
                        </div>
                    </div>
                )}

                {!gameOver && (
                    <div className="mt-4 space-y-4">
                        <input
                            type="text"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                            placeholder="Escribe el nombre de la comida..."
                            maxLength={20}
                            onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                        />
                        <button
                            onClick={handleGuess}
                            className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                        >
                            Adivinar ({5 - attempts} intentos restantes)
                        </button>
                    </div>
                )}

                {getHints() && (
                    <div className="mt-4 p-4 bg-yellow-500/20 rounded-lg space-y-2">
                        {attempts >= 1 && <p>Origen: {targetFood?.origin}</p>}
                        {attempts >= 2 && <p>Tipo: {targetFood?.type}</p>}
                        {attempts >= 3 && <p>Pista: {targetFood?.hint}</p>}
                    </div>
                )}

                {gameOver && (
                    <div className="mt-4 space-y-4">
                        <div
                            className={`p-4 rounded-lg text-center ${gameWon ? 'bg-green-500/20' : 'bg-red-500/20'
                                }`}
                        >
                            {gameWon
                                ? `¡Felicitaciones! Ganaste ${Math.max(110 - attempts * 10, 20)} monedas!` // 110 - 10 el primer intento
                                : `¡Juego terminado! La comida era ${targetFood?.name}. Perdiste 50 monedas!`}
                        </div>
                        <button
                            onClick={resetGame}
                            className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                        >
                            Jugar de nuevo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}