import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useWishlist } from "../../../hooks/useWishlist.jsx";
import { useCart } from "../../../hooks/usecarts.jsx";

// Toast for notification
function Toast({ message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.28 }}
          className="
            fixed z-50 left-1/2 bottom-8 sm:bottom-10 sm:right-12 sm:left-auto
            -translate-x-1/2 sm:translate-x-0
            bg-yellow-100 border border-yellow-300 text-yellow-900 rounded-2xl px-6 py-3
            flex items-center gap-3 shadow-2xl
            backdrop-blur-xl animate-fade-in
          "
        >
          {/* Book icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" className="text-yellow-700">
            <rect x="3" y="5" width="18" height="14" rx="2" fill="#F7E6A2" />
            <path
              d="M7 8h10M7 12h6"
              stroke="#A07911"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="font-semibold text-[16px]">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-lg font-bold text-yellow-900 hover:text-yellow-700 px-2"
            aria-label="Close notification"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function WishlistSection() {
  const navigate = useNavigate();
  const { items, removeFromWishlist, fetchWishlist, loading } = useWishlist();
  const { addToCart } = useCart();
  const [toast, setToast] = useState(null);

  // Always fetch wishlist on mount and when fetchWishlist changes
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Defensive: always use safeItems as array
  const safeItems = Array.isArray(items) ? items : [];

  // Remove from wishlist
  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    setToast("Removed from wishlist");
    setTimeout(() => setToast(null), 1800);
  };

  // Add to cart (and remove from wishlist)
  const handleAddToCart = (item) => {
    addToCart({
      _id: item.productId,
      productName: item.productName, // use correct property
      price: item.price,
      productImage: item.productImage,
    }, 1);
    removeFromWishlist(item.productId);
    setToast("Added to cart");
    setTimeout(() => setToast(null), 1800);
  };

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const itemAnim = {
    hidden: { opacity: 0, y: 32, scale: 0.95 },
    show:   { opacity: 1, y: 0,   scale: 1, transition: { type: 'spring', stiffness: 180 } }
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-2 sm:px-4">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-5 flex items-center gap-1 select-none">
        <button onClick={() => navigate("/home")} className="hover:underline font-semibold">Home</button>
        <span>&gt;</span>
        <span className="font-semibold text-[#2D3748]">Wishlist</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black mb-8 text-gray-900 tracking-tight">
        Your Wishlist
      </h1>

      {loading ? (
        <div className="py-20 text-center text-yellow-700 font-bold text-xl animate-pulse">Loading wishlist...</div>
      ) : safeItems.length === 0 ? (
        <div className="py-20 text-center text-gray-400 select-none">
          <p className="text-2xl mb-4 font-semibold">Your wishlist is empty</p>
          <motion.button
            onClick={() => navigate("/shop")}
            whileHover={{ scale: 1.06, backgroundColor: "#38B2AC" }}
            className="
              inline-block px-7 py-3 bg-[#00754A] text-white
              rounded-full font-bold shadow-xl
              transition-transform
              tracking-wide text-lg
            "
          >
            Browse Products
          </motion.button>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7"
        >
          <AnimatePresence>
            {safeItems.map((item) => (
              <motion.div
                key={item.productId}
                variants={itemAnim}
                exit={{ opacity: 0, scale: 0.9, y: 24 }}
                className="
                  group bg-white rounded-3xl overflow-hidden
                  border border-gray-200 shadow-lg hover:shadow-2xl
                  transition-all duration-200 relative cursor-pointer
                  flex flex-col
                "
                style={{ minHeight: 365 }}
              >
                {/* Image */}
                <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center rounded-t-3xl overflow-hidden relative shadow">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover object-center transition group-hover:scale-105 duration-300"
                    style={{ minHeight: 180, maxHeight: 230, aspectRatio: "4/3", borderRadius: "1.5rem 1.5rem 0 0" }}
                  />
                </div>
                {/* Name & Price */}
                <div className="flex-1 flex flex-col justify-between p-5">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{item.productName}</h2>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[17px] font-bold text-[#00754A] tracking-wide">
                      NPR {item.price?.toLocaleString() ?? "0.00"}
                    </span>
                  </div>
                  {/* Action buttons */}
                  <div className="flex gap-3 mt-auto">
                    <motion.button
                      onClick={() => handleAddToCart(item)}
                      whileTap={{ scale: 0.92 }}
                      whileHover={{ scale: 1.09, backgroundColor: "#F0FFF4" }}
                      className="
                        flex-1 py-2 px-0 bg-[#f0fdfa]
                        rounded-xl border-2 border-[#00754A]/30
                        font-bold text-[#00754A] flex items-center justify-center gap-2
                        shadow hover:shadow-md hover:border-[#00754A]
                        transition-all text-base
                      "
                      aria-label="Add to cart"
                    >
                      <FiShoppingCart size={18} />
                      Add to Cart
                    </motion.button>
                    <motion.button
                      onClick={() => handleRemove(item.productId)}
                      whileTap={{ scale: 0.92 }}
                      whileHover={{ scale: 1.09, backgroundColor: "#FFF5F5" }}
                      className="
                        py-2 px-3 bg-white rounded-xl border-2 border-red-200
                        font-bold text-red-500 flex items-center justify-center
                        shadow hover:shadow-md hover:border-red-400
                        transition-all
                      "
                      aria-label="Remove from wishlist"
                    >
                      <FiTrash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </section>
  );
}
