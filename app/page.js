import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function Home() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (user.role === "admin") redirect("/dashboard/admin");
  redirect("/dashboard/resident");
}
