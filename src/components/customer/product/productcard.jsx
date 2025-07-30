import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../../hooks/useWishlist.jsx";
import { useCart } from "../../../hooks/usecarts.jsx";
import { useUser } from "../../../hooks/useUser.jsx";

// Book-themed Toast (bottom right)
function Toast({ message, onClose }) {
  return (
    <div
      className="
        fixed z-50 bottom-6 right-6
        bg-white/90 backdrop-blur-lg border border-[#B3EFD9] text-[#00754A]
        rounded-2xl px-7 py-3 flex items-center gap-3 shadow-2xl animate-fade-in
        font-semibold max-w-xs
      "
    >
      <span
        className="text-xl"
        style={{ filter: "drop-shadow(0 0 7px #b3efd933)" }}
        aria-label="book"
      >📚</span>
      <span className="font-semibold text-[15px]">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-xl font-bold text-[#00754A] hover:text-green-600 px-2"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useUser();

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["https://via.placeholder.com/180?text=No+Image"];

  const [imgIndex, setImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [redirectTimer, setRedirectTimer] = useState(null);

  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 1100);
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  useEffect(() => {
    if (isHovered) return;
    const timeout = setTimeout(() => setImgIndex(0), 500);
    return () => clearTimeout(timeout);
  }, [isHovered]);

  const handleImageClick = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
  };

  // FIXED: Only send product._id!
  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!user || !user.id) {
      showToast("Please login to add to wishlist.");
      return;
    }
    try {
      await addToWishlist(product._id); // Only productId!
      showToast("Added to wishlist!");
      setTimeout(() => setToast({ show: false, message: "" }), 2200);
    } catch (err) {
      showToast(
        err?.message === "Product already in wishlist."
          ? "Already in wishlist!"
          : "Failed to add to wishlist."
      );
      setTimeout(() => setToast({ show: false, message: "" }), 2200);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user) {
      showToast("You need to login. Redirecting to login page...");
      const timer = setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
      setRedirectTimer(timer);
      return;
    }
    try {
      await addToCart(
        {
          ...product,
          productName: product.title,
          productImage: images[imgIndex],
        },
        1
      );
      showToast("Added to cart!");
      setTimeout(() => setToast({ show: false, message: "" }), 2200);
    } catch (err) {
      console.error(err);
      showToast("Failed to add to cart.");
      setTimeout(() => setToast({ show: false, message: "" }), 2200);
    }
  };

  const handleCloseToast = () => {
    setToast({ show: false, message: "" });
    if (redirectTimer) {
      clearTimeout(redirectTimer);
      setRedirectTimer(null);
    }
  };

  return (
    <>
      <div
        className={`
          group cursor-pointer relative flex flex-col items-center
          bg-white/95 backdrop-blur-xl border border-[#B3EFD9]
          shadow-2xl rounded-3xl px-4 pt-4 pb-6 mb-3
          transition-all duration-300
          hover:scale-[1.024] hover:shadow-[0_8px_36px_0_rgba(0,117,74,0.18)]
          hover:bg-white
        `}
        onClick={() => navigate(`/product/${product._id}`)}
        style={{
          minWidth: 210,
          minHeight: 310,
          boxShadow:
            "0 4px 36px 0 rgba(0,117,74,0.10), 0 1.5px 14px 0 rgba(30,50,60,0.09)",
        }}
      >
        {/* Icons container */}
        <div className="absolute top-4 right-4 flex flex-col gap-[5px]">
          {/* Wishlist (Book/Heart) Button */}
          <button
            className={`
              w-10 h-10 rounded-full bg-white/95 shadow
              flex items-center justify-center
              border border-[#B3EFD9]
              transition-all duration-200
              text-[#00754A] hover:text-white
              hover:bg-[#00754A] hover:scale-110
              group-hover:shadow-xl
              z-10
            `}
            onClick={handleWishlist}
            aria-label="Add to wishlist"
          >
            <span className="text-lg" style={{ filter: "drop-shadow(0 0 6px #b3efd933)" }}>
              ♥
            </span>
          </button>
          {/* Cart Button */}
          <button
            className={`
              w-10 h-10 rounded-full bg-white/95 shadow
              flex items-center justify-center
              border border-[#B3EFD9]
              transition-all duration-200
              text-[#00754A] hover:text-white
              hover:bg-[#00754A] hover:scale-110
              group-hover:shadow-xl
              z-10
            `}
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <span className="text-lg">🛒</span>
          </button>
        </div>

        {/* Image Box */}
        <div
          className={`
            relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden mb-3
            shadow-lg bg-gray-100 border border-[#E6EBF0]
            flex items-center justify-center
            transition-all duration-200
            group-hover:shadow-[0_6px_18px_0_rgba(0,117,74,0.18)]
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleImageClick}
        >
          <img
            src={images[imgIndex]}
            alt={product.title}
            className="
              w-full h-full object-cover
              transition-all duration-300
              group-hover:scale-105 group-hover:brightness-105
              rounded-2xl
            "
            style={{ background: "#f5f5f5" }}
          />
        </div>

        {/* Book Title */}
        <span className="font-bold text-base sm:text-lg mb-0.5 text-black tracking-tight line-clamp-1">
          {product.title}
        </span>
        {/* Author */}
        <span className="text-sm sm:text-[16px] text-[#4B4B4B] mb-1 font-medium line-clamp-1">
          by {product.author}
        </span>
        {/* Genre & Year */}
        <span className="text-xs text-[#39745A] mb-1 font-semibold">
          {product.genre} {product.publishedYear ? `| ${product.publishedYear}` : ""}
        </span>
        {/* Price */}
        <span className="font-bold text-base mb-1 text-[#1D2C22] tracking-tight">
          NPR {product.price?.toLocaleString()}
        </span>
        {/* Description */}
        <span className="text-xs sm:text-sm text-gray-700 text-center mb-2 mt-1 line-clamp-2">
          {product.description}
        </span>

        {/* View Details Button */}
        <button
          className="
            mt-3 px-5 py-2 bg-[#00754A] text-white rounded-full font-semibold shadow
            transition-all duration-200 hover:shadow-2xl hover:scale-105
            text-[15px] tracking-wide
          "
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product._id}`);
          }}
        >
          View Details
        </button>
      </div>

      {/* Global Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
};

export default ProductCard;
