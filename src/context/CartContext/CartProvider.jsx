import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // La función 'exists' ahora es redundante ya que usamos 'find' en addItem,
  // pero la mantenemos si se usa en otros lugares.
  const exists = (id) => {
    const exist = cart.some((p) => p.id === id);
    return exist;
  };

  /* -------------------------------------------------------------------------- */
  /*            Agregamos map y spread, AHORA CON CONTROL DE STOCK              */
  /* -------------------------------------------------------------------------- */
  const addItem = (item) => {
    // ASUMIMOS que 'item' trae { id, name, price, stock, quantity: cantidad_a_agregar }
    
    // 1. Buscamos si el producto ya está en el carrito
    const existingProduct = cart.find(prod => prod.id === item.id);
    const stockAvailable = item.stock; // Stock total del producto (del JSON)

    if (existingProduct) {
      // === ESCENARIO 1: EL PRODUCTO YA ESTÁ EN EL CARRITO ===

      const currentQuantity = existingProduct.quantity;
      const requestedQuantity = item.quantity;
      const totalQuantityAfterAddition = currentQuantity + requestedQuantity;

      /* === CONTROL DE STOCK === */
      if (totalQuantityAfterAddition > stockAvailable) {
        alert(`¡Stock insuficiente! Solo quedan ${stockAvailable} unidades de ${item.name} en total.`);
        return; // Detiene la adición
      }
      /* ======================== */

      // Si el stock es suficiente, actualiza la cantidad
      const updatedCart = cart.map((prod) => {
        if (prod.id === item.id) {
          return { ...prod, quantity: totalQuantityAfterAddition };
        } else {
          return prod;
        }
      });
      setCart(updatedCart);
      alert(`Agregado al carrito`);

    } else {
      // === ESCENARIO 2: EL PRODUCTO ES NUEVO EN EL CARRITO ===
      
      const requestedQuantity = item.quantity;

      /* === CONTROL DE STOCK === */
      if (requestedQuantity > stockAvailable) {
        alert(`¡Stock insuficiente! Solo quedan ${stockAvailable} unidades de ${item.name}.`);
        return; // Detiene la adición
      }
      /* ======================== */

      // Si el stock es suficiente, agrega el nuevo producto
      setCart([...cart, item]);
      alert(`${item.name} agregado`);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                         Eliminar producto con filter                       */
  /* -------------------------------------------------------------------------- */
  const deleteItem = (id) => {
    const filtered = cart.filter((p) => p.id !== id);
    setCart(filtered);
    alert("Producto eliminado");
  };

  /* -------------------------------------------------------------------------- */
  /*                                Vaciar carrito                              */
  /* -------------------------------------------------------------------------- */
  const clearCart = () => {
    setCart([]);
  };

  /* -------------------------------------------------------------------------- */
  /*                     Calcular total de ítems en el carrito                  */
  /* -------------------------------------------------------------------------- */
  const getTotalItems = () => {
    const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);
    return totalItems;
  };

  /* -------------------------------------------------------------------------- */
  /*                                Calcular total                              */
  /* -------------------------------------------------------------------------- */
  const total = () => {
    const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

    return Math.round(total * 100) / 100;
  };

  const checkout = () => {
    const ok = confirm("¿Seguro que quiere finalizar la compra?");

    if (ok) {
      alert("¡Compra realizada con éxito!");
      clearCart();
    }
  };

  const values = {
    cart,
    addItem,
    clearCart,
    getTotalItems,
    deleteItem,
    total,
    checkout,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
