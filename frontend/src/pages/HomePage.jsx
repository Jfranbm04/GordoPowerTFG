import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PanelTop, FileSpreadsheet, ClipboardList, Settings } from 'lucide-react';

const HomePage = () => {
    const { getCurrentUser, logOut } = useAuth();
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-8">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Gordo Power
                </h1>
                <p className="text-xl mb-8 text-purple-200">
                    Gestión integral de instalaciones fotovoltaicas. ¡Optimiza tu energía solar!
                </p>

                {!user ? (
                    <div className="space-y-4">
                        <p className="text-lg text-purple-300 mb-4">
                            ¡Únete ahora para gestionar tus instalaciones!
                        </p>
                        <div className="space-x-4">
                            <Link
                                to="/register"
                                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
                            >
                                Registrarse
                            </Link>
                            <Link
                                to="/login"
                                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
                            >
                                Iniciar Sesión
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <button
                            onClick={handleLogout}
                            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                        >
                            Cerrar Sesión
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                            <Link
                                to="/installations"
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                            >
                                <PanelTop className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                                <h3 className="text-xl font-bold mb-2 text-white">Instalaciones</h3>
                                <p className="text-purple-200">Gestiona tus proyectos solares</p>
                            </Link>
                            <Link
                                to="/reports"
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                            >
                                <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                                <h3 className="text-xl font-bold mb-2 text-white">Informes</h3>
                                <p className="text-purple-200">Análisis y reportes detallados</p>
                            </Link>
                            <Link
                                to="/tasks"
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                            >
                                <ClipboardList className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                                <h3 className="text-xl font-bold mb-2 text-white">Tareas</h3>
                                <p className="text-purple-200">Seguimiento de actividades</p>
                            </Link>
                            <Link
                                to="/settings"
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition duration-200"
                            >
                                <Settings className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                                <h3 className="text-xl font-bold mb-2 text-white">Configuración</h3>
                                <p className="text-purple-200">Ajustes del sistema</p>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default HomePage;