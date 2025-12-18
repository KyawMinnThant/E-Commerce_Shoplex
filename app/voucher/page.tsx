"use client";
import { useCartStore } from "../actions/store/cartStore";
import Breadcrumb from "../components/breadcrumb";
import Voucher from "../components/vouchercomponent";

export default function VoucherPage() {
  const products = useCartStore((state) => state.products);
  return (
    <div>
      <div className="mt-[150px] font-mono lg:ml-[150px] md:ml-[150px] ml-[100px]">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Payments", href: "/payments" },
            { label: "Voucher" },
          ]}
        />
      </div>
      <Voucher items={products} />
    </div>
  );
}
