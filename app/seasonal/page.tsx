import type { Metadata } from "next";
import SeasonalExperience from "@/components/seasonal/SeasonalExperience";

export const dynamic = "force-dynamic";
import {
  parseSeasonalViewParam,
  resolveSeasonalState,
} from "@/lib/seasonalCalendar";
import { getFestivalContent } from "@/lib/seasonalFestivalContent";

type Props = { searchParams: Promise<{ view?: string | string[] }> };

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const q = await searchParams;
  const view = parseSeasonalViewParam(q.view ?? null);
  const resolved = resolveSeasonalState(new Date(), view);
  const c = getFestivalContent(
    resolved.instance.slug,
    resolved.instance.variantLabel,
  );
  return {
    title: c.metaTitle,
    description: c.metaDescription,
  };
}

export default async function SeasonalPage({ searchParams }: Props) {
  const q = await searchParams;
  const view = parseSeasonalViewParam(q.view ?? null);
  const resolved = resolveSeasonalState(new Date(), view);
  const viewIsOverride = view !== null;

  return (
    <SeasonalExperience resolved={resolved} viewIsOverride={viewIsOverride} />
  );
}
