// pages/cancellation-refund-policy.js
import React from "react";
import Container from "../../../components/Container";

const CancellationRefundPolicy = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Cancellation & Refund Policy</h1>
      <p>At Dcrafty AI, we strive to ensure that our customers are satisfied with our services. However, if you need to cancel or request a refund, please review our policy below.</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Cancellation</h2>
        <p>You may cancel your subscription at any time before the next billing cycle. Cancellations will take effect at the end of the current billing period.</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Refunds</h2>
        <p>Refund requests will be considered on a case-by-case basis. If you are dissatisfied with our services, please contact us within 7 days of your subscription to request a refund. Refunds will only be issued if the request meets our criteria, which include but are not limited to service quality issues.</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">How to Request a Refund</h2>
        <p>To request a refund, please email us at <a href="mailto:prashanth.drezolab@gmail.com" className="text-blue-500">prashanth.drezolab@gmail.com</a> with your account details and reason for the refund request.</p>
      </div>
    </Container>
  );
};

export default CancellationRefundPolicy;
