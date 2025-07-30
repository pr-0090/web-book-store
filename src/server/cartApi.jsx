import axios from "axios";
const CART_API_BASE_URL = "http://localhost:8080/api/cart";

// Add to cart (POST) — must send all product info needed by backend
export const addToCartApi = async (userId, product, quantity) => {
  if (!userId) throw new Error("No userId for addToCartApi");
  // The payload must match your backend's expectation exactly!
  const payload = {
    userId,
    productId:   product._id,
    productName: product.title,                  // title as productName
    productImage: Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : (product.productImage || product.imageUrl || ""),
    price:       product.price,
    author:      product.author,
    quantity,
  };
  try {
    const response = await axios.post(`${CART_API_BASE_URL}/add`, payload);
    return response.data.cart; // returns array of items
  } catch (error) {
    console.error("[API] Error in addToCartApi:", error);
    throw error;
  }
};

// Get cart (GET)
export const getCartApi = async (userId) => {
  if (!userId) throw new Error("No userId for getCartApi");
  try {
    const response = await axios.get(`${CART_API_BASE_URL}/${userId}`);
    return response.data.cart; // returns array of items
  } catch (error) {
    console.error("[API] Error in getCartApi:", error);
    throw error;
  }
};

// Remove one item (POST)
export const removeFromCartApi = async (userId, productId) => {
  if (!userId) throw new Error("No userId for removeFromCartApi");
  try {
    const response = await axios.post(`${CART_API_BASE_URL}/remove`, {
      userId,
      productId,
    });
    return response.data.cart;
  } catch (error) {
    console.error("[API] Error in removeFromCartApi:", error);
    throw error;
  }
};

// Clear entire cart (POST)
export const clearCartApi = async (userId) => {
  if (!userId) throw new Error("No userId for clearCartApi");
  try {
    const response = await axios.post(`${CART_API_BASE_URL}/clear`, { userId });
    return response.data.cart;
  } catch (error) {
    console.error("[API] Error in clearCartApi:", error);
    throw error;
  }
};

// Update quantity (PATCH)
export const updateCartItemApi = async (userId, productId, quantity) => {
  if (!userId) throw new Error('No userId for updateCartItemApi');
  try {
    const { data } = await axios.patch(`${CART_API_BASE_URL}/update`, {
      userId, productId, quantity
    });
    return data.cart;
  } catch (error) {
    console.error("[API] Error in updateCartItemApi:", error);
    throw error;
  }
};
