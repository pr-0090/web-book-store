import axios from "axios";
const WISHLIST_API_BASE_URL = "http://localhost:8080/api/wishlist";

// Helper to fetch userId
const getUserId = (providedId) => providedId || localStorage.getItem("userId");

// ------- GET wishlist (returns: [{ productId, productName, productImage, price, ... }])
export const getWishlistApi = async (userId) => {
  userId = getUserId(userId);
  if (!userId) throw new Error("No userId for getWishlistApi");
  try {
    const response = await axios.get(`${WISHLIST_API_BASE_URL}/${userId}`);
    // Response: { wishlist: [...] }
    return response.data.wishlist;
  } catch (error) {
    console.error("[API] Error in getWishlistApi:", error);
    throw error;
  }
};

// ------- ADD to wishlist (productId required, returns updated wishlist)
export const addToWishlistApi = async (userId, productId) => {
  userId = getUserId(userId);
  if (!userId) throw new Error("No userId for addToWishlistApi");
  try {
    const response = await axios.post(`${WISHLIST_API_BASE_URL}/add`, {
      userId,
      productId,
    });
    // Response: { wishlist: [...] }
    return response.data.wishlist;
  } catch (error) {
    // Handles "already in wishlist" as error
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    console.error("[API] Error in addToWishlistApi:", error);
    throw error;
  }
};

// ------- REMOVE from wishlist (productId required, returns updated wishlist)
export const removeFromWishlistApi = async (userId, productId) => {
  userId = getUserId(userId);
  if (!userId) throw new Error("No userId for removeFromWishlistApi");
  try {
    const response = await axios.post(`${WISHLIST_API_BASE_URL}/remove`, {
      userId,
      productId,
    });
    // Response: { wishlist: [...] }
    return response.data.wishlist;
  } catch (error) {
    console.error("[API] Error in removeFromWishlistApi:", error);
    throw error;
  }
};

// ------- CLEAR wishlist (returns empty wishlist)
export const clearWishlistApi = async (userId) => {
  userId = getUserId(userId);
  if (!userId) throw new Error("No userId for clearWishlistApi");
  try {
    const response = await axios.post(`${WISHLIST_API_BASE_URL}/clear`, { userId });
    // Response: { wishlist: [] }
    return response.data.wishlist;
  } catch (error) {
    console.error("[API] Error in clearWishlistApi:", error);
    throw error;
  }
};
