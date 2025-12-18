"use client";

import Link from "next/link";

import { useCartStore } from "../store/cartStore";
import CartCard from "../components/cartcard";
import Breadcrumb from "../components/breadcrumb";

export default function CartComponents() {
  const products = useCartStore((state) => state.products);
  const removeProduct = useCartStore((state) => state.removeproduct);
  const increaseQuantity = useCartStore((state) => state.increasequantity);
  const decreaseQuantity = useCartStore((state) => state.decreasequantity);

  const totalPrice = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl font-mono mx-auto px-4 py-10 mt-[100px]">
      <div className="flex flex-col lg:flex-row md:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>
        <div className=" mb-5">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Cart" }]}
          />
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-6">
            {products.map((item) => (
              <CartCard
                key={item.id}
                {...item}
                onRemove={removeProduct}
                increaseProductQuantity={() => increaseQuantity(item.id)}
                decreaseProductQuantity={() => decreaseQuantity(item.id)}
              />
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-xl shadow-md">
            <p className="text-xl font-semibold">
              Total:{" "}
              <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
            </p>

            <Link href="payments">
              <button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300">
                Confirm Shopping
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
