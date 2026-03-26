import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse Kerala, North Indian, Continental, and Arabic menus. Download PDFs and order via Talabat, Noon, or WhatsApp.",
};

export default function KitchenMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
