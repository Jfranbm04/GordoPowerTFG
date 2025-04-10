import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    // Recupero el token
    const { token } = useAuth();
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/" replace />;
    }


    return (
        <div>{children}</div>
    )
}

export default ProtectedRoute