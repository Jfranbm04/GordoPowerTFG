import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useFood } from '../context/FoodContext';
import { FoodShopCard } from '../components/FoodShopCard';

const ShopPage = () => {
    const { user, updateUserCoins } = useUser();
    const { foods, userFoods, loading, updateFoodQuantity } = useFood();
    const [showModal, setShowModal] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState('loading');
    const [currentFood, setCurrentFood] = useState(null);

    const isUnlocked = (foodId) => {
        if (!userFoods?.member) return false;
        return userFoods.member.some(uf => {
            const userFoodId = uf.food.split('/').pop();
            return userFoodId === foodId.toString();
        });
    };

    const handleBuy = async (foodId, price) => {
        if (!user || user.coins < price || !isUnlocked(foodId)) return;

        const foodName = foods.member.find(f => f.id === foodId)?.name;
        setCurrentFood(foodName);
        setShowModal(true);
        setPurchaseStatus('loading');

        try {
            const existingUserFood = userFoods.member.find(uf => {
                const userFoodId = uf.food.split('/').pop();
                return userFoodId === foodId.toString();
            });

            if (existingUserFood) {
                // Simular un tiempo de carga
                setTimeout(async () => {
                    try {
                        await updateFoodQuantity(existingUserFood.id, existingUserFood.quantity + 1);
                        await updateUserCoins(user.id, user.coins - price);
                        setPurchaseStatus('success');

                        // Cerrar el modal después de mostrar el éxito
                        setTimeout(() => {
                            setShowModal(false);
                            setPurchaseStatus('loading');
                            setCurrentFood(null);
                        }, 1500);
                    } catch (error) {
                        console.error('Error al comprar:', error);
                        setPurchaseStatus('error');
                    }
                }, 2000);
            }
        } catch (error) {
            console.error('Error al comprar:', error);
            setPurchaseStatus('error');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
                    <p className="text-purple-300">Cargando tienda...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 relative">
            {/* Modal de compra */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-purple-900/90 p-6 rounded-xl backdrop-blur-sm max-w-sm w-full mx-4">
                        <div className="text-center space-y-4">
                            {purchaseStatus === 'loading' ? (
                                <>
                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
                                    <p className="text-purple-300">Comprando un plato de {currentFood}...</p>
                                </>
                            ) : purchaseStatus === 'success' ? (
                                <>
                                    <div className="text-green-500 text-4xl">👍</div>
                                    <p className="text-green-300">¡Compra realizada!</p>
                                </>
                            ) : (
                                <>
                                    <div className="text-red-500 text-4xl">×</div>
                                    <p className="text-red-300">Error en la compra</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Alimentación Cremallera
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {foods?.member?.map((food) => {
                    // Obtener la cantidad de esta comida específica
                    const userFood = userFoods?.member?.find(uf => {
                        const userFoodId = uf.food.split('/').pop();
                        return userFoodId === food.id.toString();
                    });

                    return (
                        <FoodShopCard 
                            key={food.id}
                            food={food}
                            userFood={userFood}
                            onBuy={handleBuy}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ShopPage;