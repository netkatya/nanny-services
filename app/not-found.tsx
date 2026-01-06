// app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Page Not Found - Nanny Services",
  description: "Oops! The page you are looking for does not exist.",
  openGraph: {
    type: "website",
    title: "Page Not Found - Nanny Services",
    description: "Oops! The page you are looking for does not exist.",
    url: "https://yourdomain.com/404",
    siteName: "Nanny Services",
    images: [
      {
        url: "https://yourdomain.com/og-404.png",
        width: 1200,
        height: 630,
        alt: "Page Not Found - Nanny Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found - Nanny Services",
    description: "Oops! The page you are looking for does not exist.",
    site: "@yourtwitter",
    creator: "@yourtwitter",
    images: ["https://yourdomain.com/og-404.png"],
  },
};

export default function NotFoundPage() {
  return (
    <>
      <Header pageOption="other" variant="default" />
      <main
        className={`${inter.variable} min-h-screen flex flex-col items-center justify-center bg-(--light-bg) text-(--text1)`}
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
        <p className="text-xl md:text-2xl mb-8 text-center">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/" className="green-button px-10 py-3.5">
          Go Back Home
        </Link>
      </main>
    </>
  );
}
