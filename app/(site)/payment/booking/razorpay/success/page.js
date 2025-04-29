"use client";

import PaymentSuccess from "@/app/(site)/paymentSuccess/page";
import { useI18n } from "@/app/contexts/i18n";
import { confirmEventPayments } from "@/app/helper/backend";
import { useEffect, useState } from "react";

const PaymentSuccessPaypal = () => {
  const i18n = useI18n();
  const [razorpayPaymentId, setRazorpayPaymentId] = useState(null);
  const method = "razorpay";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setRazorpayPaymentId(params.get("razorpay_payment_id"));
    }
  }, [i18n]);

  useEffect(() => {
    const confirmOrderFunc = async () => {
      if (razorpayPaymentId) {
        await confirmEventPayments({ body: { razorpay_payment_id: razorpayPaymentId, method } });
      }
    };

    confirmOrderFunc();
  }, [i18n, razorpayPaymentId]);

  return (
    <div className="agency-container">
      <PaymentSuccess />
    </div>
  );
};

export default PaymentSuccessPaypal;
