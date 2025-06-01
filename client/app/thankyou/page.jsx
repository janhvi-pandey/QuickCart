"use client";
import { Suspense } from "react";
import ThankYouInner from "./ThankYouInner";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading ThankYou page...</div>}>
      <ThankYouInner />
    </Suspense>
  );
}
