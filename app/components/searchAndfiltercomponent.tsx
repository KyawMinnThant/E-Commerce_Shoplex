"use client";

import { useState, ChangeEvent } from "react";

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

export interface SearchAndFilterProps {
  category: string[];
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export default function SearchAndFilterComponent({
  category,
  products,
  setProducts,
}: SearchAndFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  // 🔍 Handle search input
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // 🟣 Apply search
  const handleApplySearch = () => {
    const value = searchValue.toLowerCase().trim();

    if (!value) {
      setProducts(products);
      return;
    }

    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");

    const filtered: Product[] = products.filter((p: Product) =>
      p.title.toLowerCase().includes(value)
    );

    setProducts(filtered);
  };

  // 🟢 Apply category filter
  const handleApplyCategory = () => {
    setSearchValue("");
    setMinPrice("");
    setMaxPrice("");

    let filtered: Product[] = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p: Product) => p.category === selectedCategory
      );
    }

    setProducts(filtered);
  };

  // 💰 Apply price filter
  const handleApplyPriceFilter = () => {
    setSearchValue("");
    setSelectedCategory("All");

    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;

    const filtered: Product[] = products.filter(
      (p: Product) => p.price >= min && p.price <= max
    );

    setProducts(filtered);
  };

  // 🧹 Clear all filters
  const handleClearFilters = () => {
    setSearchValue("");
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setProducts(products);
  };

  return (
    <div className="w-80 flex-shrink-0 space-y-6">
      {/* 🔍 Search Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Search Products</h2>
        <input
          type="text"
          placeholder="Type to search..."
          value={searchValue}
          onChange={handleSearchInput}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          onClick={handleApplySearch}
          className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium"
        >
          Search
        </button>
      </div>

      {/* 🏷️ Category Filter */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Categories</h2>

        <ul className="space-y-2 mb-4">
          <li>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="category"
                value="All"
                checked={selectedCategory === "All"}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSelectedCategory(e.target.value)
                }
                className="accent-indigo-500 w-4 h-4"
              />
              <span
                className={
                  selectedCategory === "All"
                    ? "text-indigo-600 font-medium"
                    : "text-gray-700 hover:text-indigo-600"
                }
              >
                All
              </span>
            </label>
          </li>

          {category.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSelectedCategory(e.target.value)
                  }
                  className="accent-indigo-500 w-4 h-4"
                />
                <span
                  className={
                    selectedCategory === cat
                      ? "text-indigo-600 font-medium"
                      : "text-gray-700 hover:text-indigo-600"
                  }
                >
                  {cat}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <button
          onClick={handleApplyCategory}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 font-medium"
        >
          Apply Category Filter
        </button>
      </div>

      {/* 💰 Price Filter */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Price Range</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMinPrice(e.target.value)
            }
            className="w-1/2 px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMaxPrice(e.target.value)
            }
            className="w-1/2 px-3 py-2 border rounded-md"
          />
        </div>
        <button
          onClick={handleApplyPriceFilter}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 font-medium"
        >
          Apply Price Filter
        </button>
      </div>

      {/* 🧹 Clear */}
      <button
        onClick={handleClearFilters}
        className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 font-medium"
      >
        Clear All Filters
      </button>
    </div>
  );
}
