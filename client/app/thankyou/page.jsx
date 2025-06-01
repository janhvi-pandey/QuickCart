"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MdCardGiftcard } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError("Order ID not provided");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Order not found");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-500 text-white px-4">
        Loading order details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-500 text-red-100 font-semibold px-4">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen px-10 w-full bg-gradient-to-br from-blue-200 via-blue-400 to-blue-700 text-slate-900 relative overflow-hidden font-sans flex justify-center items-start py-12 ">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <section className="mb-10 text-center">
          <h1 className="text-4xl  text-blue-900 font-extrabold mb-3 drop-shadow">
            Thank You for Your Order!
          </h1>
          <p className="text-lg  text-blue-900 font-medium">
            We appreciate your trust in{" "}
            <Link href="/products" className="text-black font-semibold">
              QuickCart
            </Link>
            . Come back soon for more amazing deals!
          </p>
        </section>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-2xl lg:p-8 p-4 space-y-8 text-black">
          {/* Order ID */}
          <section className="border border-blue-300 rounded-xl p-5">
            <h2 className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2">
              <TbEdit className="text-blue-600" />
              Order Number
            </h2>
            <p className="font-mono bg-blue-50 p-3 rounded text-center text-lg select-all">
              {order.orderId}
            </p>
          </section>

          {/* Product Info */}
          <section className="border border-blue-300 rounded-xl p-5">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <MdCardGiftcard className="text-blue-600" />
              Order Summary
            </h2>
            <div className="flex flex-col md:flex-row md:space-x-6 items-center">
              <div className="w-48 h-48 flex items-center justify-center mb-4 md:mb-0">
                {order.product.image ? (
                  <img
                    src={order.product.image}
                    alt={order.product.title}
                    className="rounded-lg shadow-md object-contain max-h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="w-full">
                <p className="text-xl font-semibold text-blue-800 mb-1">
                  {order.product.title}
                </p>
                {order.product.description && (
                  <p className="text-sm text-gray-600 mb-3">
                    {order.product.description}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-y-2 text-base">
                  <div>
                    <p>
                      <strong className="text-gray-600">Quantity:</strong>{" "}
                      {order.product.quantity}
                    </p>
                    <p>
                      <strong className="text-gray-600">Size:</strong>{" "}
                      {order.product.size}
                    </p>
                    <p>
                      <strong className="text-gray-600">Placed on:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong className="text-gray-600">Price per unit:</strong>{" "}
                      ${order.product.price.toFixed(2)}
                    </p>
                    <p>
                      <strong className="text-gray-600">Total:</strong> $
                      {order.product.total.toFixed(2)}
                    </p>
                    <p>
                      <strong className="text-gray-600">Status:</strong>{" "}
                      <span className="text-green-700 font-semibold">
                        {order.transactionStatus || "Approved"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Customer Info */}
          <section className="border border-blue-300 rounded-xl p-5">
            <h2 className="text-2xl font-bold mb-3 text-blue-900 flex items-center gap-2">
              <FaUser className="text-blue-600 text-lg " />
              Customer Details
            </h2>
            <div className="grid grid-cols-1 gap-y-2 text-base">
              <p>
                <strong className="text-gray-600">Full Name:</strong>{" "}
                {order.customer.fullName}
              </p>
              <p>
                <strong className="text-gray-600">Email:</strong>{" "}
                {order.customer.email}
              </p>
              <p>
                <strong className="text-gray-600">Phone:</strong>{" "}
                {order.customer.phone}
              </p>
              <p>
                <strong className="text-gray-600">Address:</strong>{" "}
                {order.customer.address}, {order.customer.city},{" "}
                {order.customer.state}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
