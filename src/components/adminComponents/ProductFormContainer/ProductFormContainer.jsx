import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { ProductFormUI } from "../ProductFormUI/ProductFormUI";
import { validateProduct } from "../../../utils/validateProducts";
import { uploadToImgbb } from "../../../services/uploadImage";
import { createProduct } from "../../../services/products";

import "../ProductFormContainer/ProductFormContainer.css";

export const ProductFormContainer = () => {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [loading, setLoading] = useState(false); // Inicializar en false
  const [errors, setErrors] = useState({}); // Inicializar como objeto vacío
  const [file, setFile] = useState(null);
  
  // AÑADIR EL CAMPO 'stock' AL ESTADO INICIAL
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "", // <-- ¡Nuevo campo de stock!
  });

  // -----------------------------------------------------
  // 1. LÓGICA DE PROTECCIÓN DE RUTA
  // -----------------------------------------------------
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert("Acceso no autorizado. Por favor, inicie sesión.");
      navigate('/admin/login'); // Redirige si no está logueado
    }
  }, [navigate]);
  // -----------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si el campo es 'price' o 'stock', convierte a string para mantener la funcionalidad de input
    // (Luego se convierte a Number en handleSubmit)
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Incluir 'stock' en la validación
    const newErrors = validateProduct({ ...product, file });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadToImgbb(file);
      
      // 2. CONVERTIR 'price' y 'stock' A NÚMERO
      const productData = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock), // <-- ¡Convertir stock a número!
        imageUrl,
      };

      await createProduct(productData);
      alert("Producto cargado con exito");

      // Limpiar el formulario y resetear el estado
      setProduct({ name: "", price: "", category: "", description: "", stock: "" }); 
      setFile(null);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };
  
  // -----------------------------------------------------
  // 3. FUNCIÓN PARA CERRAR SESIÓN
  // -----------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/'); // Redirige a la página principal
  };
  // -----------------------------------------------------
  
  // Muestra un mensaje de carga/redirección si no está logueado
  if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
      return <div style={{textAlign: 'center', padding: '50px'}}>Verificando acceso...</div>; 
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Carga de Productos (ADMIN)</h1>
      
      {/* Botón de Cerrar Sesión */}
      <button onClick={handleLogout} style={{ marginBottom: '20px', padding: '10px', background: 'red', color: 'white', border: 'none' }}>
        Cerrar Sesión
      </button>

      {/* ProductFormUI debe poder manejar el campo 'stock' en su renderizado */}
      <ProductFormUI
        product={product}
        errors={errors}
        onChange={handleChange}
        onFileChange={setFile}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
