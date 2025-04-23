import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

export function CollectionPage() {
    const [activeTab, setActiveTab] = useState('foods');
    const [foods, setFoods] = useState([]);
    const [clothing, setClothing] = useState([]);
    const [inventory, setInventory] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        // Cargar comidas
        const fetchFoods = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/foods`);
                if (response.ok) {
                    const data = await response.json();
                    setFoods(data);
                }
            } catch (error) {
                console.error('Error al cargar comidas:', error);
            }
        };

        // Cargar ropa
        const fetchClothing = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/clothing`);
                if (response.ok) {
                    const data = await response.json();
                    setClothing(data);
                }
            } catch (error) {
                console.error('Error al cargar ropa:', error);
            }
        };

        // Cargar inventario del usuario
        const fetchInventory = async () => {
            if (user?.id) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/inventory/${user.id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setInventory(data);
                    }
                } catch (error) {
                    console.error('Error al cargar inventario:', error);
                }
            }
        };

        fetchFoods();
        fetchClothing();
        fetchInventory();
    }, [user]);

    const getQuantity = (id) => {
        const item = inventory.find(item => item.itemId === id);
        return item ? item.quantity : 0;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Tu Colección</h1>
            
            <div className="mb-6">
                <div className="flex border-b border-gray-700">
                    <button 
                        className={`px-4 py-2 ${activeTab === 'foods' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('foods')}
                    >
                        Comidas
                    </button>
                    <button 
                        className={`px-4 py-2 ${activeTab === 'clothing' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('clothing')}
                    >
                        Ropa
                    </button>
                </div>
            </div>

            {activeTab === 'foods' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {foods.map(food => (
                        <div
                            key={food.id}
                            className={`p-4 rounded-lg ${getQuantity(food.id) > 0 ? 'bg-white/10' : 'bg-white/5 opacity-50'}`}
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-4xl mb-2">{food.emoji}</span>
                                <h3 className="font-medium text-center">{food.name}</h3>
                                <p className="text-sm text-gray-400 text-center">{food.description}</p>
                                {getQuantity(food.id) > 0 && (
                                    <div className="mt-2 text-sm">
                                        <span className="text-yellow-300">Cantidad: {getQuantity(food.id)}</span>
                                    </div>
                                )}
                                <div className={`mt-1 text-xs px-2 py-0.5 rounded-full ${
                                    food.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                                    food.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                                    food.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                                    'bg-gray-500/20 text-gray-300'
                                }`}>
                                    {food.rarity.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'clothing' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {clothing.map(item => (
                        <div
                            key={item.id}
                            className={`p-4 rounded-lg ${getQuantity(item.id) > 0 ? 'bg-white/10' : 'bg-white/5 opacity-50'}`}
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-4xl mb-2">{item.emoji}</span>
                                <h3 className="font-medium text-center">{item.name}</h3>
                                <p className="text-sm text-gray-400 text-center">{item.description}</p>
                                {getQuantity(item.id) > 0 && (
                                    <div className="mt-2 text-sm">
                                        <span className="text-yellow-300">Cantidad: {getQuantity(item.id)}</span>
                                    </div>
                                )}
                                <div className={`mt-1 text-xs px-2 py-0.5 rounded-full ${
                                    item.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300' :
                                    item.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                                    item.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                                    'bg-gray-500/20 text-gray-300'
                                }`}>
                                    {item.rarity.toUpperCase()}
                                </div>
                                <div className="mt-1 text-xs text-gray-400">
                                    {item.type}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CollectionPage;