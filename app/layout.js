import {Playfair_Display, Roboto } from "next/font/google";
import "@/app/globals.css";

const playfair = Playfair_Display({
  weight: ["400", "600"],
  variable: "--font-playfair",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "500"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: "Curtains-shop",
  description: "просто проект",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
