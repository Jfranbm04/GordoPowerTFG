import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const { getCurrentUser } = useAuth();
    const user = getCurrentUser();

    // Controlo manualmente si el usuario está autenticado y tiene el rol de administrador
    if (!user || !user.roles || !user.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text mb-8">
                Panel de Administración
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna Izquierda: Gestión de Alimentos */}
                <div className="bg-white/10 rounded-lg p-6 h-full">
                    <h2 className="text-xl font-semibold mb-6">Gestión de Platos</h2>
                    <div className="space-y-4">
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded">
                            Crear Nuevo Platos
                        </button>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded">
                            Ver Lista de Platos
                        </button>
                    </div>
                </div>

                {/* Columna Derecha: Moderación de Usuarios */}
                <div className="bg-white/10 rounded-lg p-6 h-full">
                    <h2 className="text-xl font-semibold mb-6">Moderación de Usuarios y Personajes</h2>
                    <div className="space-y-4">
                        <p className="text-gray-300">
                            Gestiona los usuarios registrados y sus personajes asociados.
                        </p>
                        <Link
                            to="/admin/users"
                            className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded text-center"
                        >
                            Acceder a Moderación
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;