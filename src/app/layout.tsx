import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Harsha Vardhan Yanakandla | Creative Developer",
  description: "Creative Full Stack Developer building scalable AI-powered digital experiences.",
  icons: {
    icon: "https://res.cloudinary.com/drit9nkha/image/upload/v1709268964/samples/people/qlq8w1bk0qdlvkpycxty.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <div className="bg-grain" />
        {children}
      </body>
    </html>
  );
}
