import Breadcrumb from "@/app/components/breadcrumb";
import ProductDetail from "@/app/components/productdetail";
import { fetchSingleProduct } from "@/app/functions/fetchingProduts";

interface Product {
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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productDetail: Product = await fetchSingleProduct(parseInt(id));

  return (
    <>
      <main className="min-h-screen font-mono bg-gray-50 py-20 px-6 md:px-16 lg:px-32">
        {/* Page Header */}
        <div className="max-w-6xl mx-auto mb-12 flex lg:flex-row md:flex-row flex-col gap-2 justify-between items-center">
          <div className="">
            <h1 className="lg:text-3xl text-[25px] md:text-2xl font-bold text-gray-900 font-sans">
              Product Details
            </h1>
            <div className="mt-2 w-16 h-1 bg-indigo-600 rounded-full"></div>
          </div>

          <div className="">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Details" }]}
            />
          </div>
        </div>

        {/* Product Detail Section */}
        <div className="mx-auto  rounded-3xl ">
          <ProductDetail productDetail={productDetail} />
        </div>
      </main>
    </>
  );
}
