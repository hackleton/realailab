import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="flex justify-center items-center">
      <Link href="/">
        <p className="font-bold text-xl text-black tracking-wide">
          Dcrafty
        </p>
      </Link>
    </div>
  );
};

export default Logo;
