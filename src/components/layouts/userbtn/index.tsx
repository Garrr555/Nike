"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function UserBtn() {
  const { data } = useSession();
  return (
    <Link
      href="/member"
      className={`"text-accent"
         font-medium transition-all hover:text-accent  text-lg`}
    >
      {data ? (
        <div className="flex items-center justify-center gap-1">
          <div className="text-2xl">
            <FaUserCircle />
          </div>
          {data?.user?.email}
        </div>
      ) : (
        <button
          onClick={() => (data ? "" : signIn())}
          className="bg-accent p-2 text-primary rounded-xl hover:bg-accent-hover transition-all duration-500"
        >
          {data ? "" : "Login"}
        </button>
      )}
    </Link>
  );
}
