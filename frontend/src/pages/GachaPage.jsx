import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { FoodRoulette } from '../components/FoodRoulette';
import { SkinRoulette } from '../components/SkinRoulette';

export const GachaPage = () => {
  const [activeRoulette, setActiveRoulette] = useState(null);
  const { user, character } = useUser();
  const { getCurrentUser } = useAuth();

  const handleRoulette = async (type, cost) => {
    if (!user || user.coins < cost) {
      alert('No tienes suficientes monedas');
      return;
    }
    setActiveRoulette(type);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Sistema Gacha</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">Gacha de Comida</h3>
          <div className="aspect-square max-w-sm mx-auto bg-white/5 rounded-lg flex items-center justify-center mb-4">
            <Gift className="w-24 h-24 text-purple-400" />
          </div>
          <p className="text-purple-200 mb-4">¡Prueba tu suerte para obtener comidas raras!</p>
          <button
            onClick={() => handleRoulette('food', 300)}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg transition duration-200"
          >
            Tirar (300 monedas)
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">Gacha de Skins</h3>
          <div className="aspect-square max-w-sm mx-auto bg-white/5 rounded-lg flex items-center justify-center mb-4">
            <Gift className="w-24 h-24 text-indigo-400" />
          </div>
          <p className="text-purple-200 mb-4">¡Consigue skins exclusivas!</p>
          <p className="text-purple-200 mb-4 text-sm">Solo aparecerán skins que puedas desbloquear según tus estadísticas actuales.</p>
          <button
            onClick={() => handleRoulette('skins', 1000)}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg transition duration-200"
          >
            Tirar (1000 monedas)
          </button>
        </div>
      </div>


      {activeRoulette === 'food' && (
        <FoodRoulette
          cost={300}
          onClose={() => setActiveRoulette(null)}
        />
      )}

      {activeRoulette === 'skins' && (
        <SkinRoulette
          cost={1000}
          onClose={() => setActiveRoulette(null)}
          character={character}
        />
      )}
    </div>
  );
}

export default GachaPage;