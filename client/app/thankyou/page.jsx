"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

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
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-blue-900 px-4">
        Loading order details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-red-600 font-semibold px-4">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 p-6 flex justify-center items-start pt-12">
      <div className="max-w-4xl w-full px-4">
        <section className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold mb-2 text-blue-900 drop-shadow-md">
            Thank You for Your Order!
          </h1>
          <p className="text-lg font-medium text-blue-800">
            We appreciate your trust in{" "}
            <span className="text-black font-bold">
              <Link href="/products">QuickCart</Link>
            </span>
            . Feel free to explore more amazing products!
          </p>
        </section>

        <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
          <section className="border border-blue-300 rounded-lg p-5">
            <h2 className="text-2xl font-bold mb-2 text-blue-900">
              Order Number
            </h2>
            <p className="text-base font-mono bg-blue-50 p-2 rounded text-center select-all text-black">
              {order.orderId}
            </p>
          </section>

          <section className="border border-blue-300 rounded-lg p-5">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">
              Order Summary
            </h2>
            <div className="flex flex-col md:flex-row md:space-x-8 items-center justify-center">
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
              <div className="text-black w-full">
                <p className="text-xl font-semibold text-blue-800 mb-1">
                  {order.product.title}
                </p>
                {order.product.description && (
                  <p className="text-sm text-gray-600 mb-3">
                    {order.product.description}
                  </p>
                )}
                <div className="space-y-1 text-base">
                  <p>
                    <strong className="text-gray-600">Quantity:</strong>{" "}
                    {order.product.quantity}
                  </p>
                  <p>
                    <strong className="text-gray-600">Price:</strong> $
                    {order.product.price.toFixed(2)}
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
                  <p>
                    <strong className="text-gray-600">Placed on:</strong>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border border-blue-300 rounded-lg p-5">
            <h2 className="text-2xl font-bold mb-3 text-blue-900">
              Customer Information
            </h2>
            <div className="space-y-1 ">
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
