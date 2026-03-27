import { redirect } from "next/navigation";

export default function EidRedirectPage() {
  redirect("/seasonal?view=eid");
}
