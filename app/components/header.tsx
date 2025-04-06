"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md py-2"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 relative">
        <Link href="/" className="flex items-center gap-2 z-20">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-white"></div>
          </div>
          <span className="font-bold text-primary dark:text-white">
            Qatrah
            <br />
            Hayat
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-all duration-200 hover:text-primary dark:text-gray-200 dark:hover:text-white ${
              isActive("/") ? "border-b-2 border-black dark:border-white" : ""
            }`}
            aria-current={isActive("/") ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            href="/donate"
            className={`text-sm font-medium transition-all duration-200 hover:text-primary dark:text-gray-200 dark:hover:text-white ${
              isActive("/donate") ? "border-b-2 border-black dark:border-white" : ""
            }`}
            aria-current={isActive("/donate") ? "page" : undefined}
          >
            Donate
          </Link>
          <Link
            href="/find-blood"
            className={`text-sm font-medium transition-all duration-200 hover:text-primary dark:text-gray-200 dark:hover:text-white ${
              isActive("/find-blood") ? "border-b-2 border-black dark:border-white" : ""
            }`}
            aria-current={isActive("/find-blood") ? "page" : undefined}
          >
            Find Blood
          </Link>
          <Link
            href="/register"
            className={`text-sm font-medium transition-all duration-200 hover:text-primary dark:text-gray-200 dark:hover:text-white ${
              isActive("/register") ? "border-b-2 border-black dark:border-white" : ""
            }`}
            aria-current={isActive("/register") ? "page" : undefined}
          >
            Register Now
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/login"
            className={`hidden md:block border border-black dark:border-white rounded px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black ${
              isActive("/login") ? "bg-primary text-white" : "dark:text-white"
            }`}
          >
            Log In
          </Link>

          <button
            className="md:hidden z-20"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu with animation */}
        <div
          className={`fixed inset-0 bg-white dark:bg-gray-900 z-10 md:hidden transition-all duration-300 ease-in-out transform ${
            mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
          }`}
          style={{
            backgroundAttachment: "initial",
            overflowY: "auto",
          }}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="flex flex-col items-center justify-center min-h-screen py-20 space-y-8">
            <Link
              href="/"
              className={`text-xl font-medium ${isActive("/") ? "text-primary" : "dark:text-white"} transform transition-transform duration-300 hover:scale-110`}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive("/") ? "page" : undefined}
            >
              Home
            </Link>
            <Link
              href="/donate"
              className={`text-xl font-medium ${isActive("/donate") ? "text-primary" : "dark:text-white"} transform transition-transform duration-300 hover:scale-110`}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive("/donate") ? "page" : undefined}
            >
              Donate
            </Link>
            <Link
              href="/find-blood"
              className={`text-xl font-medium ${isActive("/find-blood") ? "text-primary" : "dark:text-white"} transform transition-transform duration-300 hover:scale-110`}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive("/find-blood") ? "page" : undefined}
            >
              Find Blood
            </Link>
            <Link
              href="/register"
              className={`text-xl font-medium ${isActive("/register") ? "text-primary" : "dark:text-white"} transform transition-transform duration-300 hover:scale-110`}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive("/register") ? "page" : undefined}
            >
              Register Now
            </Link>
            <Link
              href="/login"
              className="bg-primary text-white rounded-md px-8 py-3 font-medium transform transition-transform duration-300 hover:scale-110"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

