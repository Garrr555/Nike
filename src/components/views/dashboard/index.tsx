import Image from "next/image";
import React from "react";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";

export default function DashboardView() {
  return (
    <main className="min-h-screen bg-primary text-white font-primary">
      {/* Top Banner */}
      <div className="bg-accent text-primary text-sm text-center py-1">
        Langkah Percaya Diri dengan Produk Lokal |{" "}
        <span className="underline">Jelajahi Yuk</span>
      </div>

      {/* Contact Bar */}
      <div className="bg-secondary text-white/80 text-xs py-2 px-4 flex justify-end items-center space-x-2">
        <span>Butuh bantuan? </span>
        <span>
          <strong>Chat kami</strong> - WhatsApp:{" "}
          <strong>+62 812-3456-7890</strong>
        </span>
      </div>

      {/* Navigation */}
      {/* <header className="flex justify-between items-center px-6 py-4 bg-white text-black border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="text-4xl font-bold">Pwt Site</div>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#" className="hover:underline">
            Pria
          </a>
          <a href="#" className="hover:underline">
            Wanita
          </a>
          <a href="#" className="hover:underline">
            Anak-anak
          </a>
          <a href="#" className="hover:underline">
            Merek
          </a>
          <a href="#" className="hover:underline">
            Lacak Pesananmu
          </a>
        </nav>
        <div className="flex items-center space-x-4 text-xl">
          <FaSearch />
          <FaUserCircle />
          <FaShoppingCart />
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative bg-primary text-white px-6 py-24 overflow-hidden h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/shoes.jpg"
            alt="Hero Shoes"
            className="w-full h-full object-cover opacity-60"
            width={2000}
            height={2000}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-sm text-gray-300">2025</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Koleksi Terbaru
          </h1>
          <p className="mb-6 text-gray-300">
            Hemat Sampai 30% — Stok Terbatas!
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-accent text-black font-semibold px-6 py-2 rounded-full">
              Mulai Belanja
            </button>
            <button className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
              ▶
            </button>
          </div>
        </div>
      </section>

      {/* Promo Strip */}
      <div className="bg-black overflow-hidden whitespace-nowrap py-2 text-white/80 relative">
        <div className="marquee-track flex animate-marquee space-x-12">
          {Array(10)
            .fill("Hemat 60%")
            .map((text, index) => (
              <div key={index} className="mx-2">
                Diskon Bulan Mei <span className="text-accent">{text}</span>
              </div>
            ))}
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            animation: marquee 20s linear infinite;
          }

          .marquee-track {
            will-change: transform;
            min-width: 200%;
          }
        `}</style>
      </div>
      {/* Footer */}
      <footer className="bg-secondary text-white/80 px-6 py-10 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Brand Info */}
          <div>
            <h2 className="text-accent font-bold text-lg mb-2">Footwear</h2>
            <p className="text-gray-400">
              Langkah Percaya Diri dengan Sepatu Lokal Berkualitas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-accent font-semibold mb-2">Kategori</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Pria
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Wanita
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Anak-anak
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Merek
                </a>
              </li>
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h3 className="text-accent font-semibold mb-2">Bantuan</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Lacak Pesanan
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Kebijakan Retur
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-accent font-semibold mb-2">Hubungi Kami</h3>
            <p>WhatsApp: +62 812-3456-7890</p>
            <p>Email: support@pwtsite.id</p>
            <p>Instagram: @pwtsite</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-4 text-center text-xs text-white/50">
          © 2025 Footwear. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
