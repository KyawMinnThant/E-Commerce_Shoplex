import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  quantity: number;
}

interface CartState {
  products: CartItem[];
  paymentMethodToPay: string;
  addproduct: (product: CartItem) => void;
  removeproduct: (id: number) => void;
  increasequantity: (id: number) => void;
  decreasequantity: (id: number) => void;
  updatequantity: (id: number, qty: number) => void;
  searchproduct: (query: string) => void;
  setPaymentMethod: (method: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      paymentMethodToPay: "",

      // ✅ Add product or increase quantity if it exists
      addproduct: (product: CartItem) =>
        set((state) => {
          const existing = state.products.find((p) => p.id === product.id);
          if (existing) {
            return {
              products: state.products.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            };
          }
          return { products: [...state.products, { ...product, quantity: 1 }] };
        }),

      // ✅ Remove item completely
      removeproduct: (id: number) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      // ✅ Increase by +1
      increasequantity: (id: number) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        })),

      // ✅ Decrease by -1 (and remove if reaches 0)
      decreasequantity: (id: number) =>
        set((state) => ({
          products: state.products
            .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
            .filter((p) => p.quantity > 0),
        })),

      // ✅ Manual quantity update
      updatequantity: (id: number, qty: number) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, quantity: qty } : p
          ),
        })),

      // ✅ Search product (returns filtered but does not delete)
      searchproduct: (query: string) =>
        set((state) => ({
          products: state.products.filter((p) =>
            p.title.toLowerCase().includes(query.toLowerCase())
          ),
        })),

      // ✅ Set payment method
      setPaymentMethod: (method: string) =>
        set(() => ({ paymentMethodToPay: method })),

      // ✅ Clear all products
      clearCart: () => set({ products: [] }),
    }),
    {
      name: "cart-storage", // storage key name
      // getStorage: () => localStorage, // use localStorage
    }
  )
);
