"use client";

import { useState } from "react";
import { Loader2, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Script from "next/script";

interface Props {
  rfqId: string;
  amount: number;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  prefill: { name: string; email: string };
  theme: { color: string };
  handler: (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
  modal: { ondismiss: () => void };
}

export default function RazorpayPaymentButton({ rfqId, amount }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rfqId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");

      const options: RazorpayOptions = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "FlexPro Exports & Imports",
        description: data.description,
        prefill: { name: data.customerName, email: data.customerEmail },
        theme: { color: "#e6b800" },
        handler: async (response) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              rfqId,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            toast.success("Payment successful! We'll be in touch soon.");
            router.refresh();
          } else {
            toast.error(verifyData.error || "Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => { setLoading(false); },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-navy-950 hover:scale-105 transition-transform disabled:opacity-70 disabled:scale-100 shadow-lg"
        style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
        ) : (
          <><CreditCard className="w-4 h-4" /> Pay ₹{amount.toLocaleString("en-IN")}</>
        )}
      </button>
    </>
  );
}
