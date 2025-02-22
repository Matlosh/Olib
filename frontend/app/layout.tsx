import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Olib",
  description: "Application created for Java classes with Java Spring as a backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${josefinSans.className} antialiased min-h-screen`}
      >
        <Providers>
          <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
