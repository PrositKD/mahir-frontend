"use client";
import PaymentSuccess from "@/app/(site)/paymentSuccess/page";
import { useI18n } from "@/app/contexts/i18n";
import { confirmProductPayments } from "@/app/helper/backend";
import { useEffect, useState } from "react";

const PaymentSuccessPaypal = () => {
  const i18n = useI18n();
  const [paymentId, setPaymentId] = useState(null);
  const [PayerID, setPayerID] = useState(null);
  const method = "paypal";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setPaymentId(params.get("paymentId"));
      setPayerID(params.get("PayerID"));
    }
  }, [i18n]);

  useEffect(() => {
    const confirmOrderFunc = async () => {
      if (paymentId && PayerID) {
        await confirmProductPayments({ body: { paymentId, PayerID, method } });
      }
    };

    confirmOrderFunc();
  }, [i18n, paymentId, PayerID]);

  return (
    <div className="agency-container">
      <PaymentSuccess />
    </div>
  );
};

export default PaymentSuccessPaypal;
