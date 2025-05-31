"use client";

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
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-blue-900">
        Loading order details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-blue-900 p-8 flex justify-center items-start pt-20">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-10 space-y-8">

        {/* Final Confirmation Message */}
        <section className="text-center">
          <h1 className="text-5xl font-extrabold mb-3">Thank You for Your Order!</h1>
          <p className="text-xl font-semibold text-blue-800">
            Your order has been successfully placed.
          </p>
        </section>

        {/* Unique Order Number */}
        <section className="border rounded-lg border-blue-300 p-6">
          <h2 className="text-3xl font-bold mb-4">Order Number</h2>
          <p className="text-lg font-mono bg-blue-50 p-3 rounded text-center select-all">
            {order.orderId}
          </p>
        </section>

        {/* Full Order Summary */}
        <section className="border rounded-lg border-blue-300 p-6 flex flex-col md:flex-row md:space-x-10">
          <div className="flex-shrink-0 mb-6 md:mb-0">
            {order.product.image ? (
              <img
                src={order.product.image}
                alt={order.product.title}
                className="rounded-lg shadow-lg max-w-[200px] object-contain"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Order Summary</h2>
            <p className="text-xl font-semibold mb-2">{order.product.title}</p>
            <p className="mb-1">
              <strong>Quantity:</strong> {order.product.quantity}
            </p>
            <p className="mb-1">
              <strong>Price:</strong> ${order.product.price.toFixed(2)}
            </p>
            <p className="mb-1">
              <strong>Total:</strong> ${order.product.total.toFixed(2)}
            </p>
            <p className="mt-4 text-sm text-gray-600">
              <strong>Status:</strong>{" "}
              <span className="text-green-600">{order.transactionStatus || "Approved"}</span>
            </p>
            <p className="text-sm text-gray-600">
              <strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </section>

        {/* Customer Information */}
        <section className="border rounded-lg border-blue-300 p-6">
          <h2 className="text-3xl font-bold mb-4">Customer Information</h2>
          <div className="space-y-2 text-lg">
            <p><strong>Full Name:</strong> {order.customer.fullName}</p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p><strong>Phone:</strong> {order.customer.phone}</p>
            <p>
              <strong>Address:</strong>{" "}
              {order.customer.address}, {order.customer.city}, {order.customer.state}
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
