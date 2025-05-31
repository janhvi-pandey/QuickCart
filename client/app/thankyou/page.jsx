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
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-blue-900 p-8">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Thank You for Your Order!</h1>
        <p className="mb-6 text-lg font-semibold">
          Your order has been successfully placed.
        </p>

        <div className="text-left border-t border-blue-300 pt-6 space-y-4">
          <h2 className="text-2xl font-bold mb-2">Order Details</h2>
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Status:</strong> <span className="text-green-600">{order.transactionStatus || 'Approved'}</span></p>
          <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>

          <h3 className="mt-4 text-xl font-semibold">Customer Information</h3>
          <p>{order.customer.fullName}</p>
          <p>{order.customer.email}</p>
          <p>{order.customer.phone}</p>
          <p>
            {order.customer.address}, {order.customer.city}, {order.customer.state}
          </p>

          <h3 className="mt-4 text-xl font-semibold">Product</h3>
          <p><strong>{order.product.title}</strong></p>
          <p>Quantity: {order.product.quantity}</p>
          <p>Price: ${order.product.price.toFixed(2)}</p>
          <p><strong>Total: ${order.product.total.toFixed(2)}</strong></p>
        </div>
      </div>
    </main>
  );
}
