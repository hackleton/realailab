import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "./database";
import User from "../models/user";
import { sendEmail } from "../utils/sendEmail";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // update session.
      console.log("session", session);
      await connectToDB();
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      session.user.credits = sessionUser.credits;
      session.user.role = sessionUser.role;
      return session;
    },
    async signIn({ profile }) {
      // check if a user already exists
      // connect to database
      console.log("profile", profile);
      try {
        await connectToDB();
        const userExists = await User.findOne({
          email: profile.email,
        });
        if (!userExists) {
          const username = profile.name.replace(" ", "").toLowerCase();
          await User.create({
            email: profile.email,
            username: username,
            image: profile.picture,
            credits: 3,
          });

          // Send a welcome email to new users.
          const email = profile.email;
          const subject = "Welcome to Realailab";
          const text = `
          <p>Hi ${username},</p>
          <p>Thank you for joining our website. We are excited to have you as a member of our community!</p>
          <p>Feel free to explore all the features and resources available on our website. If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
          <p>Once again, welcome aboard, and we look forward to serving you.</p>
          <p>Best regards,</p>
          <p>The Resigns AI Team</p>
        `;
          await sendEmail(email, subject, text);
        }
        return true;
      } catch (error) {}
      console.log(error);
      return false;
    },
  },
};
