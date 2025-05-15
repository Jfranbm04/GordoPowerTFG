import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Users, Shirt } from 'lucide-react';

const AdminPage = () => {
    const { getCurrentUser } = useAuth();
    const user = getCurrentUser();
    const location = useLocation();

    // Controlo manualmente si el usuario está autenticado y tiene el rol de administrador
    if (!user || !user.roles || !user.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/" replace />;
    }

    // Determinar qué ruta está activa
    const isPlatesActive = location.pathname.includes('/admin/platos');
    const isUsersActive = location.pathname.includes('/admin/users');
    const isSkinsActive = location.pathname.includes('/admin/skins');

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text mb-8">
                Panel de Administración
            </h1>

            {/* Nueva barra de navegación */}
            <div className="flex justify-center space-x-6 mb-8">
                <Link
                    to="/admin/platos"
                    className={`relative group px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${isPlatesActive
                        ? 'bg-white text-purple-600 hover:shadow-white/30'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-purple-500/30'
                        }`}
                >
                    <span className={`relative z-10 font-semibold flex items-center ${isPlatesActive ? 'text-purple-600' : 'text-white'
                        }`}>
                        <UtensilsCrossed className="h-5 w-5 mr-2" />
                        Gestión de Platos
                    </span>
                    <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isPlatesActive ? 'bg-purple-100/20' : 'bg-white/20'
                        }`}></div>
                </Link>

                <Link
                    to="/admin/skins"
                    className={`relative group px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${isSkinsActive
                        ? 'bg-white text-purple-600 hover:shadow-white/30'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-purple-500/30'
                        }`}
                >
                    <span className={`relative z-10 font-semibold flex items-center ${isSkinsActive ? 'text-purple-600' : 'text-white'
                        }`}>
                        <Shirt className="h-5 w-5 mr-2" />
                        Gestión de Skins
                    </span>
                    <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isSkinsActive ? 'bg-purple-100/20' : 'bg-white/20'
                        }`}></div>
                </Link>

                <Link
                    to="/admin/users"
                    className={`relative group px-8 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${isUsersActive
                        ? 'bg-white text-purple-600 hover:shadow-white/30'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-purple-500/30'
                        }`}
                >
                    <span className={`relative z-10 font-semibold flex items-center ${isUsersActive ? 'text-purple-600' : 'text-white'
                        }`}>
                        <Users className="h-5 w-5 mr-2" />
                        Gestión de Usuarios
                    </span>
                    <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isUsersActive ? 'bg-purple-100/20' : 'bg-white/20'
                        }`}></div>
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