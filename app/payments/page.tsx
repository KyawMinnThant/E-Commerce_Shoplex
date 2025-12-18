"use client";
import { useCartStore } from "../store/cartStore";
import Breadcrumb from "../components/breadcrumb";
import PaymentComponent from "../components/paymentcomponent";

export default function PaymentPage() {
  const products = useCartStore((state) => state.products);
  console.log(products);
  const totalPrice: number = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="font-mono">
      <div className="mt-[150px] lg:ml-[150px] md:ml-[150px] ml-[100px]">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Payments" },
          ]}
        />
      </div>

      <PaymentComponent totalPrice={totalPrice} />
    </div>
  );
}
