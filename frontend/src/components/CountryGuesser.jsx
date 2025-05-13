import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const COUNTRIES = [
    { name: 'SPAIN', capital: 'Madrid', continent: 'Europe', hint: 'Known for paella and flamenco', dish: 'Tortilla de patatas' },
    { name: 'JAPAN', capital: 'Tokyo', continent: 'Asia', hint: 'Land of the rising sun', dish: 'Tonkatsu' },
    { name: 'ITALY', capital: 'Rome', continent: 'Europe', hint: 'Famous for pizza and pasta', dish: 'Osso buco' },
    { name: 'BRAZIL', capital: 'Brasilia', continent: 'South America', hint: 'Largest country in South America', dish: 'Feijoada' },
    { name: 'FRANCE', capital: 'Paris', continent: 'Europe', hint: 'Known for the Eiffel Tower', dish: 'Coq au vin' },
    { name: 'MEXICO', capital: 'Mexico City', continent: 'North America', hint: 'Known for tacos and mariachi', dish: 'Chiles en nogada' },
    { name: 'INDIA', capital: 'New Delhi', continent: 'Asia', hint: 'Land of spices and Taj Mahal', dish: 'Butter chicken' },
    { name: 'CHINA', capital: 'Beijing', continent: 'Asia', hint: 'Home of the Great Wall', dish: 'Peking duck' },
    { name: 'EGYPT', capital: 'Cairo', continent: 'Africa', hint: 'Land of pyramids and pharaohs', dish: 'Molokhia' },
    { name: 'GREECE', capital: 'Athens', continent: 'Europe', hint: 'Birthplace of democracy', dish: 'Moussaka' },
    { name: 'AUSTRALIA', capital: 'Canberra', continent: 'Oceania', hint: 'Land of kangaroos', dish: 'Vegemite sandwich' },
    { name: 'GERMANY', capital: 'Berlin', continent: 'Europe', hint: 'Famous for beer and sausages', dish: 'Sauerbraten' },
    { name: 'RUSSIA', capital: 'Moscow', continent: 'Asia', hint: 'Largest country in the world', dish: 'Beef Stroganoff' },
    { name: 'CANADA', capital: 'Ottawa', continent: 'North America', hint: 'Known for maple syrup', dish: 'Poutine' },
    { name: 'ARGENTINA', capital: 'Buenos Aires', continent: 'South America', hint: 'Land of tango', dish: 'Locro' }
];

export const CountryGuesser = () => {
    const [targetCountry, setTargetCountry] = useState(null);
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const { getCurrentUser } = useAuth();
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
                            placeholder="Enter country name..."
                            maxLength={20}
                        />
                        <button
                            onClick={handleGuess}
                            className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                        >
                            Guess ({5 - attempts.length} attempts left)
                        </button>
                    </div>
                )}

                {getHints() && (
                    <div className="mt-4 p-4 bg-yellow-500/20 rounded-lg space-y-2">
                        {attempts.length >= 1 && <p>Continent: {targetCountry?.continent}</p>}
                        {attempts.length >= 2 && <p>Typical Dish: {targetCountry?.dish}</p>}
                        {attempts.length >= 3 && <p>Capital: {targetCountry?.capital}</p>}
                        {attempts.length >= 4 && <p>Hint: {targetCountry?.hint}</p>}
                    </div>
                )}

                {gameOver && (
                    <div className="mt-4 space-y-4">
                        <div className={`p-4 rounded-lg text-center ${attempts[attempts.length - 1] === targetCountry?.name
                            ? 'bg-green-500/20'
                            : 'bg-red-500/20'
                            }`}>
                            {attempts[attempts.length - 1] === targetCountry?.name
                                ? `Congratulations! You won ${Math.max(100 - (attempts.length * 10), 20)} coins!`
                                : `Game Over! The country was ${targetCountry?.name}. You lost 100 coins!`
                            }
                        </div>
                        <button
                            onClick={resetGame}
                            className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}