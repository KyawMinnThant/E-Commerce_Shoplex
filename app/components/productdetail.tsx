"use client";

import { FaStar, FaShoppingCart } from "react-icons/fa";
import RelatedItem from "./relatedItem";
import { useCartStore } from "../store/cartStore";
interface ProductDetail {
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

interface ProductDetailProps {
  productDetail: ProductDetail;
}

export default function ProductDetail({ productDetail }: ProductDetailProps) {
  const addProducts = useCartStore((state) => state.addproduct);
  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT - Product Image */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm flex items-center justify-center">
            <div className="w-full h-[400px] flex items-center justify-center overflow-hidden">
              <img
                src={productDetail?.image}
                alt={productDetail?.title}
                className="object-contain h-full w-full transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
          </div>

          {/* RIGHT - Product Info */}
          <div className="space-y-5">
            {/* Category */}
            <p className="text-xs uppercase text-gray-400 font-semibold tracking-wide">
              {productDetail?.category}
            </p>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
              {productDetail?.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400 text-base" />
              <span className="text-gray-700 font-medium text-sm">
                {productDetail?.rating?.rate?.toFixed(1)}
              </span>
              <span className="text-gray-400 text-sm">
                ({productDetail?.rating?.count} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold text-indigo-600">
              ${productDetail?.price?.toFixed(2)}
            </p>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {productDetail?.description}
            </p>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <button
                onClick={() =>
                  addProducts({
                    id: productDetail.id,
                    title: productDetail.title,
                    price: productDetail.price,
                    description: productDetail.description,
                    category: productDetail.category,
                    image: productDetail.image,
                    rating: productDetail.rating,
                    quantity: 1,
                  })
                }
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-full text-sm shadow-sm hover:shadow-md transition-all duration-300"
              >
                <FaShoppingCart className="text-base" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>

      <section>
        <RelatedItem
          category={productDetail?.category}
          excludeId={productDetail?.id}
        />
      </section>
    </>
  );
}
