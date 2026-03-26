"use client";

import dynamic from "next/dynamic";
import HomePageLoading from "@/components/home/HomePageLoading";

const HomePageClient = dynamic(
  () => import("@/components/home/HomePageClient"),
  { ssr: false, loading: () => <HomePageLoading /> },
);

export default function HomeGate() {
  return <HomePageClient />;
}
