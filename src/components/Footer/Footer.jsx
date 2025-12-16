export const Footer = () => {
    return (
        <footer>
            {/* ... Contenido normal del footer ... */}
            
            {/* ENLACE DE PRUEBA: ELIMINAR DESPUÉS */}
            <div style={{ padding: '10px', textAlign: 'center', backgroundColor: '#eee' }}>
                <Link to="/admin/login" style={{ color: 'blue', fontWeight: 'bold' }}>
                    [BOTÓN DE PRUEBA: ACCESO ADMIN]
                </Link>
            </div>
        </footer>
    );
};
/*export const Footer = () => {
  return (
    <footer>
      <p>Pagina creada dentro del proyecto React25232</p>
    </footer>
  );
};
import { Link } from "react-router-dom";*/
