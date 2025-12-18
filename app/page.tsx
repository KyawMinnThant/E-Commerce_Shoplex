import { fetchAllCategory, fetchAllProduct } from "./functions/fetchingProduts";
import ProductsComponent from "./components/allProductcomponent";

export default async function HomePage() {
  let products = [];
  let category: string[] = [];

  try {
    products = await fetchAllProduct();
    category = await fetchAllCategory();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Optionally, you can show fallback data or empty arrays
    products = [];
    category = [];
  }

  return (
    <main>
      <ProductsComponent products={products} category={category} />
    </main>
  );
}
