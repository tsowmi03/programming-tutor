import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CodeClimb — practice programming, properly",
    template: "%s · CodeClimb",
  },
  description:
    "A personal training ground for data structures and algorithms: solve problems in Python, JavaScript, Java, and C against real test cases.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-dvh flex-col overflow-hidden">
        <Navbar />
        <div className="min-h-0 flex-1 overflow-y-auto panel-scroll">
          {children}
        </div>
      </body>
    </html>
  );
}
