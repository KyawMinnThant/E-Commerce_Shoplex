"use client";

import { FaTrash } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";

interface CartCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  increaseProductQuantity: (id: number) => void;
  decreaseProductQuantity: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function CartCard({
  id,
  title,
  price,
  image,
  quantity,
  increaseProductQuantity,
  decreaseProductQuantity,
  onRemove,
}: CartCardProps) {
  const products = useCartStore((state) => state.products);
  console.log("products", products);
  return (
    <div className="flex items-center justify-between bg-white rounded-3xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 mb-4">
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      {/* Title & Price */}
      <div className="flex-1 px-4 flex flex-col justify-between">
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
          {title}
        </h3>
        <p className="text-indigo-600 font-bold text-lg mt-1">
          ${price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => decreaseProductQuantity(id)}
          disabled={quantity <= 1}
          className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition"
        >
          -
        </button>
        <span className="w-8 text-center text-gray-700 font-medium">
          {quantity}
        </span>
        <button
          onClick={() => increaseProductQuantity(id)}
          className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(id)}
        className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 transition-shadow duration-300 shadow-sm"
      >
        <FaTrash />
      </button>
    </div>
  );
}
