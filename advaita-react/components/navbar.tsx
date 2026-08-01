"use client";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";
import Image from "next/image";

const links = ["Home", "Services", "About", "Portfolio", "Contact"];

export default function Navbar() {
  const handleClick = (link: string) => {
    const element = document.querySelector(`#${link.toLowerCase()}`);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleClick("Home")}>
            <Image
              src="/Generated_image_1-removebg-preview.png"
              alt="ADVAITA Logo"
              width={200}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <RandomLetterSwap
                className="cursor-pointer font-medium text-gray-600 text-base hover:text-cyan-600 transition-colors"
                key={link}
                label={link}
                staggerDuration={0.025}
                transition={{ duration: 0.6, type: "spring" }}
                onClick={() => handleClick(link)}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
