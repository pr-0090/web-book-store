import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getProducts } from '../../../server/ProductApi';
import { useCart } from '../../../hooks/usecarts';
import { useWishlist } from '../../../hooks/useWishlist';
import { useUser } from '../../../hooks/useUser';
import { FaHeart, FaCheckCircle } from 'react-icons/fa';
import RelatedProducts from './RelatedProduct';
import { motion, AnimatePresence } from 'framer-motion';

// Toast Notification
function Toast({ message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 48 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 48 }}
          transition={{ duration: 0.45, type: "spring", bounce: 0.23 }}
          className="fixed z-[999] left-1/2 bottom-8 -translate-x-1/2
            bg-[#f4efe9] border-4 border-[#e8c88a] text-[#6c4c1b] rounded-3xl px-8 py-5
            flex items-center gap-5 shadow-2xl"
          style={{ backdropFilter: "blur(12px)", boxShadow: "0 4px 44px #eedda055" }}
        >
          <motion.span
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: [0, -7, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 1.25, repeat: Infinity, repeatType: "reverse" }}
            className="text-3xl"
            style={{ filter: "drop-shadow(0 4px 8px #e8c88a77)" }}
          >📚</motion.span>
          <span className="font-black text-lg tracking-wide drop-shadow-sm">{message}</span>
          <button
            onClick={onClose}
            className="ml-3 text-2xl font-black text-[#ad8b46] hover:text-[#6c4c1b] px-2 rounded-full bg-[#f9f2e7] hover:bg-[#eedda0] transition"
            aria-label="Close notification"
          >✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SingleProductComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { user } = useUser();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '' });
  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 2200);
  };

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setProduct(null);
      });
  }, [id]);

  useEffect(() => {
    getProducts()
      .then((data) => setRelated(data.filter((p) => p._id !== id)))
      .catch(() => setRelated([]));
  }, [id]);

  if (loading)
    return <div className="py-20 text-center text-lg font-bold text-gray-700 animate-pulse">Loading...</div>;
  if (!product)
    return (
      <div className="py-20 text-center text-red-600 text-xl font-bold animate-pulse">Book not found.</div>
    );

  // Prepare images
  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : [product.imageUrl || 'https://via.placeholder.com/400x400'];

  // --- Animation Variants
  const imgAnim = {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.94 }
  };

  // --- Add to Cart Handler
  const handleAddToCart = () => {
    if (!user || !user.id) {
      showToast('Please login to add to cart.');
      return;
    }
    addToCart(
      {
        _id: product._id,
        productName: product.title,
        productImage: images[imgIndex],
        price: product.price,
        author: product.author,
      },
      qty
    );
    showToast('Book added to cart!');
  };

  // --- Add to Wishlist Handler (Context takes care of userId)
  const handleAddWishlist = async () => {
    if (!user || !user.id) {
      showToast('Please login to add to wishlist.');
      return;
    }
    try {
      await addToWishlist(product._id); // Only product._id!
      showToast('Book added to wishlist!');
    } catch (err) {
      showToast(
        err?.message === "Product already in wishlist."
          ? "Book already in wishlist!"
          : "Failed to add to wishlist."
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-3">
      {/* Breadcrumb */}
      <motion.nav
        className="text-sm flex flex-wrap gap-1 mb-6 tracking-wide"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button onClick={() => navigate('/home')} className="font-bold text-[#16e087] hover:underline underline-offset-4 transition">Home</button>
        <span>&gt;</span>
        <button onClick={() => navigate('/shop')} className="font-bold text-[#16e087] hover:underline underline-offset-4 transition">Shop</button>
        <span>&gt;</span>
        <span className="font-bold text-black">{product.title}</span>
      </motion.nav>

      <div className="flex flex-col md:flex-row gap-14">
        {/* --- GALLERY --- */}
        <div className="flex-1 flex flex-col gap-6">
          <motion.div
            className="rounded-2xl bg-white border-4 border-[#f2fdfa] shadow-xl p-2 min-h-[320px] flex items-center justify-center"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={imgAnim}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={images[imgIndex]}
                src={images[imgIndex]}
                alt={product.title}
                className="max-h-[390px] object-contain rounded-xl transition-all duration-400 shadow-2xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>
          <div className="flex gap-3 mt-3 justify-center overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`${product.title} ${idx + 1}`}
                whileHover={{ scale: 1.12, boxShadow: "0 4px 18px #16e08755" }}
                className={`w-16 h-16 object-contain rounded-xl border cursor-pointer transition
                  ${idx === imgIndex
                    ? 'border-[#16e087] ring-4 ring-[#16e08788]'
                    : 'border-gray-300'
                  }`}
                style={{
                  background: idx === imgIndex ? "linear-gradient(90deg,#e7fcf4,#f2fff9)" : ""
                }}
                onClick={() => setImgIndex(idx)}
                tabIndex={0}
              />
            ))}
          </div>
        </div>

        {/* --- BOOK DETAILS --- */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-gray-400 text-sm mb-2 tracking-wide font-semibold">{product.genre}</div>
          <h1 className="text-3xl sm:text-4xl font-black mb-2 text-black drop-shadow"> {product.title} </h1>
          <div className="text-lg font-medium text-[#39745A] mb-1">by {product.author}</div>
          <div className="text-2xl font-bold text-black mb-1 tracking-wide">
            NPR {product.price.toLocaleString()}
          </div>
          <div className="text-gray-500 text-xs mb-3">Published: {product.publishedYear || "N/A"} | {product.language}</div>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[#16e087] flex items-center gap-1 font-bold">
              <FaCheckCircle /> In Stock
            </span>
            <span className="text-xs text-gray-400">({product.stock} available)</span>
          </div>

          <div className="flex items-center gap-2 mb-8">
            <span className="font-bold text-black text-lg">Qty</span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              className="border-2 rounded-lg px-3 py-1 text-lg font-black disabled:opacity-50 bg-white border-[#16e087] text-black shadow"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
            >
              −
            </motion.button>
            <span className="px-3 text-xl font-bold text-black">{qty}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="border-2 rounded-lg px-3 py-1 text-lg font-black disabled:opacity-50 bg-white border-[#16e087] text-black shadow"
              onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              disabled={qty >= product.stock}
            >
              ＋
            </motion.button>
          </div>

          <div className="flex gap-5 mb-9 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 4px 16px #00b97d33" }}
              whileTap={{ scale: 0.97 }}
              className="bg-black text-white px-10 py-3 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#0f1f16] transition"
              onClick={handleAddToCart}
            >
              Add to cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#e6f8f1" }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-[#16e087] px-7 py-3 rounded-2xl flex items-center gap-3 font-bold text-black bg-white hover:text-[#16e087] transition shadow-lg"
              onClick={handleAddWishlist}
            >
              <FaHeart className="text-[#16e087] text-xl" /> Add to wishlist
            </motion.button>
          </div>
        </div>
      </div>

      {/* --- DESCRIPTION --- */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <h2 className="text-2xl font-bold mb-5 text-black">Book Description</h2>
        <p className="text-gray-700 text-lg leading-7 mb-8 whitespace-pre-line font-medium">
          {product.description}
        </p>
        {/* Extra book info */}
        <div className="grid md:grid-cols-2 gap-5">
          {product.ISBN && (
            <div className="bg-[#f7fcfa] border-2 border-[#e3f5ed] rounded-xl px-6 py-4 text-black shadow font-medium">
              <span className="font-extrabold text-[#16e087]">ISBN:</span>
              <span className="ml-2">{product.ISBN}</span>
            </div>
          )}
          {product.publisher && (
            <div className="bg-[#f7fcfa] border-2 border-[#e3f5ed] rounded-xl px-6 py-4 text-black shadow font-medium">
              <span className="font-extrabold text-[#16e087]">Publisher:</span>
              <span className="ml-2">{product.publisher}</span>
            </div>
          )}
          {product.pages && (
            <div className="bg-[#f7fcfa] border-2 border-[#e3f5ed] rounded-xl px-6 py-4 text-black shadow font-medium">
              <span className="font-extrabold text-[#16e087]">Pages:</span>
              <span className="ml-2">{product.pages}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* --- RELATED PRODUCTS --- */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <RelatedProducts allProducts={related} currentProduct={product} />
      </motion.div>

      {/* --- TOAST --- */}
      <Toast
        message={toast.show ? toast.message : ""}
        onClose={() => setToast({ ...toast, show: false })}
        key={toast.show ? "on" : "off"}
      />
    </div>
  );
}
