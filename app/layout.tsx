import "./globals.css";
import { Atkinson_Hyperlegible, Merriweather } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: {
    default: "Hunter Lovell",
    template: "%s | Hunter Lovell",
  },
  description: "Hunter Lovell - Software Engineer",
  keywords:
    "hntrl, Hunter Lovell, Hunter, Lovell, web developer, backend developer, fullstack developer, fullstack, software, github, backend, hyper",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${atkinson.variable} ${merriweather.variable} font-sans`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
