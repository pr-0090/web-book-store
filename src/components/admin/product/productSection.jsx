import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlus, FaTrash, FaUpload, FaBook } from "react-icons/fa";
import useProduct from "../../../hooks/UseProduct";
import { createProduct, deleteProduct } from "../../../server/ProductApi";
import { uploadImagesToCloudinary } from "../../../utils/cloudinaryUploader";
import ProductCarousel from "./ProductCarousel";

const BOOK_GENRES = [
  'Fiction', 'Non-Fiction', 'Science', 'Mystery', 'Biography', 'Children', 'Fantasy', 'Romance', 'History', 'Comics', 'Other'
];

function Toast({ message, show, onClose }) {
  React.useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 2100);
    return () => clearTimeout(timer);
  }, [show, onClose]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.33 }}
          className="
            fixed z-[500] left-1/2 bottom-8
            -translate-x-1/2
            bg-green-100 border border-green-300 text-green-900
            rounded-2xl px-8 py-5
            flex items-center gap-4 shadow-xl
            font-bold text-lg backdrop-blur-xl
          "
        >
          <FaBook className="text-2xl text-green-700" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProductSection() {
  const { products, setProducts } = useProduct();
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: BOOK_GENRES[0],
    price: "",
    publishedYear: "",
    language: "",
    stock: "",
    publisher: "",
    ISBN: "",
    pages: "",
    description: "",
    images: []
  });
  const [imgFiles, setImgFiles] = useState([]);
  const fileInputRef = useRef();

  function handleImageChange(e) {
    let files = Array.from(e.target.files);
    setImgFiles(files);
    setForm((prev) => ({ ...prev, images: files }));
  }
  function handleDrop(e) {
    e.preventDefault();
    let files = Array.from(e.dataTransfer.files);
    setImgFiles(files);
    setForm((prev) => ({ ...prev, images: files }));
  }

  async function handleCreateProduct(e) {
    e.preventDefault();
    if (
      !form.title ||
      !form.author ||
      !form.genre ||
      !form.price ||
      !form.publishedYear ||
      !form.language ||
      !form.stock ||
      !form.description ||
      !imgFiles.length
    ) {
      setToast({ show: true, message: "Please fill all required fields and upload images!" });
      return;
    }
    try {
      const cloudUrls = await uploadImagesToCloudinary(imgFiles);
      const payload = {
        ...form,
        images: cloudUrls,
        price: Number(form.price),
        publishedYear: form.publishedYear,
        stock: Number(form.stock),
        pages: form.pages ? Number(form.pages) : undefined
      };
      await createProduct(payload);
      setToast({ show: true, message: "Book added to library! 📚" });
      setShowForm(false);
      setImgFiles([]);
      setForm({
        title: "",
        author: "",
        genre: BOOK_GENRES[0],
        price: "",
        publishedYear: "",
        language: "",
        stock: "",
        publisher: "",
        ISBN: "",
        pages: "",
        description: "",
        images: []
      });
      setTimeout(() => window.location.reload(), 1100);
    } catch (err) {
      setToast({ show: true, message: "Error creating book!" });
    }
  }

  async function handleDeleteProduct(productId) {
    setDeleting(productId);
    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setToast({ show: true, message: "Book deleted!" });
    } catch {
      setToast({ show: true, message: "Error deleting book" });
    }
    setDeleting(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="min-h-screen bg-gradient-to-br from-[#f6fff6] via-[#e6faf1] to-[#e9fbff] px-2 pt-10 pb-24"
    >
      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#00754A] drop-shadow tracking-tight">
          Book Management
        </h1>
        <button
          className="flex gap-2 items-center text-lg px-5 py-3 font-bold rounded-2xl bg-[#e8ffe5] hover:bg-[#c6f7d7] shadow border border-[#c8eec6] text-[#0c6836] transition focus:ring-2 focus:ring-[#a1ffce]"
          onClick={() => setShowForm((v) => !v)}
        >
          <FaPlus /> Add Book
        </button>
      </div>

      {/* --- Book Form Modal --- */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#101f33]/40 backdrop-blur-[2.5px]"
          >
            <motion.form
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 border-2 border-[#e3f5ed] flex flex-col gap-6 relative"
              onSubmit={handleCreateProduct}
            >
              <h2 className="text-2xl font-extrabold text-[#00754A] mb-1">
                Add New Book
              </h2>
              <div className="text-[#26323c]/70 font-semibold mb-2 text-base">
                Fill all required fields.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" className="input" placeholder="Title" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                <input type="text" className="input" placeholder="Author" required value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
                <select
                  className="input"
                  value={form.genre}
                  onChange={e => setForm(f => ({ ...f, genre: e.target.value }))}
                  required
                >
                  {BOOK_GENRES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <input type="text" className="input" placeholder="Language" required value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} />
                <input type="number" className="input" placeholder="Published Year" required value={form.publishedYear} onChange={e => setForm(f => ({ ...f, publishedYear: e.target.value }))} />
                <input type="number" className="input" placeholder="Price (NPR)" required value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                <input type="number" className="input" placeholder="Stock" required value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
                <input type="text" className="input" placeholder="Publisher" value={form.publisher} onChange={e => setForm(f => ({ ...f, publisher: e.target.value }))} />
                <input type="text" className="input" placeholder="ISBN" value={form.ISBN} onChange={e => setForm(f => ({ ...f, ISBN: e.target.value }))} />
                <input type="number" className="input" placeholder="Pages" value={form.pages} onChange={e => setForm(f => ({ ...f, pages: e.target.value }))} />
              </div>
              <textarea className="input" placeholder="Description" required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />

              {/* --- Image Upload --- */}
              <div
                className="relative group border-2 border-dashed border-green-300 rounded-xl py-4 px-5 flex flex-col items-center bg-green-50/60 cursor-pointer transition-all"
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageChange}
                />
                <FaUpload className="text-2xl text-green-600 mb-2" />
                <div className="text-green-800 font-bold mb-2">Drag & drop images or click to select</div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {imgFiles.map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-xl border-2 border-green-200 shadow-xl"
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn bg-[#a1ffce] text-[#015e30] font-extrabold hover:bg-[#7af3ac] transition">Add Book</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- BOOK LIST --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
        <AnimatePresence>
          {products.map((prod) => (
            <motion.div
              key={prod._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="rounded-3xl p-5 bg-white/90 shadow-xl border border-[#e3f5ed] hover:border-[#a1ffce] transition group overflow-hidden"
            >
              <ProductCarousel images={prod.images || []} />
              <div className="mb-2 text-xl font-bold text-[#00754A]">{prod.title}</div>
              <div className="mb-2 text-lg text-[#26323c]/90 font-bold">₨ {prod.price}</div>
              <div className="mb-3 text-[#16e087] text-xs uppercase tracking-wide font-extrabold">{prod.genre}</div>
              <div className="mb-1 text-[#3a5167] font-semibold">{prod.author}</div>
              <div className="mb-2 text-[#7b8c9b] line-clamp-3">{prod.description}</div>
              <div className="flex flex-wrap gap-2 text-xs mb-2">
                {prod.language && <span className="bg-green-100 border border-green-200 px-2 py-1 rounded-lg">Language: {prod.language}</span>}
                {prod.publisher && <span className="bg-[#e3f5ed] border border-[#a1ffce]/40 px-2 py-1 rounded-lg">Publisher: {prod.publisher}</span>}
                {prod.ISBN && <span className="bg-green-50 border border-green-200 px-2 py-1 rounded-lg">ISBN: {prod.ISBN}</span>}
                {prod.pages && <span className="bg-green-50 border border-green-200 px-2 py-1 rounded-lg">Pages: {prod.pages}</span>}
                <span className="bg-green-100 border border-green-200 px-2 py-1 rounded-lg">Stock: {prod.stock}</span>
                <span className="bg-green-100 border border-green-200 px-2 py-1 rounded-lg">Published: {prod.publishedYear}</span>
              </div>
              <div className="flex gap-3 justify-end mt-4">
                <button
                  className="btn bg-[#ffbdbd] text-[#e4002b] font-extrabold hover:bg-[#ffe9e6] transition"
                  disabled={deleting === prod._id}
                  onClick={() => handleDeleteProduct(prod._id)}
                >
                  {deleting === prod._id ? "Deleting..." : <><FaTrash /> Delete</>}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
