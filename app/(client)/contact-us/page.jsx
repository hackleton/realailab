// pages/contact-us.js
import React from "react";
import Container from "../../../components/Container";

const ContactUs = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p>If you have any questions, concerns, or suggestions, we would love to hear from you. Feel free to reach out to us using any of the following methods:</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Get In Touch</h2>
        <div className="space-y-4">
          <div>
            <strong>Email:</strong>
            <p><a href="mailto:prashanth.drezolab@gmail.com" className="text-blue-500">prashanth.drezolab@gmail.com</a></p>
          </div>
          <div>
            <strong>Phone:</strong>
            <p>(+91) 9080588654</p>
          </div>
          <div>
            <strong>Address:</strong>
            <p>Chennai, India</p>
          </div>
        </div>
      </div>

      {/* <div className="mt-8">
        <h2 className="text-2xl font-semibold">Social Media</h2>
        <p>Follow us on our social channels for the latest updates:</p>
        <div className="flex space-x-4">
          <a href="https://facebook.com/transformai" className="text-blue-500">Facebook</a>
          <a href="https://twitter.com/transformai" className="text-blue-500">Twitter</a>
          <a href="https://linkedin.com/company/transformai" className="text-blue-500">LinkedIn</a>
        </div>
      </div> */}
    </Container>
  );
};

export default ContactUs;
