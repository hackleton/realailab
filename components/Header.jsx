import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../utils/auth-options";

const Header = async ({ title }) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center justify-between px-4 pt-4">
      <h2 className="font-bold text-xl">{title}</h2>
      <h2>Welcome Back, {session.user.name}</h2>
    </div>
  );
};

export default Header;
