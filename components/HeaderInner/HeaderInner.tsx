"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import LogInModal from "../LogInForm/LogInModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { useAuth } from "@/context/AuthContext";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function HeaderInner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const { user } = useAuth();
  const isAuthenticated = !!user;
  const pathname = usePathname();

  return (
    <div className="relative bg-dark-green">
      {/* Header bar */}
      <div className="px-6 md:px-10 xl:px-24 flex items-center py-4">
        {/* Logo */}
        <Link href="/">
          <svg width={164} height={28}>
            <use href="/img/icons.svg#icon-Logo" fill="#fbfbfb" />
          </svg>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 lg:gap-10 md:ml-10 xl:mr-10 xl:ml-auto ">
          <Link
            href="/"
            className="text-background transition-all duration-250 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
          >
            Home
          </Link>
          <Link
            href="/nannies"
            className={`relative text-background transition-all duration-250 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]
    ${
      pathname === "/nannies"
        ? "after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-3 after:w-2 after:h-2 after:bg-white after:rounded-full"
        : ""
    }
  `}
          >
            Nannies
          </Link>
          {isAuthenticated && (
            <Link
              href="/favorites"
              className={`relative text-background transition-all duration-250 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]
      ${
        pathname === "/favorites"
          ? "after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-3 after:w-2 after:h-2 after:bg-white after:rounded-full"
          : ""
      }
    `}
            >
              Favorites
            </Link>
          )}
        </nav>

        {/* AuthNavigation desktop */}
        <div className="hidden md:block ml-4">
          <AuthNavigation
            onLoginClick={() => setIsLoginOpen(true)}
            onRegisterClick={() => setIsRegisterOpen(true)}
          />
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden ml-auto z-50 "
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 bg-(--dark-green) z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center justify-start min-h-screen pt-28">
          {/* Logo */}
          <Link href="/" className="mb-8" onClick={() => setIsOpen(false)}>
            <svg width={164} height={28}>
              <use href="/img/icons.svg#icon-Logo" fill="#fbfbfb" />
            </svg>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-col gap-6 mb-8 w-full text-center">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-background"
            >
              Home
            </Link>
            <Link
              href="/nannies"
              onClick={() => setIsOpen(false)}
              className="text-background"
            >
              Nannies
            </Link>
            {isAuthenticated && (
              <Link
                href="/favorites"
                onClick={() => setIsOpen(false)}
                className="text-background"
              >
                Favorites
              </Link>
            )}
          </nav>

          {/* AuthNavigation */}
          <div className="w-full border-t border-white/30 pt-8">
            <AuthNavigation
              onLoginClick={() => {
                setIsLoginOpen(true);
                setIsOpen(false);
              }}
              onRegisterClick={() => {
                setIsRegisterOpen(true);
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      </div>

      {isLoginOpen && <LogInModal onClose={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && (
        <RegisterModal onClose={() => setIsRegisterOpen(false)} />
      )}
    </div>
  );
}
