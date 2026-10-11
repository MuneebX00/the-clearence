import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crown Clarence | Luxury Insulated Garden Rooms | Crown Pavilions",
  description: "The Crown Clarence is built to the highest industry standards. Designed with a more architectural and contemporary focus. Explore our luxury garden room.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {children}
      </body>
    </html>
  );
}
