import { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cambiamos la logica de las funciones SI usamos el Count para agregar "cantidad"

  const exists = (id) => {
    const exist = cart.some((p) => p.id === id);
    return exist;
  };

  /* -------------------------------------------------------------------------- */
  /*                         Agregamos map y spread, AHORA CON CONTROL DE STOCK                            */
  /* -------------------------------------------------------------------------- */
  const addItem = (item) => {
    // item debe contener: { id, name, price, stock, quantity: cantidad a agregar }

    if (exists(item.id)) {
      // Lógica para producto EXISTENTE
      
      const existingProduct = cart.find(prod => prod.id === item.id);
      const currentQuantity = existingProduct.quantity;
      const requestedQuantity = item.quantity;
      const totalQuantityAfterAddition = currentQuantity + requestedQuantity;
      const stockAvailable = item.stock; 

      /* === CONTROL DE STOCK PARA PRODUCTOS EXISTENTES === */
      if (totalQuantityAfterAddition > stockAvailable) {
        alert(`¡Stock insuficiente! Solo quedan ${stockAvailable} unidades de ${item.name} en total.`);
        return; // Detiene la adición
      }
      /* ================================================= */

      // map, cuido mutacion a nivel del array
      const updatedCart = cart.map((prod) => {
        if (prod.id === item.id) {
          // cuido mutacion a nivel de objeto
          return { ...prod, quantity: totalQuantityAfterAddition };
        } else {
          return prod;
        }
      });
      setCart(updatedCart);
      alert(`Agregado al carrito`);
    } else {
      // Lógica para producto NUEVO
      
      const requestedQuantity = item.quantity;
      const stockAvailable = item.stock;

      /* === CONTROL DE STOCK PARA PRODUCTOS NUEVOS === */
      if (requestedQuantity > stockAvailable) {
        alert(`¡Stock insuficiente! Solo quedan ${stockAvailable} unidades de ${item.name}.`);
        return; // Detiene la adición
      }
      /* ============================================== */

      setCart([...cart, item]);
      alert(`${item.name} agregado`);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                         Eliminar producto con filter                        */
  /* -------------------------------------------------------------------------- */
  const deleteItem = (id) => {
    const filtered = cart.filter((p) => p.id !== id);
    setCart(filtered);
    alert("Producto eliminado");
  };

  /* -------------------------------------------------------------------------- */
  /*                                Vaciar carrito                               */
  /* -------------------------------------------------------------------------- */
  const clearCart = () => {
    setCart([]);
  };

  /* -------------------------------------------------------------------------- */
  /*                     Calcular total de ítems en el carrito                   */
  /* -------------------------------------------------------------------------- */
  const getTotalItems = () => {
    const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);
    return totalItems;
  };

  /* -------------------------------------------------------------------------- */
  /*                                Calcular total                               */
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
