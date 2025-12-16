import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import logo from '../../assets/logo.png';

export const Header = () => {
    const navigate = useNavigate(); 
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
            setIsAdminLoggedIn(loggedIn);
        };
        
        window.addEventListener('storage', checkLoginStatus);
        checkLoginStatus();
        return () => window.removeEventListener('storage', checkLoginStatus);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        setIsAdminLoggedIn(false); 
        navigate('/'); 
        alert('Sesión de administrador cerrada.');
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <header style={styles.header}> 
            <div style={styles.container}>
                {/* 1. Logo */}
                <Link to={"/"} style={styles.link}>
                    <img src={logo} alt="Logo" className="header-logo" style={styles.logo} />
                </Link>
                
                {/* 2. Navegación */}
                <Nav />
                
                {/* 3. Controles con Posición Absoluta (La solución de aislamiento) */}
                <div style={styles.adminControlsAbsolute}> 
                    {isAdminLoggedIn ? (
                        <>
                            <Link to="/admin" style={{ ...styles.adminButton, ...styles.manageButton }}>
                                Panel Admin
                            </Link>
                            <button onClick={handleLogout} style={styles.logoutButton}>
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <Link to="/admin/login" style={styles.adminButton}>
                            Acceso Admin
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};


// --------------------------------------------------------------------------------
// ESTILOS LIMPIOS Y CON POSICIÓN ABSOLUTA
// --------------------------------------------------------------------------------
const styles = {
    header: {
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 0',
        zIndex: 1000, 
        position: 'relative', // CRUCIAL para que los hijos absolutos funcionen
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex', 
        justifyContent: 'flex-start', // Solo para organizar Logo y Nav
        alignItems: 'center',
        padding: '0 20px',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    logo: {
        height: '50px',
    },
    // Estilo especial para forzar la visibilidad absoluta
    adminControlsAbsolute: { 
        position: 'absolute',
        right: '20px', // Lo coloca en el borde derecho del header
        top: '50%', // Centra verticalmente
        transform: 'translateY(-50%)', // Ajuste para el centro perfecto
        display: 'flex',
        gap: '10px',
        zIndex: 1001, // Asegura que esté por encima de cualquier otro elemento
        // Alto contraste de prueba para confirmación visual
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
