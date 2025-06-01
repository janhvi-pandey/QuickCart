"use client";
import { Suspense } from "react";
import CheckoutInner from "./CheckoutInner";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading checkout page...</div>}>
      <CheckoutInner />
    </Suspense>
  );
}
