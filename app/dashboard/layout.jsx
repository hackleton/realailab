import { getServerSession } from "next-auth";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import React from "react";
import { authOptions } from "../../utils/auth-options";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  console.log("dashboard", session);
  if (!session) redirect("/");
  if (session && session.user.role != "admin") redirect("/");

  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default DashboardLayout;
