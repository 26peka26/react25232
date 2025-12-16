import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import logo from '../../assets/logo.png';
// Importa el archivo CSS donde definas las clases .admin-controls, etc.
import './Header.css'; // Asumiendo que crearás un archivo de estilos para el header

export const Header = () => {
    const navigate = useNavigate(); 
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    // Lógica para verificar el estado de login en localStorage
    useEffect(() => {
        const checkLoginStatus = () => {
            const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
            setIsAdminLoggedIn(loggedIn);
        };
        
        // Ejecutar al montar y escuchar cambios de almacenamiento
        window.addEventListener('storage', checkLoginStatus);
        checkLoginStatus();

        return () => window.removeEventListener('storage', checkLoginStatus);
    }, []);

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        setIsAdminLoggedIn(false); 
        navigate('/'); 
        alert('Sesión de administrador cerrada.');
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <header className="main-header">
            <div className="header-container">
                <Link to={"/"} className="header-link">
                    <img src={logo} alt="Logo de la tienda de cómics" className="header-logo" />
                </Link>
                
                <Nav />
                
                {/* Botones condicionales usando clases CSS */}
                <div className="admin-controls">
                    {isAdminLoggedIn ? (
                        // Opción 1: Administrador logueado -> Mostrar Cerrar Sesión
                        <>
                            <Link to="/admin" className="admin-button manage-button">
                                Panel Admin
                            </Link>

                            <button onClick={handleLogout} className="admin-button logout-button">
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        // Opción 2: Nadie logueado -> Mostrar Acceso Admin
                        <Link to="/admin/login" className="admin-button access-button">
                            Acceso Admin
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};
