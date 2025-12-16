import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Credenciales del administrador: admin y 1234
    const ADMIN_USER = 'admin';
    const ADMIN_PASS = '1234';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // 1. Guardar el estado de login para proteger las rutas
      localStorage.setItem('isAdminLoggedIn', 'true'); 
      alert('Bienvenido Administrador. Acceso concedido.');
      
      // 2. Redirigir al panel de administración
      navigate('/admin'); 
    } else {
      alert('Credenciales incorrectas. Inténtelo de nuevo.');
      setPassword(''); // Limpia la contraseña
    }
  };

  return (
    <div className="admin-login-container" style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Acceso de Administrador</h2>
        
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>Usuario (admin):</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Contraseña (1234):</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        
        <button type="submit" style={styles.button}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
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

