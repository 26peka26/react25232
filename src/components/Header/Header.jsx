import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"; // IMPORTACIONES CLAVE
import { Nav } from "../Nav/Nav";
import logo from '../../assets/logo.png';

export const Header = () => {
    // Inicializar hooks
    const navigate = useNavigate(); 
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    // 1. Lógica para verificar el estado de login y actualizar el Header
    useEffect(() => {
        const checkLoginStatus = () => {
            // Verificar el estado en localStorage
            const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
            setIsAdminLoggedIn(loggedIn);
        };
        
        // Escuchar el evento 'storage' (útil cuando se loguea/desloguea desde otra pestaña o componente)
        window.addEventListener('storage', checkLoginStatus);
        
        // Ejecutar al montar
        checkLoginStatus();

        // Limpiar el listener al desmontar
        return () => window.removeEventListener('storage', checkLoginStatus);
    }, []);

    // 2. Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        setIsAdminLoggedIn(false); // Actualiza el estado
        navigate('/'); // Redirige al inicio
        alert('Sesión de administrador cerrada.');
        // Disparar evento para actualizar otros componentes que escuchen el storage
        window.dispatchEvent(new Event('storage')); 
    };

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <Link to={"/"} style={styles.link}>
                    <img src={logo} alt="Logo de la tienda de cómics" className="header-logo" style={styles.logo} />
                </Link>
                
                <Nav />
                
                {/* 3. Botones condicionales */}
                <div style={styles.adminControls}>
                    {isAdminLoggedIn ? (
                        // El administrador está logueado -> Mostrar Cerrar Sesión y Panel
                        <>
                            {/* Enlace al Panel de Administración */}
                            <Link to="/admin" style={{ ...styles.adminButton, ...styles.manageButton }}>
                                Panel Admin
                            </Link>

                            <button onClick={handleLogout} style={styles.logoutButton}>
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        // Nadie está logueado -> Mostrar Acceso Admin
                        <Link to="/admin/login" style={styles.adminButton}>
                            Acceso Admin
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};


// Estilos rápidos en línea (puedes moverlos a un CSS si lo prefieres)
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
        padding: '0 20px',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    logo: {
        height: '50px', // Asegúrate que este valor sea el correcto para tu logo
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
        border: 'none', // Asegura que el Link parezca un botón
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
