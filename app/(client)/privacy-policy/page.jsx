// pages/privacy-policy.js
import React from "react";
import Container from "../../../components/Container";

const PrivacyPolicy = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p>Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information when you use our Dcrafty AI SaaS platform. By using our services, you agree to the collection and use of information in accordance with this policy.</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Information We Collect</h2>
        <p>We may collect the following information when you use our platform:</p>
        <ul className="list-disc ml-8">
          <li>Personal details (name, email, phone number, etc.)</li>
          <li>Payment information for subscription services</li>
          <li>Usage data (IP address, browser type, device, etc.)</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc ml-8">
          <li>Provide and maintain our services</li>
          <li>Improve and personalize user experience</li>
          <li>Process transactions securely</li>
          <li>Communicate with you regarding updates, support, and other service-related matters</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Data Security</h2>
        <p>We take reasonable steps to ensure that your data is protected. However, no method of transmission over the internet is 100% secure, and we cannot guarantee the absolute security of your data.</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. You can contact us at any time if you wish to exercise these rights.</p>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
