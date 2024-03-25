"use client";
import { AUTH_LINKS, NAVBAR_LINKS } from "@/constants";
import { isAdmin } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";

export function Navbar() {
  const { data: session } = useSession();
  return (
    <>
      <nav className="flex justify-evenly py-5 shadow-md">
        {/* Show logo */}
        <div className="relative rounded-lg w-16 h-16">
          <Image src={`/images/logo_nontext.webp`} fill alt="logo" />
        </div>
        {/* Show navbar links */}
        <div className="flex justify-center items-center gap-6">
          {NAVBAR_LINKS.map((link, index) => (
            <a
              className="text-3xl uppercase font-bold hover:text-orange-500 transition-colors"
              key={index}
              href={link.path}
            >
              {link.title}
            </a>
          ))}
        </div>
        {/* Show auth and cart */}
        <div className="flex justify-center items-center gap-5">
          {session?.user ? (
            isAdmin(session.user.roles) ? (
              <>
                <p className="text-lg font-semibold hover:text-orange-500 transition-colors">
                  {session.user.username}
                </p>
                <button onClick={() => signOut()}>
                  <p className="text-lg font-semibold hover:text-orange-500 transition-colors">
                    Sign Out
                  </p>
                </button>
              </>
            ) : (
              <>
                <a
                  href={AUTH_LINKS[2].path}
                  className="text-lg font-semibold hover:text-orange-500 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {AUTH_LINKS[2].icon}
                    {AUTH_LINKS[2].title}
                  </div>
                </a>
                <p className="text-lg font-semibold hover:text-orange-500 transition-colors">
                  {session.user.username}
                </p>
                <button onClick={() => signOut()}>
                  <p className="text-lg font-semibold hover:text-orange-500 transition-colors">
                    Sign Out
                  </p>
                </button>
              </>
            )
          ) : (
            <>
              {AUTH_LINKS.map((value, index) => (
                <a
                  key={index}
                  href={value.path}
                  className="text-lg font-semibold hover:text-orange-500 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {value.icon}
                    {value.title}
                  </div>
                </a>
              ))}
            </>
          )}
        </div>
      </nav>
    </>
  );
}
