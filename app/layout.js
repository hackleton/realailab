// import Navbar from "@/components/Navbar";
import Provider from "../components/Provider";
import "../styles/globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "../components/ToasterProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "ReDesignsAI - Instant Interior & Exterior Decoration with AI",
  description:
    "Use AI to generate interiors, exteriors and gardens with AI in less than 30 seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Provider>
          {/* <Navbar /> */}
          {children}
        </Provider>
      </body>
    </html>
  );
}
