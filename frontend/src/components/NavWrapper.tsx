"use client"; 

import { Navbar } from "@/components/Navbar"; 
import { usePathname } from "next/navigation";

export default function NavbarWrapper() { 
  const pathname = usePathname();

  // Define routes where Navbar should be hidden
  const hiddenRoutes = ["/dashboard", "/login", "/register"];

  // Check if pathname starts with any hidden route
  const shouldHideNavbar = hiddenRoutes.some(route => pathname.startsWith(route));

  return !shouldHideNavbar ? <Navbar /> : null;
}
