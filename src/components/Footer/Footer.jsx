import { Link } from "react-router-dom";*/
export const Footer = () => {
    return (
        <footer>
            <div style={{ padding: '10px', textAlign: 'center', backgroundColor: '#eee' }}>
                <Link to="/admin/login" style={{ color: 'blue', fontWeight: 'bold' }}>
                    [BOTÓN DE PRUEBA: ACCESO ADMIN]
                </Link>
            </div>
            <p>Pagina creada dentro del proyecto React25232</p>
        </footer>
    );
};
