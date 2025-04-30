import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPage = () => {
    const { getCurrentUser } = useAuth();
    const user = getCurrentUser();

    // Controlo manualmente si el usuario está autenticado y tiene el rol de administrador
    if (!user || !user.roles || !user.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Panel de Administración
            </h1>

            <div className="bg-white/10 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Panel de Control</h2>
                <p className="text-gray-300">
                    Bienvenido al panel de administración. Aquí podrás gestionar los recursos del juego.
                </p>
            </div>
        </div>
    );
}

export default AdminPage;