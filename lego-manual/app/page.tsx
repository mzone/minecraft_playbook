import LegoManualContainer from "./components/LegoManualContainer";
import { VOLUMES, VolumeId } from "./data/volumes";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const volId = (params.vol as VolumeId) ?? "vol01";
  const volume = VOLUMES[volId] ?? VOLUMES["vol01"];
  return <LegoManualContainer volume={volume} />;
}
