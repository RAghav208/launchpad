import { redirect } from "next/navigation";
import { getProfile } from "@/lib/data/profile";
import { SettingsView } from "@/components/settings/settings-view";

export default async function SettingsPage() {
  const profile = await getProfile();
  if (!profile) redirect("/login");
  return <SettingsView profile={profile} />;
}
