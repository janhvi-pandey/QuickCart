"use client";
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

export default function CheckoutInner() {
  //   const SERVER_URL = "http://localhost:5000";

  const SERVER_URL = "https://server-quick-cart.vercel.app";
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("productId");
  const initialSize = searchParams.get("size") || "S";
  const initialQuantity = parseInt(searchParams.get("quantity") || "1");

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [quantity, setQuantity] = useState(initialQuantity);
  const [size, setSize] = useState(initialSize);
  const sizePriceIncrement = { S: 0, M: 5, L: 10, XL: 15 };

  useEffect(() => {
    if (productId) {
      fetch(`${SERVER_URL}/api/products/${productId}`)
        .then((res) => res.json())
        .then(setProduct)
        .catch(() => {});
    }
  }, [productId]);

  useEffect(() => {
    setSize(initialSize);
    setQuantity(initialQuantity);
  }, [initialSize, initialQuantity]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!/^\d{6}$/.test(form.zipCode))
      newErrors.zipCode = "Zip must be 6 digits";
    if (!/^\d{16}$/.test(form.cardNumber))
      newErrors.cardNumber = "Card must be 16 digits";
    if (!form.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else {
      const expiry = new Date(form.expiryDate);
      const today = new Date();
      if (expiry < today) newErrors.expiryDate = "Expiry must be future date";
    }
    if (!/^\d{3}$/.test(form.cvv)) newErrors.cvv = "CVV must be 3 digits";
    if (!productId) newErrors.productId = "Product ID is missing";
    if (quantity < 1) newErrors.quantity = "Quantity must be ≥ 1";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    if (!product) {
      toast.error("Product not loaded yet.");
      return;
    }

    const orderData = {
      form,
      productId: product._id || product.id || productId,
      quantity,
      size,
    };

    try {
      const response = await fetch(`${SERVER_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data.errors)) {
          data.errors.forEach((err) => toast.error(err.msg));
        } else {
          toast.error(data.error || "Failed to place order.");
        }
        return;
      }

      toast.success("Order Successfully Placed!");
      setTimeout(() => {
        router.push(`/thankyou?orderId=${data.orderId}`);
      }, 2000);
    } catch {
      toast.error("Server error. Please try again.");
    }
  };

  if (!product)
    return (
      <div className="p-10 m-10 text-center text-blue-700">
        Loading product. Please Wait 😊...
      </div>
    );

  const totalPrice = (product.price + sizePriceIncrement[size]) * quantity;

  return (
    <main className="min-h-screen px-8 py-10 lg:px-2 bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-slate-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-4xl font-extrabold mb-3 text-blue-900 drop-shadow-md">
          Secure Checkout
        </h1>
        <p className="text-center font-semibold text-lg mb-6 text-blue-800">
          Complete your purchase safely and quickly with{" "}
          <span className="text-black font-bold">QuickCart</span>.
        </p>

        <div className="flex justify-center mb-10">
          <Breadcrumb className="rounded-lg border border-blue-500 bg-white px-4 py-2 shadow-sm">
            <BreadcrumbList className="flex items-center space-x-2">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-blue-700 font-semibold"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/products"
                  className="text-blue-700 font-semibold"
                >
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-700 font-semibold">
                  {product.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="lg:bg-white/60 md:p-12 rounded-xl md:shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="flex-1 bg-white border-0 md:border">
              <CardHeader>
                <CardTitle className="font-semibold text-lg text-blue-900">
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    {
                      name: "fullName",
                      type: "text",
                      placeholder: "Full Name",
                    },
                    { name: "email", type: "email", placeholder: "Email" },
                    {
                      name: "phone",
                      type: "text",
                      placeholder: "Phone Number",
                    },
                    { name: "address", type: "text", placeholder: "Address" },
                    { name: "city", type: "text", placeholder: "City" },
                    { name: "state", type: "text", placeholder: "State" },
                    {
                      name: "zipCode",
                      type: "text",
                      placeholder: "Zip Code (6 digits)",
                    },
                    {
                      name: "cardNumber",
                      type: "text",
                      placeholder: "Card Number (16 digits)",
                    },
                    {
                      name: "expiryDate",
                      type: "date",
                      placeholder: "Expiry Date",
                    },
                    {
                      name: "cvv",
                      type: "text",
                      placeholder: "CVV (3 digits)",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={form[field.name]}
                        onChange={handleChange}
                        required
                        className={`w-full p-2 border rounded ${
                          errors[field.name]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors[field.name] && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded font-semibold transition"
                  >
                    Complete Purchase
                  </button>
                </form>
              </CardContent>
            </Card>

            <Card className="md:w-1/3 bg-blue-100 border-black">
              <CardHeader>
                <CardTitle className="font-semibold text-lg text-blue-900">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-40 mb-3 rounded flex items-center justify-center bg-white border">
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
                {errors.quantity && (
                  <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>
                )}

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
    </main>
  );
}
