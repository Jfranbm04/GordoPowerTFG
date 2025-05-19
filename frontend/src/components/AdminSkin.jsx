import React, { useState, useEffect } from 'react';
import { useSkin } from '../context/SkinContext';
import Loading from './loading';

const AdminSkin = () => {
    const [showForm, setShowForm] = useState(false);
    const [showList, setShowList] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        levelcondition: 1,
        proteincondition: 0,
        fatcondition: 0,
        rarity: 'COMMON'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [editMode, setEditMode] = useState(false);
    const [editingSkinId, setEditingSkinId] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const { skins, loading, createSkin, updateSkin, deleteSkin } = useSkin();
    const skinsList = skins?.member || [];

    // Ocultar notificación después de 3 segundos
    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const resetForm = () => setFormData({
        name: '',
        image: null,
        levelcondition: 1,
        proteincondition: 0,
        fatcondition: 0,
        rarity: 'COMMON'
    });

    const handleCreate = async () => {
        setIsSubmitting(true);
        try {
            const data = new FormData();
            for (const key in formData) {
                if (formData[key] !== null && formData[key] !== undefined) {
                    data.append(key, formData[key]);
                }
            }
            const success = await createSkin(data, true);
            if (success) {
                setNotification({ show: true, message: 'Skin creada exitosamente', type: 'success' });
                setShowForm(false);
                resetForm();
            }
        } catch (error) {
            console.error('Error:', error);
            setNotification({ show: true, message: 'Error al crear la skin', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async () => {
        setIsSubmitting(true);
        try {
            const data = new FormData();
            for (const key in formData) {
                if (formData[key] !== null && formData[key] !== undefined) {
                    data.append(key, formData[key]);
                }
            }
            const success = await updateSkin(editingSkinId, data, true);
            if (success) {
                setNotification({ show: true, message: 'Skin actualizada', type: 'success' });
                setEditMode(false);
                setShowEditForm(false);
                setEditingSkinId(null);
                resetForm();
            }
        } catch (error) {
            console.error('Error:', error);
            setNotification({ show: true, message: 'Error al actualizar la skin', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (skin) => {
        setFormData({
            name: skin.name,
            levelcondition: skin.levelcondition,
            proteincondition: skin.proteincondition,
            fatcondition: skin.fatcondition,
            rarity: skin.rarity,
            image: null
        });
        setEditMode(true);
        setEditingSkinId(skin.id);
        setShowEditForm(true);
        setShowForm(false);
        setTimeout(() => {
            document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleDelete = async (skinId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta skin?')) {
            const success = await deleteSkin(skinId);
            if (success) setNotification({ show: true, message: 'Skin eliminada', type: 'success' });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] :
                ['levelcondition', 'proteincondition', 'fatcondition'].includes(name) ? parseInt(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) handleUpdate(); else handleCreate();
    };

    // Cancelar la edición
    const handleCancelEdit = () => {
        setEditMode(false);
        setEditingSkinId(null);
        setShowEditForm(false);
        resetForm();
    };

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
                <h2 className="text-2xl font-bold">Gestión de Skins</h2>
                <div className="space-x-4">
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            if (showEditForm) {
                                setShowEditForm(false);
                                setEditMode(false);
                                setEditingSkinId(null);
                            }
                        }}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition duration-200"
                    >
                        {showForm ? 'Cerrar Formulario' : 'Nueva Skin'}
                    </button>
                </div>
            </div>

            {/* Formulario de creación */}
            {showForm && (
                <div className="bg-white/10 p-6 rounded-lg animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4">Crear Nueva Skin</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Rareza</label>
                                <select
                                    name="rarity"
                                    value={formData.rarity}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                >
                                    <option value="COMMON">Común</option>
                                    <option value="RARE">Rara</option>
                                    <option value="EPIC">Épica</option>
                                    <option value="LEGENDARY">Legendaria</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Condición de Nivel</label>
                                <input
                                    type="number"
                                    name="levelcondition"
                                    value={formData.levelcondition}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="1"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Condición de Proteína</label>
                                <input
                                    type="number"
                                    name="proteincondition"
                                    value={formData.proteincondition}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="0"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Condición de Grasa</label>
                                <input
                                    type="number"
                                    name="fatcondition"
                                    value={formData.fatcondition}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="0"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Imagen</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    accept="image/*"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition duration-200 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Creando...' : 'Crear Skin'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Formulario de edición */}
            {showEditForm && (
                <div id="editForm" className="bg-white/10 p-6 rounded-lg animate-fadeIn border-2 border-yellow-500/50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Editar Skin</h3>
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
                                <label className="block text-sm font-medium mb-1">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Rareza</label>
                                <select
                                    name="rarity"
                                    value={formData.rarity}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                >
                                    <option value="COMMON">Común</option>
                                    <option value="RARE">Rara</option>
                                    <option value="EPIC">Épica</option>
                                    <option value="LEGENDARY">Legendaria</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Condición de Nivel</label>
                                <input
                                    type="number"
                                    name="levelcondition"
                                    value={formData.levelcondition}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="1"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Condición de Proteína</label>
                                <input
                                    type="number"
                                    name="proteincondition"
                                    value={formData.proteincondition}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="0"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Condición de Grasa</label>
                                <input
                                    type="number"
                                    name="fatcondition"
                                    value={formData.fatcondition}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="0"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Imagen</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition duration-200 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Actualizando...' : 'Actualizar Skin'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de skins */}
            <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Lista de Skins</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="py-3 px-4 text-left">Imagen</th>
                                <th className="py-3 px-4 text-left">Nombre</th>
                                <th className="py-3 px-4 text-left">Nivel requerido</th>
                                <th className="py-3 px-4 text-left">Proteína requerida</th>
                                <th className="py-3 px-4 text-left">Grasa requerida</th>
                                <th className="py-3 px-4 text-left">Rareza</th>
                                <th className="py-3 px-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skinsList.map((skin) => (
                                <tr key={skin.id} className="border-b border-white/10 hover:bg-white/5">
                                    <td className="py-3 px-4">
                                        {skin.image ? (
                                            <div className="w-24 h-24 overflow-hidden rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <img
                                                    src={`${import.meta.env.VITE_BASE_URL}/${skin.image}`}
                                                    alt={skin.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-24 h-24 bg-white/5 rounded-lg flex items-center justify-center">
                                                <span className="text-4xl">👕</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 font-medium">{skin.name}</td>
                                    <td className="py-3 px-4">⭐ {skin.levelcondition}</td>
                                    <td className="py-3 px-4">💪 {skin.proteincondition}g</td>
                                    <td className="py-3 px-4">🍖 {skin.fatcondition}g</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${skin.rarity.toUpperCase() === 'LEGENDARY' ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30' :
                                            skin.rarity.toUpperCase() === 'EPIC' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' :
                                                skin.rarity.toUpperCase() === 'RARE' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30' :
                                                    'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border border-gray-500/30'
                                            }`}>
                                            {skin.rarity.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(skin)}
                                            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded transition duration-200"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(skin.id)}
                                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition duration-200"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminSkin;