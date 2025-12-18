export async function fetchAllProduct() {
  try {
    const res = await fetch("http://fakestoreapi.com/products", {});
    if (!res.ok)
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
    return await res.json();
  } catch (error) {
    console.error("Fetch products error:", error);
    throw error;
  }
}

export async function fetchSingleProduct(id: number) {
  const res = await fetch(`http://fakestoreapi.com/products/${id}`, {});
  if (!res.ok) {
    throw new Error(
      `Failed to fetch product with id ${id}: ${res.status} ${res.statusText}`
    );
  }
  const product = await res.json();
  return product;
}

export async function fetchAllCategory() {
  const res = await fetch("http://fakestoreapi.com/products/categories", {});
  if (!res.ok) {
    throw new Error(
      `Failed to fetch categories: ${res.status} ${res.statusText}`
    );
  }
  const product = await res.json();
  return product;
}
