import { z } from "zod";

export const SEASONAL_SLUGS = [
  "onam",
  "vishu",
  "easter",
  "christmas",
  "eid",
] as const;

export const seasonalOrderFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Valid email required"),
  phone: z.string().trim().min(5, "Phone number required").max(40),
  festivalSlug: z.enum(SEASONAL_SLUGS),
  festivalLabel: z.string().trim().min(1).max(120),
  deliveryOrPickup: z.enum(["delivery", "pickup", "either"]),
  preferredDate: z.string().trim().min(2, "Preferred date required").max(80),
  headcount: z.string().trim().min(1, "Headcount required").max(40),
  itemsNotes: z.string().trim().max(4000),
  website: z.string().optional(),
});

export const seasonalNotifyFormSchema = z.object({
  email: z.string().trim().email("Valid email required"),
  name: z.string().trim().max(120),
  festivalSlug: z.enum(SEASONAL_SLUGS),
  festivalLabel: z.string().trim().min(1).max(120),
  website: z.string().optional(),
});

export type SeasonalOrderFormValues = z.infer<typeof seasonalOrderFormSchema>;
export type SeasonalNotifyFormValues = z.infer<typeof seasonalNotifyFormSchema>;
