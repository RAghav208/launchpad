import { getRoadmapDoneIds } from "@/lib/data/roadmap";
import { RoadmapView } from "@/components/roadmap/roadmap-view";

export default async function RoadmapPage() {
  const doneIds = await getRoadmapDoneIds();
  return <RoadmapView doneIds={doneIds} />;
}
