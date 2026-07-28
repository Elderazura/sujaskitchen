import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * Custom editorial utilities live in the `text-*` namespace (text-display,
 * text-section, text-eyebrow, ...). Bare twMerge misreads them as conflicting
 * font-size/color utilities and silently drops them, which had broken the
 * entire serif/eyebrow type system. Register them as font-family so they are
 * preserved alongside real size/color utilities like `text-3xl` / `text-brand`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-family": [
        "text-display",
        "text-section",
        "text-eyebrow",
        "text-body-editorial",
        "text-caption",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
