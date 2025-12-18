"use client";
import Link from "next/link";
import React from "react";
import { useCartStore } from "../store/cartStore";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface VoucherProps {
  items: Product[];
}

export default function Voucher({ items }: VoucherProps) {
  const paymentMethodToPay = useCartStore((state) => state.paymentMethodToPay);
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Global print styles for hiding navbar + printing voucher only */}
      <style jsx global>{`
        @media print {
          /* Hide navbar during print */
          #navbar {
            display: none !important;
          }

          /* Hide everything except voucher */
          body * {
            visibility: hidden;
          }

          #printable-voucher,
          #printable-voucher * {
            visibility: visible;
          }

          #printable-voucher {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            margin: 0;
            box-shadow: none !important;
          }

          /* Hide buttons and links inside voucher while printing */
          #printable-voucher button,
          #printable-voucher a {
            display: none !important;
          }
        }
      `}</style>

      <div
        id="printable-voucher"
        className="max-w-3xl mx-auto bg-white mt-10 shadow-2xl rounded-xl p-6 md:p-8 space-y-8"
      >
        {/* Header */}
        <div className="p-2 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Voucher For Payment
          </h2>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">
            <thead className="bg-gray-100">
              <tr className="border-b border-gray-300">
                <th className="py-3 px-2">Item</th>
                <th className="py-3 px-2">Qty</th>
                <th className="py-3 px-2">Price</th>
                <th className="py-3 px-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-2 flex items-center gap-3 md:gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg shadow-sm"
                    />
                    <span className="font-medium text-gray-800 text-sm md:text-base">
                      {item.title}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-medium text-sm md:text-base">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-2 text-gray-700 text-sm md:text-base">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-2 font-semibold text-sm md:text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xl font-bold border-t border-gray-300 pt-4 gap-2 md:gap-0">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col md:flex-row justify-between items-center text-lg font-medium border-t border-gray-300 pt-4 gap-2 md:gap-0">
          <span>Payment Method:</span>
          <span className="text-indigo-600">{paymentMethodToPay}</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href="/">
            <button className="w-full sm:w-auto px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-semibold">
              OK
            </button>
          </Link>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Print
          </button>
        </div>
      </div>
    </>
  );
}
