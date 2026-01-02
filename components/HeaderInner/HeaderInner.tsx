"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { PageProps } from "@/types/types";

export default function HeaderInner({ pageOption }: PageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-dark-green">
      {/* Header bar */}
      <div className="container flex items-center py-4">
        {/* Logo */}
        <Link href="/">
          <svg width={164} height={28}>
            <use href="/img/icons.svg#icon-Logo" fill="#fbfbfb" />
          </svg>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-10 ml-auto mr-23">
          <Link
            href="/"
            className="font-normal text-[16px] leading-tight tracking-[-0.01em] text-background"
          >
            Home
          </Link>
          <Link
            href="/nannies"
            className="font-normal text-[16px] leading-tight tracking-[-0.01em] text-background"
          >
            Nannies
          </Link>
          {pageOption === "other" && (
            <Link
              href="/favorites"
              className="font-normal text-[16px] leading-tight tracking-[-0.01em] text-background"
            >
              Favorites
            </Link>
          )}
        </nav>

        {/* AuthNavigation desktop */}
        <div className="hidden md:block ml-4">
          <AuthNavigation />
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden ml-24 z-50"
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

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed bg-(--dark-green) inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col min-h-screen items-center justify-start pt-28">
          {/* Logo */}
          <Link href="/" className="mb-8">
            <svg width={164} height={28}>
              <use href="/img/icons.svg#icon-Logo" fill="#fbfbfb" />
            </svg>
          </Link>

          {/* Nav links */}
          <nav className="flex flex-col gap-6 mb-8 w-full text-center">
            <a href="" className="font-normal text-[16px] text-background">
              Home
            </a>
            <a href="" className="font-normal text-[16px] text-background">
              Nannies
            </a>
            {pageOption === "other" && (
              <a
                href="/favorites"
                className="font-normal text-[16px] text-background"
              >
                Favorites
              </a>
            )}
          </nav>

          {/* AuthNavigation */}
          <div className="w-full border-t border-white/30 pt-8">
            <AuthNavigation />
          </div>
        </div>
      </div>
    </div>
  );
}
