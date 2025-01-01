// pages/terms-conditions.js
import React from "react";
import Container from "../../../components/Container";

const TermsConditions = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p>Welcome to Drafty. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please do not use our services.</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Services</h2>
        <p>We provide AI-powered tools for space design and management. You may use our services in accordance with the terms outlined in this agreement.</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">User Responsibilities</h2>
        <p>You are responsible for maintaining the confidentiality of your account details and using our services in a lawful manner. You agree not to misuse our services or interfere with the normal functioning of the platform.</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Termination</h2>
        <p>We may suspend or terminate your account if we believe you have violated these terms. You may terminate your account at any time by contacting us.</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
        <p>We are not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.</p>
      </div>
    </Container>
  );
};

export default TermsConditions;
