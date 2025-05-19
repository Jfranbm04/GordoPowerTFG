import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Loading from './loading';

const AdminUser = () => {
    const [showList, setShowList] = useState(true);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [editMode, setEditMode] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        coins: 0,
        active: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { users, loading, updateUser } = useUser();
    const usersList = users?.member || [];
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // Función para iniciar la edición de un usuario
    const handleEdit = (user) => {
        setFormData({
            username: user.username,
            email: user.email,
            coins: user.coins,
            active: user.active
        });
        setEditMode(true);
        setEditingUserId(user.id);
        setShowEditForm(true);

        // Desplazar la vista al formulario de edición
        setTimeout(() => {
            document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Función para banear/desbanear un usuario
    const handleBanToggle = async (userId, isCurrentlyActive) => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify({
                    active: !isCurrentlyActive
                })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el estado del usuario');
            }

            // Actualizar la lista de usuarios
            if (updateUser) {
                await updateUser(userId, { active: !isCurrentlyActive });
            }

            setNotification({
                show: true,
                message: isCurrentlyActive
                    ? 'Usuario baneado correctamente'
                    : 'Usuario desbaneado correctamente',
                type: 'success'
            });
        } catch (error) {
            console.error('Error:', error);
            setNotification({
                show: true,
                message: 'Error al cambiar el estado del usuario',
                type: 'error'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${BASE_URL}/api/users/${editingUserId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }

            // Actualizar la lista de usuarios
            if (updateUser) {
                await updateUser(editingUserId, formData);
            }

            setNotification({
                show: true,
                message: '¡Usuario actualizado exitosamente!',
                type: 'success'
            });
            setEditMode(false);
            setEditingUserId(null);
            setShowEditForm(false);

            // Limpiar formulario
            setFormData({
                username: '',
                email: '',
                coins: 0,
                active: true
            });
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            setNotification({
                show: true,
                message: 'Error al actualizar el usuario. Inténtalo de nuevo.',
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Cancelar la edición
    const handleCancelEdit = () => {
        setEditMode(false);
        setEditingUserId(null);
        setShowEditForm(false);
        setFormData({
            username: '',
            email: '',
            coins: 0,
            active: true
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox'
                ? checked
                : name === 'coins'
                    ? parseInt(value)
                    : value
        }));
    };

    // Ocultar notificación después de 3 segundos
    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification({ show: false, message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    if (loading) {
        return <div className="flex justify-center items-center">
            <Loading />
        </div>;
    }

    return (
        <div className="space-y-6 relative">
            {/* Notificación */}
            {notification.show && (
                <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${notification.type === 'success' ? 'bg-green-500/80' : 'bg-red-500/80'
                    } text-white`}>
                    {notification.message}
                </div>
            )}

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
            </div>

            {/* Formulario de edición */}
            {showEditForm && (
                <div id="editForm" className="bg-white/10 p-6 rounded-lg animate-fadeIn border-2 border-yellow-500/50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Editar Usuario</h3>
                        <button
                            onClick={handleCancelEdit}
                            className="text-gray-400 hover:text-white"
                        >
                            Cancelar
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nombre de Usuario</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Monedas</label>
                                <input
                                    type="number"
                                    name="coins"
                                    value={formData.coins}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleChange}
                                        className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                                    />
                                    <span className="ml-2 text-sm font-medium">Usuario Activo</span>
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 rounded-lg transition duration-200 ${isSubmitting
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-yellow-600 hover:bg-yellow-700'
                                }`}
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </form>
                </div>
            )}

            {/* Lista de usuarios */}
            {showList && (
                <div className="bg-white/10 p-4 sm:p-6 rounded-lg animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4">Lista de Usuarios</h3>
                    <div className="space-y-4">
                        {usersList.length > 0 ? (
                            usersList.map((user) => (
                                <div key={user.id}
                                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg transition-all duration-300 ${user.active ? 'bg-white/5 hover:bg-white/10' : 'bg-red-900/20 hover:bg-red-900/30'
                                        }`}
                                >
                                    <div className="flex items-start sm:items-center gap-4 flex-1 w-full sm:w-auto">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center shrink-0">
                                            <span className="text-xl">👤</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-bold truncate">{user.username}</h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${user.roles.includes('ROLE_ADMIN')
                                                    ? 'bg-red-500/20 text-red-300'
                                                    : 'bg-blue-500/20 text-blue-300'
                                                    }`}>
                                                    {user.roles.includes('ROLE_ADMIN') ? 'Admin' : 'Usuario'}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${user.active
                                                    ? 'bg-green-500/20 text-green-300'
                                                    : 'bg-red-500/20 text-red-300'
                                                    }`}>
                                                    {user.active ? 'Activo' : 'Baneado'}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-400 mt-1 flex flex-wrap gap-2">
                                                <span className="truncate">Email: {user.email}</span>
                                                <span className="hidden sm:inline">•</span>
                                                <span>Monedas: {user.coins}</span>
                                                <span className="hidden sm:inline">•</span>
                                                <span className="truncate">ID: {user.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="flex-1 sm:flex-none bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm transition-colors"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleBanToggle(user.id, user.active)}
                                            className={`flex-1 sm:flex-none px-3 py-1 rounded text-sm transition-colors ${user.active
                                                ? 'bg-red-600 hover:bg-red-700'
                                                : 'bg-green-600 hover:bg-green-700'
                                                }`}
                                        >
                                            {user.active ? 'Banear' : 'Desbanear'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                No hay usuarios disponibles.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUser;