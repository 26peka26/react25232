import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import logo from '../../assets/logo.png';
// Eliminamos la importación del CSS problemático: import './Header.css';

export const Header = () => {
    const navigate = useNavigate(); 
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    // Lógica para verificar el estado de login en localStorage
    useEffect(() => {
        const checkLoginStatus = () => {
            const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
            setIsAdminLoggedIn(loggedIn);
        };
        
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
        // Usamos styles.header para el fondo
        <header style={styles.header}>
            {/* Usamos styles.container para forzar el layout flexible */}
            <div style={styles.container}>
                {/* 1. Logo */}
                <Link to={"/"} style={styles.link}>
                    <img src={logo} alt="Logo de la tienda de cómics" className="header-logo" style={styles.logo} />
                </Link>
                
                {/* 2. Navegación */}
                <Nav />
                
                {/* 3. Botones (styles.adminControls asegura el espacio) */}
                <div style={styles.adminControls}>
                    {isAdminLoggedIn ? (
                        // Administrador logueado
                        <>
                            <Link to="/admin" style={{ ...styles.adminButton, ...styles.manageButton }}>
                                Panel Admin
                            </Link>
                            <button onClick={handleLogout} style={styles.logoutButton}>
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        // Nadie logueado
                        <Link to="/admin/login" style={styles.adminButton}>
                            Acceso Admin
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};


// ⚠️ ESTILOS DEFINIDOS AQUÍ para forzar el layout y la visibilidad
const styles = {
    header: {
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 0',
        zIndex: 1000, // Alto z-index para asegurar que no quede detrás de nada
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex', // Crucial: Organiza en una fila
        justifyContent: 'space-between', // Crucial: Separa Logo, Nav y Botones
        alignItems: 'center',
        padding: '0 20px',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    logo: {
        height: '50px', // Ajusta el tamaño de tu logo
    },
    adminControls: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        // Estilo de Alto Contraste para la prueba final (se puede quitar después)
        border: '2px dashed yellow', 
        padding: '5px',
    },
    adminButton: {
        backgroundColor: '#5e40c0', 
        color: 'white',
        padding: '8px 15px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
        border: 'none',
        cursor: 'pointer',
    },
    manageButton: {
        backgroundColor: '#007bff', 
    },
    logoutButton: {
        backgroundColor: 'red',
        color: 'white',
        padding: '8px 15px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
    }
};
