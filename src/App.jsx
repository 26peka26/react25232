import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { CartProvider } from "./context/CartContext/CartProvider";
import { Cart } from "./components/Cart/Cart";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer/ProductFormContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Header />
          {/* Dejamos fuera del Routes lo que queremos que no se vuelva a renderizar al navegar */}
          <Routes>
            <Route
              path="/"
              element={<ItemListContainer titulo={"Bienvenidos a COMIc STORE"} />}
            />
            <Route
              path="/category/:category"
              element={<ItemListContainer titulo={"Bienvenidos CS"} />}
            />
            <Route path="/detail/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/admin" element={<ProductFormContainer />} />
          </Routes>
          {/* Dejamos fuera del Routes lo que queremos que no se vuelva a renderizar al navegar */}
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
