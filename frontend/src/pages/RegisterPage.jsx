import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Loading from '../components/Loading';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { registerUser } = useAuth();

    const handleChange = (e) => {
        const nombre = e.target.name;
        setFormData({ ...formData, [nombre]: e.target.value.trim() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await registerUser(formData);
            navigate("/login");
        } catch (error) {
            setError(error.message || "Error al crear la cuenta");
            setFormData({
                email: "",
                username: "",
                password: ""
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
            <Link
                to="/"
                className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white hover:bg-white/20 transition duration-200 flex items-center gap-2"
            >
                ← Volver al inicio
            </Link>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-md relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center rounded-lg">
                        <Loading />
                    </div>
                )}
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Crear Cuenta</h2>
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-white mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-white mb-1">
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-white mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Registrarse
                    </button>
                </form>
                <p className="mt-4 text-center text-white">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-purple-300 hover:text-purple-200">
                        Inicia Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;