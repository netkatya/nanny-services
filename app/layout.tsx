import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nanny Services - Find Babysitters Online",
  description: "Find trusted babysitters and nannies for all occasions.",
  openGraph: {
    type: "website",
    title: "Nanny Services - Find Babysitters Online",
    description: "Find trusted babysitters and nannies for all occasions.",
    url: "https://yourdomain.com",
    siteName: "Nanny Services",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nanny Services - Find Babysitters Online",
      },
    ],
  },
  twitter: {
    title: "Nanny Services - Find Babysitters Online",
    description: "Find trusted babysitters and nannies for all occasions.",
    images: ["https://yourdomain.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
