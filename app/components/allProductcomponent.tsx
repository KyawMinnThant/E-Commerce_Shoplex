"use client";

import { useState, ChangeEvent } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import ProductCard from "./productcard";
import SearchAndFilterComponent from "./searchAndfiltercomponent";

/* 🔹 Product type */
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/* 🔹 Props type */
interface ProductsComponentProps {
  products: Product[];
  category: string[];
}

export default function ProductsComponent({
  products,
  category,
}: ProductsComponentProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    products || []
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Filters
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // 🔍 Handle search input
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  // 🟣 Apply search
  const handleApplySearch = () => {
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };

  // 🟢 Apply category filter
  const handleApplyCategory = (category: string) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((p) => p.category === category);
    setFilteredProducts(filtered);
  };

  // Sidebar animation controls
  const openSidebar = () => {
    setIsSidebarOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeSidebar = () => {
    setIsAnimating(false);
    setTimeout(() => setIsSidebarOpen(false), 300);
  };

  return (
    <main className="max-w-7xl font-mono mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-[80px] relative">
      {/* 🟦 Mobile Filter Button */}
      <div className="flex justify-end mb-4 lg:hidden">
        <button
          onClick={openSidebar}
          className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 px-4 py-2 rounded-lg shadow-sm transition font-medium text-gray-700"
        >
          <FiFilter className="text-gray-700 text-lg" />
          <span>Filters</span>
        </button>
      </div>

      {/* 🧩 Layout */}
      <div className="flex flex-col-reverse lg:flex-row gap-10">
        {/* 🛍️ Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <img
                src="https://cdn-icons-png.freepik.com/512/7486/7486744.png"
                alt="No products"
                className="w-32 h-32 opacity-70 mb-4"
              />
              <p className="text-xl sm:text-2xl text-gray-400 text-center">
                No products found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>

        {/* 🖥️ Desktop Sidebar */}
        <aside className="hidden lg:block w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-24 bg-white shadow-md rounded-xl p-6 space-y-4 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Filters
            </h2>
            <SearchAndFilterComponent
              category={category}
              products={products}
              setProducts={setFilteredProducts}
            />
          </div>
        </aside>
      </div>

      {/* 📱 Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[5000] flex justify-end lg:hidden">
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeSidebar}
          />

          {/* Sidebar Panel */}
          <div
            className={`relative bg-white w-80 h-full shadow-2xl p-5 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
              isAnimating ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 border-b pb-3">
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              <button
                onClick={closeSidebar}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <FiX className="text-2xl text-gray-600" />
              </button>
            </div>

            <SearchAndFilterComponent
              category={category}
              products={products}
              setProducts={(filtered: Product[]) => {
                setFilteredProducts(filtered);
                setTimeout(closeSidebar, 200);
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
