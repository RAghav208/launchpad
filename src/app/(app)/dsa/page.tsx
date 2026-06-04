import { getDsaEntries } from "@/lib/data/dsa";
import { DsaView } from "@/components/dsa/dsa-view";

export default async function DsaPage() {
  const entries = await getDsaEntries();
  return <DsaView entries={entries} />;
}
