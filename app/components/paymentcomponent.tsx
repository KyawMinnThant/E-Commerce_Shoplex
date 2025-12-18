"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCartStore } from "../store/cartStore";

export default function PaymentComponent({
  totalPrice,
}: {
  totalPrice: number;
}) {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const router = useRouter();

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    if (!accountNumber) {
      alert("Please enter your account/phone number");
      return;
    }
    // if (!amount || amount <= 0) {
    //   alert("Please enter a valid amount");
    //   return;
    // }

    // Here you would call your API to process payment
    alert(
      `Payment of $${totalPrice.toFixed(2)} via ${paymentMethod} successful!`
    );

    if (paymentMethod) {
      useCartStore.setState({ paymentMethodToPay: paymentMethod });
    }
    router.push("/voucher");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center ">Choose Your Payment</h2>

      {/* Amount */}
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Amount</label>
        <input
          type="number"
          value={totalPrice.toFixed(2)}
          disabled
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Enter amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Payment Methods */}
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Select Payment Method</label>
        <div className="flex flex-col space-y-2">
          {["K-Pay", "CB Bank", "Yoma Bank", "Aya Bank"].map((method) => (
            <label
              key={method}
              className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="accent-indigo-600 w-5 h-5"
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      {/* Account/Phone Number */}
      <div className="flex flex-col space-y-2">
        <label className="font-medium">
          {paymentMethod === "K-Pay" ? "Phone Number" : "Account Number"}
        </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder={
            paymentMethod === "K-Pay"
              ? "Enter phone number"
              : "Enter account number"
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        className="w-full p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
      >
        Pay
      </button>
    </div>
  );
}
