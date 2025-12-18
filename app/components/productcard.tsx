"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";
import { motion, useAnimation, useInView } from "framer-motion";

interface ProductCardProps {
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

export default function ProductCard({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}: ProductCardProps) {
  const addproduct = useCartStore((state) => state.addproduct);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={controls}
      className="group flex flex-col justify-between bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
    >
      {/* Product Image */}
      <Link href={`/products/${id}`}>
        <div className="relative w-full h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between flex-1">
        {/* Category */}
        <p className="text-xs uppercase text-gray-400 font-medium mb-1 tracking-wide">
          {category}
        </p>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <FaStar className="text-yellow-400 text-sm" />
          <span className="text-sm font-medium text-gray-700">
            {rating.rate.toFixed(1)}{" "}
            <span className="text-gray-400">({rating.count})</span>
          </span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-indigo-600">
            ${price.toFixed(2)}
          </span>

          <button
            onClick={() =>
              addproduct({
                id,
                title,
                price,
                description,
                category,
                image,
                rating,
                quantity: 1,
              })
            }
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <FaShoppingCart className="text-lg" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
