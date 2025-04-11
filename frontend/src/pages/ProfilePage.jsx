import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { getCurrentUser } = useAuth();
    const user = getCurrentUser();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                console.log('Current user:', user);
                console.log('User ID:', user?.id);
                console.log('API URL:', `${import.meta.env.VITE_BASE_URL}/api/character/user/${user?.id}`);

                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/character/user/${user?.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });

                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);

                const text = await response.text();
                console.log('Raw response:', text);

                const data = text ? JSON.parse(text) : null;
                console.log('Parsed data:', data);

                if (!response.ok) throw new Error(`Failed to fetch character: ${text}`);
                setCharacter(data);
            } catch (error) {
                console.error('Full error:', error);
                console.error('Error stack:', error.stack);
            }
        };

        if (user) {
            console.log('Starting fetch for user:', user);
            fetchCharacter();
        } else {
            console.log('No user available');
        }
    }, [user]);

    // Then use character instead of user.character in your stats display:
    // Example: {character?.level || 'N/A'}
    const [activeTab, setActiveTab] = useState('foods');
    const [equippedItems, setEquippedItems] = useState({
        head: null,
        body: null,
        legs: null,
        feet: null
    });

    if (!user) {
        return <div className="text-white text-center">Cargando perfil...</div>;
    }

    return (
        <div className="space-y-8 p-6">
            <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold text-white">Hola {user.username}.</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-2xl font-bold text-white">Your Character</h2>
                </div>
                <div className="flex gap-8">
                    <div className="w-48 h-72 bg-white/5 rounded-lg relative overflow-hidden">
                        <img
                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`}
                            alt="Character"
                            className="w-full h-full object-contain"
                        />
                        {/* Equipment overlays will go here later */}
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-white">Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-purple-300">Level</p>
                                    <p className="text-2xl font-bold text-white">{character?.level || 'N/A'}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-purple-300">Strength</p>
                                    <p className="text-2xl font-bold text-white">{character?.strength || 'N/A'}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-purple-300">Weight</p>
                                    <p className="text-2xl font-bold text-white">{character?.weight || 'N/A'}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <p className="text-purple-300">Coins</p>
                                    <p className="text-2xl font-bold text-white">{character?.coins || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-white">My Inventory</h3>

                <div className="mb-6">
                    <div className="flex border-b border-gray-700">
                        <button
                            className={`px-4 py-2 ${activeTab === 'foods' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400'}`}
                            onClick={() => setActiveTab('foods')}
                        >
                            Foods
                        </button>
                        <button
                            className={`px-4 py-2 ${activeTab === 'clothing' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-gray-400'}`}
                            onClick={() => setActiveTab('clothing')}
                        >
                            Clothing
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Inventory items will be mapped here once we have the data */}
                    <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-gray-400">No items yet</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage