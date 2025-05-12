import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Lista de palabras para el juego
const WORDS = [
    { word: 'Pizza', isFood: true },
    { word: 'Kefta', isFood: true },
    { word: 'Sushi', isFood: true },
    { word: 'Paella', isFood: true },
    { word: 'Hamburguesa', isFood: true },
    { word: 'Tacos', isFood: true },
    { word: 'Ramen', isFood: true },
    { word: 'Lasaña', isFood: true },
    { word: 'Ceviche', isFood: true },
    { word: 'Gazpacho', isFood: true },
    { word: 'Risotto', isFood: true },
    { word: 'Croissant', isFood: true },
    { word: 'Golem', isFood: false },
    { word: 'Teléfono', isFood: false },
    { word: 'Zapato', isFood: false },
    { word: 'Ordenador', isFood: false },
    { word: 'Lámpara', isFood: false },
    { word: 'Ventana', isFood: false },
    { word: 'Libro', isFood: false },
    { word: 'Reloj', isFood: false },
    { word: 'Silla', isFood: false },
    { word: 'Coche', isFood: false },
    { word: 'Pluma', isFood: false },
    { word: 'Guitarra', isFood: false }
];

export function FoodOrNot() {
    const [currentWord, setCurrentWord] = useState(null);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(2); // Cambiado de 3 a 2 segundos
    const [gameActive, setGameActive] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const { getCurrentUser } = useAuth();
    const [user, setUser] = useState(getCurrentUser());
    const [coins, setCoins] = useState(user?.coins || 0);
    const [totalTimeLeft, setTotalTimeLeft] = useState(15); // Tiempo total del juego: 30 segundos

    // Actualizar usuario y monedas
    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setCoins(currentUser?.coins || 0);
    }, [getCurrentUser]);

    // Iniciar el juego
    const startGame = () => {
        setScore(0);
        setLives(3);
        setGameOver(false);
        setGameActive(true);
        setGameWon(false);
        setTotalTimeLeft(15); // Reiniciar el tiempo total
        nextWord();
    };

    // Generar una nueva palabra aleatoria
    const nextWord = () => {
        const randomIndex = Math.floor(Math.random() * WORDS.length);
        setCurrentWord(WORDS[randomIndex]);
        setTimeLeft(2); // Reiniciar el temporizador a 2 segundos
    };

    // Manejar la respuesta del usuario
    const handleAnswer = async (isFood) => {
        if (!currentWord || !gameActive) return;

        if (isFood === currentWord.isFood) {
            // Respuesta correcta
            setScore(prev => prev + 1);
        } else {
            // Respuesta incorrecta
            setLives(prev => prev - 1);
            if (lives <= 1) {
                endGame(false);
                return;
            }
        }

        // Siguiente palabra
        nextWord();
    };

    // Temporizador para cambiar palabras
    useEffect(() => {
        let timer;
        if (gameActive && !gameOver) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        // Si se acaba el tiempo, contar como error
                        setLives(lives => {
                            const newLives = lives - 1;
                            if (newLives <= 0) {
                                endGame(false);
                                return 0;
                            }
                            return newLives;
                        });
                        nextWord();
                        return 2; // Reiniciar a 2 segundos
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameActive, gameOver, lives]);

    // Temporizador para el tiempo total del juego
    useEffect(() => {
        let totalTimer;
        if (gameActive && !gameOver) {
            totalTimer = setInterval(() => {
                setTotalTimeLeft(prev => {
                    if (prev <= 1) {
                        // Si se acaba el tiempo total, terminar el juego
                        endGame(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(totalTimer);
    }, [gameActive, gameOver]);

    // Finalizar el juego
    const endGame = async (won) => {
        setGameActive(false);
        setGameOver(true);
        setGameWon(won);

        // Calcular recompensa basada en la puntuación
        const coinsWon = score * 10;

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
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setCoins(updatedUser.coins);
            }
        } catch (error) {
            console.error('Error actualizando monedas:', error);
        }
    };


    return (
        <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">Objeto o Comida</h2>

            {/* Mostrar las monedas actuales */}
            <div className="text-center text-yellow-300 mb-4">
                <span className="mr-2">💰</span> {coins} monedas
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
                {!gameActive && !gameOver && (
                    <div className="text-center space-y-6">
                        <p className="text-lg">
                            Pulsa el botón si la palabra es una comida. ¡Tienes 2 segundos para cada palabra y 15 segundos en total!
                        </p>
                        <button
                            onClick={startGame}
                            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg transition duration-200"
                        >
                            ¡Empezar!
                        </button>
                    </div>
                )}

                {gameActive && currentWord && (
                    <div className="space-y-8">
                        {/* Temporizador general en la parte superior central */}
                        <div className="text-center">
                            <div className="text-4xl font-bold text-yellow-300">{totalTimeLeft}</div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="text-lg">
                                <span className="text-purple-300">Puntuación:</span> {score}
                            </div>
                            <div className="text-lg">
                                <span className="text-red-300">Vidas:</span> {'❤️'.repeat(lives)}
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-3xl font-bold mb-4">{currentWord.word}</div>
                            <div className="text-lg mb-2">Tiempo palabra: {timeLeft}s</div>
                            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
                                <div
                                    className="bg-purple-500 h-full transition-all duration-1000"
                                    style={{ width: `${(timeLeft / 2) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-6">
                            <button
                                onClick={() => handleAnswer(true)}
                                className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg transition duration-200"
                            >
                                ¡Es comida! ✅
                            </button>
                            <button
                                onClick={() => handleAnswer(false)}
                                className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg transition duration-200"
                            >
                                No es comida ❌
                            </button>
                        </div>
                    </div>
                )}

                {gameOver && (
                    <div className="text-center space-y-6">
                        <div className={`p-4 rounded-lg ${gameWon ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            {gameWon ? (
                                <p className="text-xl">¡Felicidades! Has alcanzado 20 puntos.</p>
                            ) : (
                                <p className="text-xl">¡Juego terminado!</p>
                            )}
                            <p className="text-lg mt-2">
                                Puntuación final: {score} - Has ganado {score * 10} monedas
                            </p>
                        </div>
                        <button
                            onClick={startGame}
                            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg transition duration-200"
                        >
                            Jugar de nuevo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FoodOrNot;