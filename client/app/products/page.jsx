"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaTshirt, FaShoppingBag, FaShopify, FaLaptop } from "react-icons/fa";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const FloatingIcon = ({ Icon, style }) => (
  <Icon
    className="pointer-events-none absolute opacity-30 text-blue-500"
    style={style}
  />
);

export default function ProductsPage() {
  // const SERVER_URL = "http://localhost:5000";
  const SERVER_URL = "https://quick-cart-backend-seven.vercel.app/";

  const [products, setProducts] = useState([]);
  const router = useRouter();
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const [selections, setSelections] = useState({});

  useEffect(() => {
    fetch(`${SERVER_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {});
  }, []);

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-2 mt-1 text-yellow-400 text-base select-none">
        <span className="text-blue-700 font-semibold text-sm">
          {rating.toFixed(2)}
        </span>
        <div className="flex">
          {Array(fullStars)
            .fill(0)
            .map((_, i) => (
              <span key={"full" + i}>★</span>
            ))}
          {halfStar && <span>☆</span>}
          {Array(emptyStars)
            .fill(0)
            .map((_, i) => (
              <span key={"empty" + i} className="text-gray-300">
                ★
              </span>
            ))}
        </div>
      </div>
    );
  };

  const handleSizeChange = (productId, newSize) => {
    setSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        size: newSize,
      },
    }));
  };

  const handleQtyChange = (productId, newQty) => {
    const qty = Math.max(1, newQty);
    setSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        qty,
      },
    }));
  };

  return (
    <main className="min-h-screen pt-12 pb-16 px-6 bg-gradient-to-br from-blue-200 via-blue-400 to-blue-700 text-slate-900 relative overflow-hidden font-sans">
      <FloatingIcon
        Icon={FaShoppingBag}
        style={{
          top: "2%",
          left: "2%",
          fontSize: "6rem",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <FloatingIcon
        Icon={FaLaptop}
        style={{
          top: "10%",
          right: "2%",
          fontSize: "7rem",
          animation: "float 7s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />
      <FloatingIcon
        Icon={FaTshirt}
        style={{
          bottom: "15%",
          left: "3%",
          fontSize: "5.5rem",
          animation: "float 6s ease-in-out infinite",
          animationDelay: "0.5s",
        }}
      />
      <FloatingIcon
        Icon={FaShopify}
        style={{
          bottom: "10%",
          right: "3%",
          fontSize: "6rem",
          animation: "float 7s ease-in-out infinite",
          animationDelay: "1.5s",
        }}
      />

      <h1 className="text-center text-4xl font-extrabold mb-2 text-blue-900 drop-shadow-md relative z-10">
        Explore Our Latest Products
      </h1>

      <p className="text-center font-semibold text-lg mb-3 text-blue-800 relative z-10">
        Shop smart, live bold — find your perfect style with{" "}
        <span className="text-black font-bold">QuickCart</span>.
      </p>

      <div className="flex justify-center mb-10">
        <Breadcrumb className="rounded-lg border border-blue-500 bg-white px-4 py-2 shadow-sm">
          <BreadcrumbList className="flex items-center space-x-2">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-blue-700 font-semibold">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-700 font-semibold">
                Products
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
        {products.map((product) => {
          const selectedSize = selections[product.id]?.size || sizes[0];
          const selectedQty = selections[product.id]?.qty || 1;

          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md flex flex-col hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 h-[430px] cursor-pointer"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <div className="w-full h-52 border-b border-gray-300 overflow-hidden">
                <img
                  src={product.images?.[0] || product.thumbnail || ""}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div
                className="flex flex-col flex-grow p-4 justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <h2
                    className="text-blue-700 font-bold text-base mb-1 truncate"
                    title={product.title}
                  >
                    {product.title}
                  </h2>

                  <p
                    className="text-gray-700 text-xs mb-2 line-clamp-2"
                    title={product.description}
                  >
                    {product.description}
                  </p>

                  <StarRating rating={product.rating} />

                  <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-600">
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        product.stock < 10
                          ? "bg-red-200 text-red-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {product.stock < 10 ? "Low Stock" : "In Stock"}
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="text-red-600">
                        {product.discountPercentage.toFixed(1)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 mt-3 text-xs">
                    <div className="flex-1">
                      <label
                        htmlFor={`size-${product.id}`}
                        className="block mb-0.5 font-semibold text-slate-700"
                      >
                        Size
                      </label>
                      <select
                        id={`size-${product.id}`}
                        value={selectedSize}
                        onChange={(e) =>
                          handleSizeChange(product.id, e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-2 py-1 border border-slate-700 rounded-md text-xs text-black bg-white outline-blue-600 cursor-pointer"
                      >
                        {sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor={`qty-${product.id}`}
                        className="block mb-0.5 font-semibold text-slate-700"
                      >
                        Qty
                      </label>
                      <input
                        id={`qty-${product.id}`}
                        type="number"
                        min="1"
                        max={product.stock}
                        value={selectedQty}
                        onChange={(e) =>
                          handleQtyChange(product.id, parseInt(e.target.value))
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-2 py-1 border border-slate-700 rounded-md text-xs text-black bg-white outline-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex flex-wrap gap-1">
                    {(product.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide select-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-lg text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        router.push(
                          `/checkout?productId=${product.id}&size=${selectedSize}&quantity=${selectedQty}`
                        );
                      }}
                      className="bg-blue-800 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors text-xs"
                    >
                      Buy Now <FaShoppingBag size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
