import React, { useState, useEffect } from 'react';
import { useFood } from '../context/FoodContext';
import Loading from './loading';

const AdminFood = () => {

    const [showForm, setShowForm] = useState(false);
    const [showList, setShowList] = useState(true);
    const [formData, setFormData] = useState({
        name: '', description: '', origin: '', type: '', rarity: 'COMMON',
        protein: 0, fat: 0, price: 0, image: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [editMode, setEditMode] = useState(false);
    const [editingFoodId, setEditingFoodId] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const { foods, loading, createFood, updateFood, deleteFood } = useFood();
    const foodsList = foods?.member || [];

    // Ocultar notificación después de 3 segundos
    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const resetForm = () => setFormData({
        name: '', description: '', origin: '', type: '', rarity: 'COMMON',
        protein: 0, fat: 0, price: 0, image: null
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
            const success = await createFood(data, true);
            if (success) {
                setNotification({ show: true, message: 'Plato creado exitosamente', type: 'success' });
                setShowForm(false);
                resetForm();
            }
        } catch {
            setNotification({ show: true, message: 'Error al crear el plato.', type: 'error' });
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
            const success = await updateFood(editingFoodId, data, true);
            if (success) {
                setNotification({ show: true, message: 'Plato actualizado', type: 'success' });
                setEditMode(false);
                setShowEditForm(false);
                setEditingFoodId(null);
                resetForm();
            }
        } catch {
            setNotification({ show: true, message: 'Error al actualizar el plato.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (food) => {
        setFormData({
            name: food.name, description: food.description || '', origin: food.origin,
            type: food.type, rarity: food.rarity, protein: food.protein,
            fat: food.fat, price: food.price, image: null
        });
        setEditMode(true);
        setEditingFoodId(food.id);
        setShowEditForm(true);
        setShowForm(false);
        setTimeout(() => {
            document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleDelete = async (foodId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este plato?')) {
            const success = await deleteFood(foodId);
            if (success) setNotification({ show: true, message: 'Plato eliminado', type: 'success' });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] :
                ['protein', 'fat', 'price'].includes(name) ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) handleUpdate(); else handleCreate();
    };

    // Cancelar la edición
    const handleCancelEdit = () => {
        setEditMode(false);
        setEditingFoodId(null);
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
                <h2 className="text-2xl font-bold">Gestión de Platos</h2>
                <div className="space-x-4">
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            if (showEditForm) {
                                setShowEditForm(false);
                                setEditMode(false);
                                setEditingFoodId(null);
                            }
                        }}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition duration-200"
                    >
                        {showForm ? 'Cerrar Formulario' : 'Nuevo Plato'}
                    </button>
                </div>
            </div>

            {/* Formulario de creación */}
            {showForm && (
                <div className="bg-white/10 p-6 rounded-lg animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4">Crear Nuevo Plato</h3>
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
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                                    required
                                >
                                    <option value="COMMON" className="bg-gray-800 text-gray-300">Común</option>
                                    <option value="RARE" className="bg-blue-800 text-blue-300">Rara</option>
                                    <option value="EPIC" className="bg-purple-800 text-purple-300">Épica</option>
                                    <option value="LEGENDARY" className="bg-yellow-800 text-yellow-300">Legendaria</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Origen</label>
                                <input
                                    type="text"
                                    name="origin"
                                    value={formData.origin}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Tipo</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                                    required
                                >
                                    <option value="">Selecciona un tipo</option>
                                    <option value="bebida" className="bg-gray-800">Bebida</option>
                                    <option value="tapa" className="bg-gray-800">Tapa</option>
                                    <option value="entrante" className="bg-gray-800">Entrante</option>
                                    <option value="principal" className="bg-gray-800">Principal</option>
                                    <option value="secundario" className="bg-gray-800">Secundario</option>
                                    <option value="postre" className="bg-gray-800">Postre</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Proteínas (g)</label>
                                <input
                                    type="number"
                                    name="protein"
                                    value={formData.protein}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="0"
                                    step="0.1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Grasas (g)</label>
                                <input
                                    type="number"
                                    name="fat"
                                    value={formData.fat}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="0"
                                    step="0.1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Precio</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="0"
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

                        <div className="col-span-full">
                            <label className="block text-sm font-medium mb-1">Descripción</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-24"
                            ></textarea>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    resetForm();
                                }}
                                className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50 flex items-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creando...
                                    </>
                                ) : 'Crear Plato'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Formulario de edición */}
            {showEditForm && (
                <div id="editForm" className="bg-white/10 p-6 rounded-lg animate-fadeIn border-2 border-yellow-500/50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Editar Plato</h3>
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
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                                    required
                                >
                                    <option value="COMMON" className="bg-gray-800 text-gray-300">Común</option>
                                    <option value="RARE" className="bg-blue-800 text-blue-300">Rara</option>
                                    <option value="EPIC" className="bg-purple-800 text-purple-300">Épica</option>
                                    <option value="LEGENDARY" className="bg-yellow-800 text-yellow-300">Legendaria</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Origen</label>
                                <input
                                    type="text"
                                    name="origin"
                                    value={formData.origin}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Tipo</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                                    required
                                >
                                    <option value="">Selecciona un tipo</option>
                                    <option value="bebida" className="bg-gray-800">Bebida</option>
                                    <option value="tapa" className="bg-gray-800">Tapa</option>
                                    <option value="entrante" className="bg-gray-800">Entrante</option>
                                    <option value="principal" className="bg-gray-800">Principal</option>
                                    <option value="secundario" className="bg-gray-800">Secundario</option>
                                    <option value="postre" className="bg-gray-800">Postre</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Proteínas (g)</label>
                                <input
                                    type="number"
                                    name="protein"
                                    value={formData.protein}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="0"
                                    step="0.1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Grasas (g)</label>
                                <input
                                    type="number"
                                    name="fat"
                                    value={formData.fat}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="0"
                                    step="0.1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Precio</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    min="0"
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

                        <div className="col-span-full">
                            <label className="block text-sm font-medium mb-1">Descripción</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 h-24"
                            ></textarea>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50 flex items-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Actualizando...
                                    </>
                                ) : 'Actualizar Plato'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de platos */}
            <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Lista de Platos</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Imagen</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Origen</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rareza</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Precio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodsList.map((food) => (
                                <tr key={food.id} className="border-b border-white/10 hover:bg-white/5">
                                    <td className="py-3 px-4">
                                        {food.image ? (
                                            <div className="w-24 h-24 overflow-hidden rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                <img
                                                    src={`${import.meta.env.VITE_BASE_URL}/${food.image}`} // Consulta porque la ruta está en la base de datos
                                                    alt={food.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-24 h-24 bg-white/5 rounded-lg flex items-center justify-center">
                                                <span className="text-4xl">🍽️</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 font-medium">{food.name}</td>
                                    <td className="py-3 px-4">{food.origin}</td>
                                    <td className="py-3 px-4">{food.type}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${food.rarity.toUpperCase() === 'LEGENDARY' ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30' :
                                            food.rarity.toUpperCase() === 'EPIC' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30' :
                                                food.rarity.toUpperCase() === 'RARE' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30' :
                                                    'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border border-gray-500/30'
                                            }`}>
                                            {food.rarity.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="text-yellow-300">💰 {food.price}</span>
                                    </td>
                                    <td className="py-3 px-4 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(food)}
                                            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded transition duration-200"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(food.id)}
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

export default AdminFood;