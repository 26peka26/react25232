import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Credenciales del administrador
    const ADMIN_USER_1 = 'admin';
    const ADMIN_USER_2 = 'admin@example.com';
    const ADMIN_PASS = '1234';

    if ((username === ADMIN_USER_1 || username === ADMIN_USER_2) && password === ADMIN_PASS) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      alert('¡Acceso concedido! Bienvenido Administrador.');
      navigate('/admin');
    } else {
      alert('Credenciales incorrectas. Inténtelo de nuevo.');
      setPassword('');
    }
  };

  return (
    <div style={styles.backgroundContainer}>
      <div style={styles.card}>
        
        {/* Encabezado similar al de la imagen */}
        <div style={styles.header}>
          {/* Aquí iría la imagen del gato o un ícono */}
          <div style={styles.iconPlaceholder}>🐱</div> 
          <div>
            <h1 style={styles.title}>Ingresar al Panel</h1>
            <p style={styles.subtitle}>Área para administradores autorizados de cómics.</p>
          </div>
        </div>

        {/* Banner de credenciales de DEMO */}
        <div style={styles.demoBanner}>
            Usuario: <b>admin</b> o <b>admin@example.com</b> · Contraseña: <b>1234</b>
        </div>
        
        <form onSubmit={handleLogin}>
          
          {/* Input de Usuario */}
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin o admin@example.com"
              required
              style={styles.input}
            />
          </div>
          
          {/* Input de Contraseña */}
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Contraseña</label>
            <div style={styles.passwordContainer}>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                required
                style={styles.input}
              />
              {/* Icono de ojo simulado */}
              <span style={styles.eyeIcon}>👁️</span>
            </div>
          </div>
          
          {/* Botón de Ingresar */}
          <button type="submit" style={styles.button}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};


// Estilos para recrear el look and feel de la imagen
const styles = {
    backgroundContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f1f1f9', // Fondo ligero
    },
    card: {
        padding: '30px',
        border: '1px solid #e0e0e0',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        backgroundColor: '#fff',
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    iconPlaceholder: {
        fontSize: '32px',
        marginRight: '15px',
    },
    title: {
        margin: 0,
        fontSize: '24px',
        fontWeight: '700',
        color: '#333',
    },
    subtitle: {
        margin: 0,
        fontSize: '14px',
        color: '#666',
    },
    demoBanner: {
        backgroundColor: '#f3f0ff',
        color: '#5e40c0',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '14px',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#444',
    },
    passwordContainer: {
        position: 'relative',
    },
    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxSizing: 'border-box',
        fontSize: '16px',
    },
    eyeIcon: {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#999',
    },
    button: {
        padding: '14px 15px',
        backgroundColor: '#5e40c0', // Tono violeta de la imagen
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: '600',
        width: '100%',
        transition: 'background-color 0.2s',
    }
};

// Estilos básicos en línea para una mejor visualización inmediata
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f8f8f8',
    },
    form: {
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    }
};

