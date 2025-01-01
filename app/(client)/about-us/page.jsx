// pages/about-us.js
import React from "react";
import Container from "../../../components/Container";

const AboutUs = () => {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p>
        Dcrafty is the brainchild of two passionate innovators, Prashanth and Subu, who hail from India. They have dedicated their expertise and vision to creating a platform that simplifies interior design using the power of Artificial Intelligence (AI). 
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Our Journey</h2>
        <p>
          Prashanth and Subu set out on a mission to make interior design more accessible and efficient. Their goal was to create a tool that would allow anyone to generate stunning interior design ideas with just a single photo. After months of research, development, and testing, they created Dcrafty — a cutting-edge AI platform that allows users to generate personalized interior designs in just 20 seconds.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">What We Do</h2>
        <p>
          With Dcrafty, we aim to transform how people approach interior design. Using a single photo of your space, our AI-powered platform can generate a variety of interior design options, customized to your preferences. The platform is designed to be fast, intuitive, and user-friendly — producing high-quality results in a matter of seconds.
        </p>
        <p>
          Whether you're a homeowner looking for inspiration or a business in need of efficient design solutions, Dcrafty offers a unique and fast way to bring your design ideas to life.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Our Vision</h2>
        <p>
          Our vision is to make interior design accessible to everyone. By harnessing the power of AI, we aim to break down the barriers of traditional design processes and provide personalized, innovative, and affordable design solutions to people all over the world.
        </p>
      </div>
    </Container>
  );
};

export default AboutUs;
