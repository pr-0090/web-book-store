import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useProduct from "../../../hooks/UseProduct";
import ProductCard from "../product/productcard";
import { FiSearch } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Replace with real author and genre data for sidebar if needed
const AUTHORS = [
  "Tara Sherpa", "Ravi Neupane", "Kabir Rana", "Sabina Tamang",
  "Rupa Gurung", "Bishal Shrestha", "Anjali Acharya", "Prashant KC",
  "Deepak Dahal", "Nirajan Joshi"
];
const GENRES = [
  "Fiction", "Non-Fiction", "Science", "Mystery", "Biography",
  "Children", "Fantasy", "Romance", "History", "Comics", "Other"
];

function ShopComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { products, loading, error } = useProduct();

  const query = new URLSearchParams(location.search);
  const initialGenre = query.get("genre");

  const [search, setSearch] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(() =>
    initialGenre && GENRES.includes(initialGenre) ? [initialGenre] : []
  );
  const [priceRange, setPriceRange] = useState({ max: 100000 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (selectedGenres.length === 1) {
      navigate(`/shop?genre=${selectedGenres[0]}`, { replace: true });
    } else if (selectedGenres.length === 0) {
      navigate("/shop", { replace: true });
    }
  }, [selectedGenres, navigate]);

  // Main filtering logic for books
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()))
      .filter((p) =>
        selectedAuthors.length ? selectedAuthors.includes(p.author) : true
      )
      .filter((p) =>
        selectedGenres.length
          ? selectedGenres.includes(p.genre)
          : true
      )
      .filter((p) => {
        const minOk = p.price >= 100;
        const maxOk = priceRange.max === "" ? true : p.price <= priceRange.max;
        return minOk && maxOk;
      });
  }, [products, search, selectedAuthors, selectedGenres, priceRange]);

  const itemsPerPage = 8;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage)
  );
  const paginated = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const toggleFilter = (value, setFn, state) => {
    setFn(
      state.includes(value)
        ? state.filter((v) => v !== value)
        : [...state, value]
    );
    setPage(1);
  };

  // --- RENDER ---
  if (loading)
    return <div className="text-center py-20 text-xl text-[#00754A]">Loading books...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto py-8 px-2 sm:px-4">
      {/* Breadcrumb */}
      <div className="text-xs sm:text-sm text-gray-500 mb-4 flex items-center gap-1">
        <button
          className="text-[#00754A] font-semibold hover:underline"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">Shop</span>
      </div>

      {/* Section Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-7 text-[#00754A] tracking-tight border-b-2 border-[#00754A] inline-block pb-1 px-2 shadow-[0_4px_14px_-6px_rgba(0,117,74,0.10)]">
        Shop
      </h1>

      {/* SearchBar */}
      <div className="flex items-center mb-7 w-full md:w-[420px] mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search books, authors or genres"
            className="
              border-none shadow-lg pl-12 pr-4 py-3 rounded-full w-full
              text-lg bg-white/80 backdrop-blur focus:ring-2 focus:ring-[#00754A] focus:outline-none
              placeholder:text-gray-400
              transition
            "
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#00754A]">
            <FiSearch />
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-7">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, duration: 0.6 }}
          className="
            hidden md:block bg-white/80 backdrop-blur-md border-none
            rounded-3xl shadow-2xl px-7 py-8 min-w-[200px] max-w-[220px]
            mt-2
          "
        >
          {/* Genres */}
          <div className="mb-7">
            <div className="font-bold text-[#00754A] mb-2 text-lg tracking-wide">Genre</div>
            <div className="flex flex-col gap-1">
              {GENRES.map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer select-none py-1 rounded hover:bg-[#f4f9f6] transition">
                  <input
                    type="checkbox"
                    className="accent-[#00754A] w-4 h-4"
                    checked={selectedGenres.includes(g)}
                    onChange={() => toggleFilter(g, setSelectedGenres, selectedGenres)}
                  />
                  <span className="text-gray-700">{g}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Price - Updated to slider */}
          <div className="mb-7">
            <div className="font-bold text-[#00754A] mb-2 text-lg tracking-wide">Price</div>
            <div className="flex flex-col gap-1">
              <input
                type="range"
                min={100}
                max={100000}
                step={100}
                value={priceRange.max}
                className="w-full accent-[#00754A] h-2 bg-[#e9f8f2] rounded-full outline-none transition-all"
                onChange={e => {
                  setPriceRange(prev => ({
                    ...prev,
                    max: Number(e.target.value),
                  }));
                  setPage(1);
                }}
              />
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-400">NPR 100</span>
                <span className="text-[#00754A] font-bold bg-[#e9f8f2] px-2 py-0.5 rounded-xl shadow-inner">
                  {priceRange.max === 100000
                    ? "Up to Any"
                    : `Up to NPR ${Number(priceRange.max).toLocaleString()}`}
                </span>
                <span className="text-gray-400">NPR 100,000</span>
              </div>
            </div>
          </div>
          {/* Authors */}
          <div>
            <div className="font-bold text-[#00754A] mb-2 text-lg tracking-wide">Author</div>
            <div className="flex flex-col gap-1">
              {AUTHORS.map((a) => (
                <label key={a} className="flex items-center gap-2 cursor-pointer select-none py-1 rounded hover:bg-[#f4f9f6] transition">
                  <input
                    type="checkbox"
                    className="accent-[#00754A] w-4 h-4"
                    checked={selectedAuthors.includes(a)}
                    onChange={() => toggleFilter(a, setSelectedAuthors, selectedAuthors)}
                  />
                  <span className="text-gray-700">{a}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Product grid */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-gray-400 text-lg text-center pt-20">No books found.</div>
          ) : (
            <AnimatePresence>
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-3
                  gap-10
                "
              >
                {paginated.map((prod) => (
                  <ProductCard key={prod._id} product={prod} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
            <button
              className={`
                px-4 py-2 flex items-center gap-2 rounded-full
                font-bold transition border-2
                ${page === 1
                  ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                  : "bg-white border-[#00754A] text-[#00754A] hover:bg-[#00754A] hover:text-white shadow"}
              `}
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <FaChevronLeft size={17} />
              Previous
            </button>
            <span className="text-center font-semibold tracking-wide text-lg text-[#00754A] w-full sm:w-auto">
              Page {page} of {totalPages}
            </span>
            <button
              className={`
                px-4 py-2 flex items-center gap-2 rounded-full
                font-bold transition border-2
                ${page === totalPages
                  ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                  : "bg-white border-[#00754A] text-[#00754A] hover:bg-[#00754A] hover:text-white shadow"}
              `}
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
              <FaChevronRight size={17} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ShopComponent;
