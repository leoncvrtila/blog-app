import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
