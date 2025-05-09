import React, { useState, useEffect } from 'react';
import { useFood } from '../context/FoodContext';

const AdminFood = () => {
    const [showForm, setShowForm] = useState(false);
    const [showList, setShowList] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        origin: '',
        type: '',
        rarity: 'COMMON',
        protein: 0,
        fat: 0,
        price: 0
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
            const timer = setTimeout(() => {
                setNotification({ show: false, message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let success;

            if (editMode) {
                // Actualizar plato existente
                success = await updateFood(editingFoodId, formData);
                if (success) {
                    setNotification({
                        show: true,
                        message: '¡Plato actualizado exitosamente!',
                        type: 'success'
                    });
                    setEditMode(false);
                    setEditingFoodId(null);
                    setShowEditForm(false);
                }
            } else {
                // Crear nuevo plato
                success = await createFood(formData);
                if (success) {
                    setNotification({
                        show: true,
                        message: '¡Plato creado exitosamente!',
                        type: 'success'
                    });
                    setShowForm(false);
                }
            }

            if (success) {
                // Limpiar formulario
                setFormData({
                    name: '',
                    description: '',
                    origin: '',
                    type: '',
                    rarity: 'COMMON',
                    protein: 0,
                    fat: 0,
                    price: 0
                });

                // Mostrar lista actualizada
                setShowList(true);
            }
        } catch (error) {
            console.error('Error al procesar el plato:', error);
            setNotification({
                show: true,
                message: editMode
                    ? 'Error al actualizar el plato. Inténtalo de nuevo.'
                    : 'Error al crear el plato. Inténtalo de nuevo.',
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Función para iniciar la edición de un plato
    const handleEdit = (food) => {
        setFormData({
            name: food.name,
            description: food.description || '',
            origin: food.origin,
            type: food.type,
            rarity: food.rarity,
            protein: food.protein,
            fat: food.fat,
            price: food.price
        });
        setEditMode(true);
        setEditingFoodId(food.id);
        setShowEditForm(true);
        setShowForm(false);

        // Desplazar la vista al formulario de edición
        setTimeout(() => {
            document.getElementById('editForm').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Función para eliminar un plato
    const handleDelete = async (foodId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este plato?')) {
            try {
                const success = await deleteFood(foodId);
                if (success) {
                    setNotification({
                        show: true,
                        message: 'Plato eliminado correctamente',
                        type: 'success'
                    });
                }
            } catch (error) {
                console.error('Error al eliminar el plato:', error);
                setNotification({
                    show: true,
                    message: 'Error al eliminar el plato',
                    type: 'error'
                });
            }
        }
    };

    // Cancelar la edición
    const handleCancelEdit = () => {
        setEditMode(false);
        setEditingFoodId(null);
        setShowEditForm(false);
        setFormData({
            name: '',
            description: '',
            origin: '',
            type: '',
            rarity: 'COMMON',
            protein: 0,
            fat: 0,
            price: 0
        });
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'protein' || name === 'fat' || name === 'price'
                ? parseFloat(value)
                : value
        }));
    };

    if (loading) {
        return <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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
                            if (showList) setShowList(false);
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
                    <button
                        onClick={() => {
                            setShowList(!showList);
                            if (showForm) setShowForm(false);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"
                    >
                        {showList ? 'Ocultar Lista' : 'Ver Platos'}
                    </button>
                </div>
            </div>

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
                                <label className="block text-sm font-medium mb-1">Origen</label>
                                <input
                                    type="text"
                                    name="origin"
                                    value={formData.origin}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tipo</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
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
                                >
                                    <option value="COMMON">Común</option>
                                    <option value="RARE">Raro</option>
                                    <option value="EPIC">Épico</option>
                                    <option value="LEGENDARY">Legendario</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Precio</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Proteína (g)</label>
                                <input
                                    type="number"
                                    name="protein"
                                    value={formData.protein}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Grasa (g)</label>
                                <input
                                    type="number"
                                    name="fat"
                                    value={formData.fat}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Descripción</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                rows="3"
                                required
                            ></textarea>
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

            {/* Formulario desplegable para crear */}
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
                                <label className="block text-sm font-medium mb-1">Origen</label>
                                <input
                                    type="text"
                                    name="origin"
                                    value={formData.origin}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tipo</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
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
                                >
                                    <option value="COMMON">Común</option>
                                    <option value="RARE">Raro</option>
                                    <option value="EPIC">Épico</option>
                                    <option value="LEGENDARY">Legendario</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Precio</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Proteína (g)</label>
                                <input
                                    type="number"
                                    name="protein"
                                    value={formData.protein}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Grasa (g)</label>
                                <input
                                    type="number"
                                    name="fat"
                                    value={formData.fat}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Descripción</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                                rows="3"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 rounded-lg transition duration-200 ${isSubmitting
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-purple-600 hover:bg-purple-700'
                                }`}
                        >
                            {isSubmitting ? 'Creando...' : 'Crear Plato'}
                        </button>
                    </form>
                </div>
            )}

            {/* Lista de platos */}
            {showList && (
                <div className="bg-white/10 p-6 rounded-lg animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4">Lista de Platos</h3>
                    <div className="space-y-4">
                        {foodsList.length > 0 ? (
                            foodsList.map((food) => (
                                <div key={food.id}
                                    className="flex items-center justify-between bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4 flex-1">

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold">{food.name}</h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${food.rarity === 'LEGENDARY' ? 'bg-yellow-500/20 text-yellow-300' :
                                                    food.rarity === 'EPIC' ? 'bg-purple-500/20 text-purple-300' :
                                                        food.rarity === 'RARE' ? 'bg-blue-500/20 text-blue-300' :
                                                            'bg-gray-500/20 text-gray-300'
                                                    }`}>
                                                    {food.rarity}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-400 mt-1">
                                                <span>Origen: {food.origin}</span>
                                                <span className="mx-2">•</span>
                                                <span>Tipo: {food.type}</span>
                                                <span className="mx-2">•</span>
                                                <span>Precio: {food.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(food)}
                                            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm transition-colors"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(food.id)}
                                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                No hay platos disponibles. ¡Crea uno nuevo!
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminFood;