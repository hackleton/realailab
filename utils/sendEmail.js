import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "email-smtp.eu-north-1.amazonaws.com", // Replace with the SES SMTP endpoint for your region
    port: 587,
    secure: false, // Set to true if you are using port 465 with SSL
    auth: {
      user: "AKIA4HWJULRWGAQYL37H",
      pass: "BNFoOC4CIER/4ZjQGd3P5kAqNi/HJfYykO8eYsDI+Z8K",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    html: text,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};
