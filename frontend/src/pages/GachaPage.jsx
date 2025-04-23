import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

export function GachaPage() {
  const [activeRoulette, setActiveRoulette] = useState(null);
  const { user } = useUser();
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
            onClick={() => handleRoulette('food', 0)}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg transition duration-200"
          >
            Tirar (0 monedas)
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">Gacha de Ropa</h3>
          <div className="aspect-square max-w-sm mx-auto bg-white/5 rounded-lg flex items-center justify-center mb-4">
            <Gift className="w-24 h-24 text-indigo-400" />
          </div>
          <p className="text-purple-200 mb-4">¡Consigue ropa exclusiva y monedas!</p>
          <button 
            onClick={() => handleRoulette('clothing', 200)}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg transition duration-200"
          >
            Tirar (200 monedas)
          </button>
        </div>
      </div>

      {activeRoulette === 'food' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/10 p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">¡Tirando Gacha de Comida!</h3>
            {/* Aquí irá la animación y lógica de la ruleta */}
            <button 
              onClick={() => setActiveRoulette(null)}
              className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {activeRoulette === 'clothing' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/10 p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">¡Tirando Gacha de Ropa!</h3>
            {/* Aquí irá la animación y lógica de la ruleta */}
            <button 
              onClick={() => setActiveRoulette(null)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GachaPage;