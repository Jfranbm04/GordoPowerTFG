import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, User, ShoppingBag, Gift, Gamepad2, Book, Settings, Menu, X } from 'lucide-react';

const RootLayout = () => {
    const { getCurrentUser, logOut } = useAuth();
    const [user, setUser] = useState(getCurrentUser());
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Actualizar el usuario cada 2 segundos
        const interval = setInterval(() => {
            const currentUser = getCurrentUser();
            setUser(currentUser);
        }, 2000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [getCurrentUser]);

    // Cerrar el menú al cambiar de ruta
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    // Prevenir scroll cuando el menú está abierto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
            <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 relative z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
                                <Home className="w-6 h-6" />
                                <span>Gordo Power</span>
                            </Link>
                        </div>

                        {/* Menú para escritorio */}
                        <div className="hidden md:flex items-center space-x-4">
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

                        {/* Botón de menú hamburguesa para móvil */}
                        <div className="md:hidden flex items-center">
                            {user && (
                                <div className="flex items-center bg-purple-900/50 px-3 py-1 rounded-full mr-4">
                                    <span className="text-yellow-300 font-bold mr-1">💰</span>
                                    <span className="text-white font-medium">{user?.coins}</span>
                                </div>
                            )}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-white hover:bg-purple-800 z-50"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenido principal */}
            <div className={`relative ${isMenuOpen ? 'hidden md:block' : 'block'}`}>
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <Outlet />
                </main>
            </div>

            {/* Menú móvil y overlay - con animaciones */}
            <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                {/* Overlay oscuro con animación */}
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsMenuOpen(false)}
                ></div>

                {/* Menú lateral con animación */}
                <div className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-gradient-to-br from-purple-900 to-indigo-900 shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <Link to="/" className="flex items-center space-x-2 text-xl font-bold" onClick={handleLinkClick}>
                            <Home className="w-6 h-6" />
                            <span>Gordo Power</span>
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-md text-white hover:bg-purple-800"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="py-4 overflow-y-auto h-[calc(100%-64px)]">
                        <div className="px-4 space-y-3">
                            {user ? (
                                <>
                                    <div className="flex items-center bg-purple-900/50 px-3 py-2 rounded-lg mb-4">
                                        <span className="text-yellow-300 font-bold mr-2">💰</span>
                                        <span className="text-white font-medium">{user?.coins} monedas</span>
                                    </div>

                                    <Link
                                        to="/profile"
                                        className="block px-3 py-3 rounded-md text-base font-medium hover:bg-purple-800 transition-colors"
                                        onClick={handleLinkClick}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <User className="w-5 h-5" />
                                            <span>Perfil</span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/shop"
                                        className="block px-3 py-3 rounded-md text-base font-medium hover:bg-purple-800 transition-colors"
                                        onClick={handleLinkClick}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <ShoppingBag className="w-5 h-5" />
                                            <span>Tienda</span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/collection"
                                        className="block px-3 py-3 rounded-md text-base font-medium hover:bg-purple-800 transition-colors"
                                        onClick={handleLinkClick}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Book className="w-5 h-5" />
                                            <span>Colección</span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/gacha"
                                        className="block px-3 py-3 rounded-md text-base font-medium hover:bg-purple-800 transition-colors"
                                        onClick={handleLinkClick}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Gift className="w-5 h-5" />
                                            <span>Gacha</span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/minigames"
                                        className="block px-3 py-3 rounded-md text-base font-medium hover:bg-purple-800 transition-colors"
                                        onClick={handleLinkClick}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Gamepad2 className="w-5 h-5" />
                                            <span>Minijuegos</span>
                                        </div>
                                    </Link>
                                    {user.roles && user.roles.includes("ROLE_ADMIN") && (
                                        <Link
                                            to="/admin"
                                            className="block px-3 py-3 rounded-md text-base font-medium hover:bg-red-800 transition-colors"
                                            onClick={handleLinkClick}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Settings className="w-5 h-5" />
                                                <span>Admin</span>
                                            </div>
                                        </Link>
                                    )}
                                    <div className="pt-4 px-3">
                                        <button
                                            onClick={() => {
                                                logOut();
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full bg-red-500 hover:bg-red-600 px-4 py-3 rounded-lg text-center font-medium transition-colors"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-3 pt-2 px-3">
                                    <Link
                                        to="/register"
                                        className="block w-full bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg text-center font-medium transition-colors"
                                        onClick={handleLinkClick}
                                    >
                                        Registrarse
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="block w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-3 rounded-lg text-center font-medium transition-colors"
                                        onClick={handleLinkClick}
                                    >
                                        Iniciar sesión
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RootLayout;