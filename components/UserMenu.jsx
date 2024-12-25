"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const UserMenu = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, [session]);

  return (
    <div className="z-10">
      {session?.user ? (
        <div className="flex justify-center items-center gap-3">
          <Link href="/pricing">
            <p className="text-base font-medium">Pricing</p>
          </Link>
          <div>|</div>
          <div className="text-base font-medium py-3 rounded cursor-pointer">
            {session.user.credits} credits
          </div>
          <div className="relative">
            <Image
              width={35}
              height={35}
              className="rounded-full cursor-pointer"
              alt="avatar"
              src={session.user.image}
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                {session.user.role == "admin" && (
                  <Link
                    href="/dashboard"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/my-rooms"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Rooms
                </Link>
                <Link
                  href="/generate"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Room
                </Link>

                <button
                  type="button"
                  className="mt-2 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </div>
  );
};

export default UserMenu;
