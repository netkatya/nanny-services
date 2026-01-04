"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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

  return (
    <div className="relative bg-dark-green">
      {/* Header bar */}
      <div className="px-6 md:px-0 lg:px-16 flex items-center py-4">
        {/* Logo */}
        <Link href="/">
          <svg width={164} height={28}>
            <use href="/img/icons.svg#icon-Logo" fill="#fbfbfb" />
          </svg>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:gap-4 lg:gap-10 md:ml-10 md:mr-10 lg:ml-auto">
          <Link href="/" className="font-normal text-[16px] text-background">
            Home
          </Link>
          <Link
            href="/nannies"
            className="font-normal text-[16px] text-background"
          >
            Nannies
          </Link>
          {isAuthenticated && (
            <Link
              href="/favorites"
              className="font-normal text-[16px] text-background"
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
