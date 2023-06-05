import Navbar from "@/components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GasFil",
  description: "Online gas filling service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
