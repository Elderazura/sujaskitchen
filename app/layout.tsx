import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suja's Kitchen - Authentic Kerala Cuisine",
  description: "Authentic Kerala cuisine delivered fresh from our cloud kitchen. Traditional meals, snacks, and catering services in Dubai and Abu Dhabi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
