import { redirect } from "next/navigation";

export default function EasterRedirectPage() {
  redirect("/seasonal?view=easter");
}
