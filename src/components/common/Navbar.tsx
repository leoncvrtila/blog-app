"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-3">
        <Link href="/" className="text-2xl font-semibold tracking-wide">
          BlogApp
        </Link>
        <div className="space-x-4">
          <Link
            href="/"
            className={`hover:underline ${
              pathname === "/" ? "border-b-2 border-white" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`hover:underline ${
              pathname === "/about" ? "border-b-2 border-white" : ""
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
