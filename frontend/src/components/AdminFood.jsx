import React, { useState } from 'react';
import { useFood } from '../context/FoodContext';

const AdminFood = () => {
    const [showForm, setShowForm] = useState(false);
    const [showList, setShowList] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        emoji: '',
        origin: '',
        type: '',
        rarity: 'COMMON',
        protein: 0,
        fat: 0,
        price: 0
    });
    const { foods, loading, createFood } = useFood();
    const foodsList = foods?.member || [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await createFood(formData);

            if (success) {
                // Limpiar formulario y cerrar
                setFormData({
                    name: '',
                    description: '',
                    emoji: '',
                    origin: '',
                    type: '',
                    rarity: 'COMMON',
                    protein: 0,
                    fat: 0,
                    price: 0
                });
                setShowForm(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestión de Platos</h2>
                <div className="space-x-4">
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            if (showList) setShowList(false);
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

            {/* Formulario desplegable */}
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
                                <label className="block text-sm font-medium mb-1">Emoji</label>
                                <input
                                    type="text"
                                    name="emoji"
                                    value={formData.emoji}
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
                            className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition duration-200"
                        >
                            Crear Plato
                        </button>
                    </form>
                </div>
            )}

            {/* Lista de platos desplegable */}
            {showList && (
                <div className="bg-white/10 p-6 rounded-lg animate-fadeIn">
                    <h3 className="text-xl font-semibold mb-4">Lista de Platos</h3>
                    <div className="space-y-4">
                        {Array.isArray(foodsList) && foodsList.map((food) => (
                            <div key={food.id} 
                                className="flex items-center justify-between bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <span className="text-3xl">{food.emoji}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold">{food.name}</h3>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                food.rarity === 'LEGENDARY' ? 'bg-yellow-500/20 text-yellow-300' :
                                                food.rarity === 'EPIC' ? 'bg-purple-500/20 text-purple-300' :
                                                food.rarity === 'RARE' ? 'bg-blue-500/20 text-blue-300' :
                                                'bg-gray-500/20 text-gray-300'
                                            }`}>
                                                {food.rarity}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">{food.origin} • {food.type}</p>
                                        <div className="text-sm text-gray-300 mt-1">
                                            <span className="mr-4">💰 {food.price}</span>
                                            <span className="mr-4">🥩 {food.protein}g</span>
                                            <span>🍖 {food.fat}g</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors duration-200"
                                        onClick={() => handleEdit(food)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors duration-200"
                                        onClick={() => handleDelete(food.id)}
                                    >
                                        Borrar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminFood;