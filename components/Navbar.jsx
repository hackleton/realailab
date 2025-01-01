import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex justify-between item-center">
            <Logo />
            <div className="flex space-x-6">
              <Link href="/about-us">About Us</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-conditions">Terms & Conditions</Link>
              <Link href="/cancellation-refund-policy">Cancellation & Refund Policy</Link>
              <Link href="/contact-us">Contact Us</Link>
            </div>
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
