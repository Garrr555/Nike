import Link from "next/link";
import Navbar from "../Navbar";
import LoginOutView from "@/components/layouts/loginout";
import UserBtn from "@/components/layouts/userbtn";

export default function Header() {
  return (
    <header className="container py-5 xl:py-9">
      <div className="flex justify-between dark:text-white">
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold dark:text-white">
            Marga<span className="text-accent">.</span>
          </h1>
        </Link>
        {/* Desktop Navbar */}
        <div className="hidden xl:flex items-center justify-center gap-8">
          <Navbar />
          <UserBtn />
        </div>

        {/* Mobile Navbar */}
        <div className="xl:hidden flex items-center justify-center gap-4">
          <Navbar />
          <UserBtn />
        </div>
      </div>
    </header>
  );
}
