import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, User, ShoppingBag, Gift, Gamepad2, Book, Settings } from 'lucide-react';

const RootLayout = () => {
    const { getCurrentUser, logOut } = useAuth();
    const [user, setUser] = useState(getCurrentUser());

    useEffect(() => {
        // Actualizar el usuario cada 2 segundos
        const interval = setInterval(() => {
            const currentUser = getCurrentUser();
            setUser(currentUser);
        }, 2000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [getCurrentUser]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
            <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
                                <Home className="w-6 h-6" />
                                <span>Gordo Power</span>
                            </Link>

                            {user && (
                                <div className="flex items-center space-x-4">
                                    <Link to="/profile" className="flex items-center space-x-1 hover:text-purple-300">
                                        <User className="w-5 h-5" />
                                        <span>Perfil</span>
                                    </Link>
                                    <Link to="/shop" className="flex items-center space-x-1 hover:text-purple-300">
                                        <ShoppingBag className="w-5 h-5" />
                                        <span>Tienda</span>
                                    </Link>
                                    <Link to="/collection" className="flex items-center space-x-1 hover:text-purple-300">
                                        <Book className="w-5 h-5" />
                                        <span>Colección</span>
                                    </Link>
                                    <Link to="/gacha" className="flex items-center space-x-1 hover:text-purple-300">
                                        <Gift className="w-5 h-5" />
                                        <span>Gacha</span>
                                    </Link>
                                    <Link to="/minigames" className="flex items-center space-x-1 hover:text-purple-300">
                                        <Gamepad2 className="w-5 h-5" />
                                        <span>Minijuegos</span>
                                    </Link>
                                    {user.roles && user.roles.includes("ROLE_ADMIN") && (
                                        <Link to="/admin" className="flex items-center space-x-1 hover:text-red-300">
                                            <Settings className="w-5 h-5" />
                                            <span>Admin</span>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-4">
                            {user && (
                                <div className="flex items-center bg-purple-900/50 px-3 py-1 rounded-full">
                                    <span className="text-yellow-300 font-bold mr-1">💰</span>
                                    <span className="text-white font-medium">{user?.coins}</span>
                                </div>
                            )}
                            {user ? (
                                <button
                                    onClick={() => logOut()}
                                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                                >
                                    Cerrar Sesión
                                </button>
                            ) : (
                                <div className="space-x-4">
                                    <Link
                                        to="/register"
                                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                                    >
                                        Registrarse
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
                                    >
                                        Iniciar sesión
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout;