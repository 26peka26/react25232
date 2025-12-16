import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import { Nav } from "../Nav/Nav";
import logo from '../../assets/logo.png';

export const Header = () => {
    // Usamos useNavigate para redirigir después de cerrar sesión
    const navigate = useNavigate(); 
    
    // Estado para saber si el admin está logueado
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    // 1. Verificar el estado de login en localStorage
    useEffect(() => {
        const checkLoginStatus = () => {
            const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
            setIsAdminLoggedIn(loggedIn);
        };
        
        // Escuchar cambios en localStorage (ej: cuando se hace login o logout)
        window.addEventListener('storage', checkLoginStatus);
        
        // Verificar el estado inicial al montar
        checkLoginStatus();

        // Limpiar el listener al desmontar el componente
        return () => window.removeEventListener('storage', checkLoginStatus);
    }, []);

    // 2. Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        setIsAdminLoggedIn(false); // Actualiza el estado local
        navigate('/'); // Redirige a la página principal
        alert('Sesión de administrador cerrada.');
        // También fuerza un evento de 'storage' para otros componentes (opcional)
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <Link to={"/"} style={styles.link}>
                    <img src={logo} alt="Logo de la tienda de cómics" className="header-logo" style={styles.logo} />
                </Link>
                
                <Nav />
                
                {/* 3. Botones condicionales (Admin Access / Logout) */}
                <div style={styles.adminControls}>
                    {isAdminLoggedIn ? (
                        // Opción 1: El administrador está logueado -> Mostrar Cerrar Sesión
                        <>
                            {/* Enlace opcional para volver al panel de gestión si ya está logueado */}
                            <Link to="/admin" style={{ ...styles.adminButton, ...styles.manageButton }}>
                                Panel Admin
                            </Link>

                            <button onClick={handleLogout} style={styles.logoutButton}>
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        // Opción 2: Nadie está logueado -> Mostrar Acceso Admin
                        <Link to="/admin/login" style={styles.adminButton}>
                            Acceso Admin
                        </Link>
                    )}
                </div>
                {/* -------------------------------------------------- */}
            </div>
        </header>
    );
};


// Estilos básicos en línea (idealmente, usar un archivo CSS)
const styles = {
    header: {
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 0',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    logo: {
        height: '50px', // Ajusta según el tamaño de tu logo
    },
    adminControls: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
    },
    adminButton: {
        backgroundColor: '#5e40c0', 
        color: 'white',
        padding: '8px 15px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
        transition: 'background-color 0.2s',
    },
    manageButton: {
        backgroundColor: '#007bff', // Azul para gestionar
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
        transition: 'background-color 0.2s',
    }
};
