// Footer.js
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-light mb-4">Transform</h3>
            <p className="text-gray-400 mb-4">
              Creating beautiful, functional spaces that reflect your lifestyle and personality using AI.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:contact@transform.com" className="hover:text-white transition-colors">
                  prashanthravichandran1@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>India</span>
              </div>
            </div>
          </div>
          
          <div>
  <h4 className="text-lg font-medium mb-4">Quick Links</h4>
  <nav className="space-y-2">
    {[
      "Generate",
      "My rooms",
      "Blog",
      "About Us",
      "Privacy Policy",
      "Terms & Conditions",
      "Contact Us",
      "Cancellation & Refund Policy",
    ].map((item) => (
      <Link
        key={item}
        href={`/${item
          .toLowerCase()
          .replace(/ & /g, "-and-")
          .replace(/ /g, "-")}`}
        className="block hover:text-white transition-colors"
      >
        {item}
      </Link>
    ))}
  </nav>
</div>
      
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {currentYear} Dcrafty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
