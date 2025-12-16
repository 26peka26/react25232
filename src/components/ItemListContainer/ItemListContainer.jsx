import React, { useState, useEffect } from 'react';
import ItemList from '../components/ItemList/ItemList';
import { useParams } from 'react-router-dom';

// 💡 Importa tu servicio de productos que se conecta a Firebase/Base de datos
// Asegúrate de cambiar la ruta si tu archivo está en otro lugar.
import { getProducts } from '../services/productService'; 

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams(); // Para obtener el parámetro de la URL (si existe)

    useEffect(() => {
        // 1. Inicia el estado de carga
        setLoading(true);
        setProducts([]);

        // 2. Llama a tu función de servicio, pasando la categoría para filtrar.
        // Si categoryId es undefined, getProducts debe traer todos los productos.
        getProducts(categoryId)
            .then(data => {
                // 3. Cuando la promesa se resuelve, actualiza el estado con los productos
                setProducts(data);
            })
            .catch(error => {
                console.error("Error al cargar los productos:", error);
                // Opcional: Mostrar un mensaje de error en la UI si la carga falla
            })
            .finally(() => {
                // 4. Finaliza el estado de carga
                setLoading(false);
            });
            
    // 5. El efecto se ejecuta cada vez que categoryId cambia (para cambiar de vista, ej: /category/electronics)
    }, [categoryId]); 

    // Muestra un indicador de carga mientras los datos están siendo buscados
    if (loading) {
        return (
            <div className="container mt-5">
                <p>Cargando productos de la tienda...</p>
                {/* Opcional: Añadir un spinner o componente de carga */}
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1>{categoryId ? `Categoría: ${categoryId.toUpperCase()}` : 'Todos nuestros productos'}</h1>
            {products.length === 0 && !loading ? (
                <p>No hay productos disponibles en esta sección.</p>
            ) : (
                <ItemList products={products} />
            )}
        </div>
    );
};

export default ItemListContainer;
