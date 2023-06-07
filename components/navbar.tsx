"use client";

import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className="container py-4 px-10 mx-auto">
      <nav className="flex justify-between">
        <Link className="font-semibold" href="/">
          GasFil
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/products" className="font-semibold">
            Products
          </Link>
          <div className="items-center flex gap-2">
            {session ? (
              <div className="flex items-center gap-2">
                <p>{session.user?.name}</p>

                <button
                  onClick={() => signOut()}
                  className="px-2 bg-primary font-semibold text-white py-1 uppercase border rounded-md"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Link href={"/register"} className="font-semibold">
                  Register
                </Link>
                <button className="font-semibold" onClick={() => signIn()}>
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
