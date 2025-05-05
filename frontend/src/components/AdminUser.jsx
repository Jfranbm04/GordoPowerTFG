import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminUser = () => {
    const [showList, setShowList] = useState(true);
    const { users, loading } = useAuth();
    const usersList = users?.member || [];
    console.log("users?.member", users?.member)

    const handleBan = async (userId) => {
        // Implementar lógica de baneo
        console.log('Banear usuario:', userId);
    };

    const handleEdit = async (user) => {
        // Implementar lógica de edición
        console.log('Editar usuario:', user);
    };

    if (loading) {
        return <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
            </div>

            {/* Lista de usuarios */}
            <div className="bg-white/10 p-6 rounded-lg animate-fadeIn">
                <h3 className="text-xl font-semibold mb-4">Lista de Usuarios</h3>
                <div className="space-y-4">
                    {Array.isArray(usersList) && usersList.map((user) => (
                        <div key={user.id}
                            className="flex items-center justify-between bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                                    <span className="text-xl">👤</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">{user.email}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${user.roles.includes('ROLE_ADMIN') ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'
                                            }`}>
                                            {user.roles.includes('ROLE_ADMIN') ? 'Admin' : 'Usuario'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-400 mt-1">
                                        <span>ID: {user.id}</span>
                                        {user.character && (
                                            <>
                                                <span className="mx-2">•</span>
                                                <span>Personaje: {user.character.name}</span>
                                                <span className="mx-2">•</span>
                                                <span>Nivel: {user.character.level}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors duration-200"
                                    onClick={() => handleEdit(user)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors duration-200"
                                    onClick={() => handleBan(user.id)}
                                >
                                    Banear
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminUser;