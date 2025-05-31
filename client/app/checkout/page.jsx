"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("productId");

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  const sizePriceIncrement = {
    S: 0,
    M: 5,
    L: 10,
    XL: 15,
  };

  useEffect(() => {
    if (productId) {
      fetch(`https://dummyjson.com/products/${productId}`)
        .then((res) => res.json())
        .then(setProduct)
        .catch(console.error);
    }
  }, [productId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const cardRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;
    const expiryDate = new Date(form.expiry);
    const today = new Date();

    return (
      form.name &&
      emailRegex.test(form.email) &&
      phoneRegex.test(form.phone) &&
      form.address &&
      form.city &&
      form.state &&
      form.zip &&
      cardRegex.test(form.card) &&
      expiryDate > today &&
      cvvRegex.test(form.cvv)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    const order = {
      orderId: Math.floor(Math.random() * 1000000),
      product,
      quantity,
      size,
      total: (product.price + sizePriceIncrement[size]) * quantity,
      form,
    };

    console.log("Order submitted:", order);

    const outcome = ["approved", "declined", "error"][
      Math.floor(Math.random() * 3)
    ];

    setTimeout(() => {
      if (outcome === "approved") {
        toast.success("Transaction Approved! Redirecting...");
        router.push("/thank-you");
      } else if (outcome === "declined") {
        toast.error("Transaction Declined.");
      } else {
        toast.error("Payment Gateway Error.");
      }
    }, 1000);
  };

  if (!product)
    return (
      <div className="p-10 m-10 text-center text-blue-700">
        Loading product. Please Wait 😊...
      </div>
    );

  const totalPrice = (product.price + sizePriceIncrement[size]) * quantity;

  return (
    <main className="min-h-screen px-6 py-10 bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-slate-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-4xl font-extrabold mb-3 text-blue-900 drop-shadow-md relative z-10">
          Secure Checkout
        </h1>
        <p className="text-center font-semibold text-lg mb-3 text-blue-800 relative z-10">
          Complete your purchase safely and quickly with{" "}
          <span className="text-black font-bold">QuickCart</span> .
        </p>
        <div className="flex justify-center mb-8">
          <Breadcrumb className="inline-flex rounded-lg border border-blue-500 bg-white px-4 py-2 shadow-sm">
            <BreadcrumbList className="flex items-center space-x-2">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-blue-600 ">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-400">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/products" className="text-blue-600 ">
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-400">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-700 font-semibold">
                  {product.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="bg-white/60 rounded-xl p-12 shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle className="font-semibold text-lg text-blue-900">
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="Zip Code"
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="card"
                      placeholder="Card Number (16 digits)"
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="month"
                      name="expiry"
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV (3 digits)"
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded"
                    />
                    <button
                      type="submit"
                      className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded font-semibold transition"
                    >
                      Complete Purchase
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-1/3 flex items-center justify-center">
              <Card className="bg-blue-100 border-black w-full">
                <CardHeader>
                  <CardTitle className=" font-semibold text-lg text-blue-900">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-40 mb-3 rounded flex items-center justify-center bg-white border-black">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="h-full object-contain"
                    />
                  </div>
                  <p className="font-semibold text-blue-900 mb-1">
                    {product.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>

                  <label className="block text-sm font-medium mt-2">Size</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full p-2 rounded mb-3 border border-gray-400"
                  >
                    {Object.keys(sizePriceIncrement).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <label className="block text-sm font-medium">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-400 rounded mb-3"
                  />

                  <div className="flex justify-between text-sm font-medium mt-4">
                    <span>Subtotal:</span>
                    <span>
                      ${(product.price + sizePriceIncrement[size]) * quantity}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-blue-800 mt-1">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
