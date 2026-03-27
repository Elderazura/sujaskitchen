import { redirect } from "next/navigation";

export default function ChristmasRedirectPage() {
  redirect("/seasonal?view=christmas");
}
