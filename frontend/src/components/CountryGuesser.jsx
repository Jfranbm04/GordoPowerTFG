import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

const COUNTRIES = [
    { name: 'ESPAÑA', capital: 'Madrid', continent: 'Europa', hint: 'Conocida por la paella y el flamenco', dish: 'Tortilla de patatas' },
    { name: 'JAPÓN', capital: 'Tokio', continent: 'Asia', hint: 'La tierra del sol naciente', dish: 'Tonkatsu' },
    { name: 'ITALIA', capital: 'Roma', continent: 'Europa', hint: 'Famosa por la pizza y la pasta', dish: 'Osso buco' },
    { name: 'BRASIL', capital: 'Brasilia', continent: 'América del Sur', hint: 'El país más grande de Sudamérica', dish: 'Feijoada' },
    { name: 'FRANCIA', capital: 'París', continent: 'Europa', hint: 'Conocida por la Torre Eiffel', dish: 'Coq au vin' },
    { name: 'MÉXICO', capital: 'Ciudad de México', continent: 'América del Norte', hint: 'Conocido por los tacos y el mariachi', dish: 'Chiles en nogada' },
    { name: 'INDIA', capital: 'Nueva Delhi', continent: 'Asia', hint: 'Tierra de especias y el Taj Mahal', dish: 'Pollo a la mantequilla' },
    { name: 'CHINA', capital: 'Pekín', continent: 'Asia', hint: 'Hogar de la Gran Muralla', dish: 'Pato Pekín' },
    { name: 'EGIPTO', capital: 'El Cairo', continent: 'África', hint: 'Tierra de pirámides y faraones', dish: 'Molokhia' },
    { name: 'GRECIA', capital: 'Atenas', continent: 'Europa', hint: 'Cuna de la democracia', dish: 'Musaka' },
    { name: 'AUSTRALIA', capital: 'Canberra', continent: 'Oceanía', hint: 'Tierra de canguros', dish: 'Sándwich de Vegemite' },
    { name: 'ALEMANIA', capital: 'Berlín', continent: 'Europa', hint: 'Famosa por la cerveza y las salchichas', dish: 'Sauerbraten' },
    { name: 'RUSIA', capital: 'Moscú', continent: 'Asia', hint: 'El país más grande del mundo', dish: 'Stroganoff de res' },
    { name: 'CANADÁ', capital: 'Ottawa', continent: 'América del Norte', hint: 'Conocido por el jarabe de arce', dish: 'Poutine' },
    { name: 'ARGENTINA', capital: 'Buenos Aires', continent: 'América del Sur', hint: 'Tierra del tango', dish: 'Locro' }
];

export const CountryGuesser = () => {
    const [targetCountry, setTargetCountry] = useState(null);
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const { getCurrentUser } = useAuth();
    const { character, updateCharacter } = useUser();
    const user = getCurrentUser();

    useEffect(() => {
        const randomCountry = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
        setTargetCountry(randomCountry);
    }, []);

    const handleGuess = async () => {
        if (!targetCountry || gameOver || !guess) return;

        const formattedGuess = guess.toUpperCase();
        setAttempts(prev => [...prev, formattedGuess]);
        setGuess('');

        // Aplicar pérdida de nutrientes al jugar (20 grasas, 10 proteínas)
        if (character) {
            await updateCharacter(character.id, {
                fat: Math.max(0, character.fat - 20),
                protein: Math.max(0, character.protein - 10)
            });
        }

        if (formattedGuess === targetCountry.name) {
            setGameOver(true);
            const coinsWon = Math.max(100 - (attempts.length * 10), 20);

            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/merge-patch+json', // Necesita ese tipo de content
                    },
                    body: JSON.stringify({
                        coins: user.coins + coinsWon
                    })
                });

                if (response.ok) {
                    const updatedUser = await response.json();
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }
            } catch (error) {
                console.error('Error actualizando monedas:', error);
            }
        } else if (attempts.length >= 4) {
            setGameOver(true);

            // Aplicar pérdida adicional de nutrientes al perder (10 grasas, 50 proteínas)
            if (character) {
                await updateCharacter(character.id, {
                    fat: Math.max(0, character.fat - 10),
                    protein: Math.max(0, character.protein - 50)
                });
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/${user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/merge-patch+json',
                    },
                    body: JSON.stringify({
                        coins: Math.max(0, user.coins - 100)
                    })
                });

                if (response.ok) {
                    const updatedUser = await response.json();
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }
            } catch (error) {
                console.error('Error actualizando monedas:', error);
            }
        }
    };

    const getHints = () => {
        if (!targetCountry || attempts.length < 1) return null;

        const hints = [];
        if (attempts.length >= 1) hints.push(`Continent: ${targetCountry.continent}`);
        if (attempts.length >= 2) hints.push(`Typical Dish: ${targetCountry.dish}`);
        if (attempts.length >= 3) hints.push(`Capital: ${targetCountry.capital}`);
        if (attempts.length >= 4) hints.push(`Hint: ${targetCountry.hint}`);

        return hints;
    };

    const resetGame = () => {
        const randomCountry = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
        setTargetCountry(randomCountry);
        setAttempts([]);
        setGameOver(false);
        setShowHint(false);
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">Guess the Country</h2>

            <div className="bg-white/10 p-6 rounded-lg">
                <div className="space-y-4">
                    {attempts.map((attempt, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg text-center font-bold ${attempt === targetCountry?.name
                                ? 'bg-green-500/50'
                                : 'bg-red-500/50'
                                }`}
                        >
                            {attempt}
                        </div>
                    ))}
                </div>

                {!gameOver && (
                    <div className="mt-4 space-y-4">
                        <input
                            type="text"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                            placeholder="Escribe el nombre del país"
                            maxLength={20}
                        />
                        <button
                            onClick={handleGuess}
                            className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                        >
                            Adivinar ({5 - attempts.length} Intentos restantes)
                        </button>
                    </div>
                )}

                {getHints() && (
                    <div className="mt-4 p-4 bg-yellow-500/20 rounded-lg space-y-2">
                        {attempts.length >= 1 && <p>Continente: {targetCountry?.continent}</p>}
                        {attempts.length >= 2 && <p>Plato típico: {targetCountry?.dish}</p>}
                        {attempts.length >= 3 && <p>Capital: {targetCountry?.capital}</p>}
                        {attempts.length >= 4 && <p>Pista: {targetCountry?.hint}</p>}
                    </div>
                )}

                {gameOver && (
                    <div className="mt-4 space-y-4">
                        <div className={`p-4 rounded-lg text-center ${attempts[attempts.length - 1] === targetCountry?.name
                            ? 'bg-green-500/20'
                            : 'bg-red-500/20'
                            }`}>
                            {attempts[attempts.length - 1] === targetCountry?.name
                                ? `Felicidades! Has ganado ${Math.max(100 - (attempts.length * 10), 20)} monedas!`
                                : `Game Over! El país era ${targetCountry?.name}. Has perdido 100 monedas!`
                            }
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