// import Navbar from "@/components/Navbar";
import Provider from "../components/Provider";
import "../styles/globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "../components/ToasterProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Dcrafty - Instant ai interior design and ai exterior design generator",
  description:
    "Use the best AI interiors and exteriors generator with AI instantly.",
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
