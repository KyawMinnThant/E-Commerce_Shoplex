"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";
import { fetchAllProduct } from "../functions/fetchingProduts";

interface RelatedItemProps {
  category: string;
  excludeId?: number;
}

interface ProductRating {
  rate: number;
  count: number;
}

interface RelatedProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export default function RelatedItem({ category, excludeId }: RelatedItemProps) {
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const addproduct = useCartStore((state) => state.addproduct);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchAllProduct();

        // Make sure allProducts is typed as RelatedProduct[]
        const filtered = (allProducts as RelatedProduct[]).filter(
          (p) => p.category === category && p.id !== excludeId
        );

        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, excludeId]);

  if (loading)
    return (
      <div className="text-center py-8 text-gray-500">
        Loading related products...
      </div>
    );

  if (!relatedProducts.length)
    return (
      <div className="text-gray-500 text-center mt-6">
        No related products found.
      </div>
    );

  return (
    <div className="mt-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl font-semibold mb-8 text-gray-900 text-center">
        Related Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col justify-between bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            {/* Image */}
            <Link href={`/products/${product.id}`}>
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain h-full w-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <p className="text-xs uppercase text-gray-400 font-medium mb-1 tracking-wide">
                {product.category}
              </p>

              <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
                {product.title}
              </h3>

              <div className="flex items-center gap-1 mb-3">
                <FaStar className="text-yellow-400 text-xs" />
                <span className="text-xs font-medium text-gray-700">
                  {product.rating?.rate.toFixed(1)}{" "}
                  <span className="text-gray-400">
                    ({product.rating?.count})
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-lg font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>

                <button
                  onClick={() =>
                    addproduct({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      description: product.description,
                      category: product.category,
                      image: product.image,
                      rating: product.rating,
                      quantity: 1,
                    })
                  }
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-1.5 rounded-full transition-all duration-300 text-sm shadow-sm"
                >
                  <FaShoppingCart className="text-sm" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
