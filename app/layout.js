import "./globals.css";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  metadataBase: process.env.HOST_NAME,
  title: "Tailwind Color Palette",
  description:
    "Browse through the Tailwind CSS colors in HSL, RGB, and HEX formats.",
  openGraph: {
    title: "Tailwind Color Palette",
    description:
      "Browse through the Tailwind CSS colors in HSL, RGB, and HEX formats.",
    url: process.env.HOST_NAME,
    images: [
      {
        url: `${process.env.HOST_NAME}/og-image.png`,
        width: 843,
        height: 441,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <body
        className={
          GeistSans.className +
          " bg-zinc-100 dark:bg-zinc-900 selection:bg-zinc-400/25 dark:selection:bg-zinc-600/25 relative"
        }
      >
        {children}
      </body>
    </html>
  );
}
