import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link, Outlet } from 'react-router-dom';
import { UtensilsCrossed, Users } from 'lucide-react';

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

            {/* Nueva barra de navegación */}
            <div className="flex justify-center space-x-6 mb-8">
                <Link
                    to="/admin/platos"
                    className="relative group px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                    <span className="relative z-10 text-white font-semibold flex items-center">
                        <UtensilsCrossed className="h-5 w-5 mr-2" />
                        Gestión de Platos
                    </span>
                    <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                    to="/admin/users"
                    className="relative group px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                    <span className="relative z-10 text-white font-semibold flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Gestión de Usuarios
                    </span>
                    <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
            </div>

            {/* Área para el Outlet donde se mostrarán los componentes */}
            <div className="bg-white/10 rounded-lg p-6">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminPage;