import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // <-- Asegúrate de importar Link
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { CartProvider } from "./context/CartContext/CartProvider";
import { Cart } from "./components/Cart/Cart";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer/ProductFormContainer";

// NUEVA IMPORTACIÓN: Componente de Login
import { AdminLogin } from "./components/adminComponents/AdminLogin/AdminLogin"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Header />
          
          {/* 🛑 ENLACE DE PRUEBA DEFINITIVA: Se renderiza aquí, fuera de las Rutas. */}
          <div style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f9e0e0', border: '1px solid red' }}>
              <Link to="/admin/login" style={{ color: 'red', fontWeight: 'bold' }}>
                  [PRUEBA ADMIN: HAZ CLIC AQUÍ]
              </Link>
          </div>
          {/* ------------------------------------------------------------------- */}
          
          <Routes>
            <Route
              path="/"
              element={<ItemListContainer titulo={"Bienvenidos a COMIC STORE"} />}
            />
            <Route
              path="/category/:category"
              element={<ItemListContainer titulo={"Bienvenidos CS"} />}
            />
            <Route path="/detail/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<Cart />} />
            
            {/* === RUTA DE LOGIN DEL ADMINISTRADOR === */}
            <Route path="/admin/login" element={<AdminLogin />} /> 
            {/* ======================================= */}
            
            {/* RUTA PROTEGIDA */}
            <Route path="/admin" element={<ProductFormContainer />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
