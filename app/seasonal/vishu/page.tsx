import { redirect } from "next/navigation";

export default function VishuRedirectPage() {
  redirect("/seasonal?view=vishu");
}
