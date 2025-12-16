import { BrowserRouter, Routes, Route } from "react-router-dom";
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
// ^^^ Asegúrate que la ruta de importación sea correcta.

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Header />
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
            
            {/* RUTA PROTEGIDA (La lógica de protección irá dentro de ProductFormContainer) */}
            <Route path="/admin" element={<ProductFormContainer />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
