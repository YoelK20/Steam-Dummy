import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Footer } from "@/components/footer";
import ServerProtectedComponents from "@/components/ServerProtectComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Steem",
  description: "Welcome to Steem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ServerProtectedComponents> */}
          <NavBar />
          {children}
          <Footer />
        {/* </ServerProtectedComponents> */}
      </body>
    </html>
  );
}
