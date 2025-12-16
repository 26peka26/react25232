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
        // El Header necesita ser relative para que los botones se posicionen respecto a él
        <header style={styles.header}> 
            <div style={styles.container}>
                {/* 1. Logo */}
                <Link to={"/"} style={styles.link}>
                    <img src={logo} alt="Logo" className="header-logo" style={styles.logo} />
                </Link>
                
                {/* 2. Navegación (Su CSS puede ser el problema, lo dejamos solo) */}
                <Nav />
                
                {/* 3. Controles con Posición Absoluta (Aislando el conflicto) */}
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


// Estilos para forzar el layout y asegurar la visibilidad
const styles = {
    header: {
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 0',
        zIndex: 1000, 
        position: 'relative', // CRUCIAL para que los hijos absolutos funcionen correctamente
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        // Ya no necesitamos flexbox aquí, ya que los admin controls son absolutos
        display: 'flex', 
        justifyContent: 'flex-start', // Dejamos que el Nav y el Logo se organicen
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
        transform: 'translateY(-50%)', // Ajusta para el centro perfecto
        display: 'flex',
        gap: '10px',
        zIndex: 1001, // Asegura que esté por encima de cualquier otro elemento del header
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
