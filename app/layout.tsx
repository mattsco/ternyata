import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ternyata",
  description: "Today's film, in bahasa indonesia. Guess it. Learn the words.",
};

export const viewport: Viewport = {
  themeColor: "#07090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen font-mono antialiased selection:bg-[#34e06a] selection:text-[#04130a]">
        {children}
      </body>
    </html>
  );
}
