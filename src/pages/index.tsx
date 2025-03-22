import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import Navbar from "@/components/fragments/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useSession();
  console.log(data);

  return (
    <main className="container">
      <p>halo, tes di laptop</p>
    </main>
  );
}
