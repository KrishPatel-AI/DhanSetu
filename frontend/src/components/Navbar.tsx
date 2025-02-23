"use client";

import Link from "next/link";

import { ModeToggle } from "../components/ModeToggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-background border-b shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          {/* <Image src={Logo} alt="Wealth Radar Logo" className="w-8 h-8" /> */}

          <span className="text-xl font-bold text-foreground">
           Dhan Setu
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Dashboard
          </Link>

          <Link
            href="/ai_chatbot"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            AI ChatBot
          </Link>

          <Link
            href="/learning"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Learning
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link
            href="/register"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
          {/* <Button className="bg-primary text-white text-sm font-medium px-6 py-2 rounded hover:bg-primary-dark transition"> */}
           <Button>
            Get Started
          </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
