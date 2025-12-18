export async function fetchAllProduct() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch products: ${res.status} ${res.statusText}`
    );
  }
  const product = await res.json();
  return product;
}

export async function fetchSingleProduct(id: number) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch product with id ${id}: ${res.status} ${res.statusText}`
    );
  }
  const product = await res.json();
  return product;
}

export async function fetchAllCategory() {
  const res = await fetch("https://fakestoreapi.com/products/categories", {
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch categories: ${res.status} ${res.statusText}`
    );
  }
  const product = await res.json();
  return product;
}
