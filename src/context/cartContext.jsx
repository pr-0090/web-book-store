import React, { createContext, useState, useEffect, useContext } from "react";
import {
  addToCartApi,
  getCartApi,
  removeFromCartApi,
  updateCartItemApi,
  clearCartApi
} from "../server/cartApi.jsx";
import { UserContext } from "./userContext.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState({ items: [] });

  // Get current user id from UserContext
  const getUserId = () => user?.id;

  // Always fetch cart on login (or when user changes)
  useEffect(() => {
    const uid = getUserId();
    if (!uid) {
      setCart({ items: [] });
      return;
    }
    getCartApi(uid)
      .then(items => setCart({ items }))
      .catch(() => setCart({ items: [] }));
  }, [user]);

  // Add/increment
  const addToCart = async (product, qty = 1) => {
    const uid = getUserId();
    if (!uid) throw new Error("User not logged in");
    const items = await addToCartApi(uid, product, qty);
    setCart({ items });
  };

  // Remove entirely
  const removeFromCart = async (productId) => {
    const uid = getUserId();
    if (!uid) throw new Error("User not logged in");
    const items = await removeFromCartApi(uid, productId);
    setCart({ items });
  };

  // Clear all
  const clearCart = async () => {
    const uid = getUserId();
    if (!uid) throw new Error("User not logged in");
    const items = await clearCartApi(uid);
    setCart({ items });
  };

  // Set exact quantity (or remove if <1)
  const updateItemQuantity = async (productId, qty) => {
    if (qty < 1) return removeFromCart(productId);
    const uid = getUserId();
    if (!uid) throw new Error("User not logged in");
    const items = await updateCartItemApi(uid, productId, qty);
    setCart({ items });
  };

  // Convenience
  const incrementItem = (id) => {
    const i = cart.items.find(x => x.productId === id);
    if (i) updateItemQuantity(id, i.quantity + 1);
  };
  const decrementItem = (id) => {
    const i = cart.items.find(x => x.productId === id);
    if (i) updateItemQuantity(id, i.quantity - 1);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateItemQuantity,
        incrementItem,
        decrementItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
