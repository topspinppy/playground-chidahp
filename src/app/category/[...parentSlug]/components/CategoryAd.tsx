import SouthDakotaAds from "@/app/components/front/SouthDakotaAds";
import PungRangerAds from "@/app/components/front/PungRangerAds";

type CategoryAdProps = {
  parentSlug: string[];
};

export default function CategoryAd({ parentSlug }: CategoryAdProps) {
  const hasSouthDakota = parentSlug.some((slug) => slug.includes("southdakota"));
  const hasPungRanger = parentSlug.some((slug) => slug.includes("pungranger-2026"));

  if (hasSouthDakota) return <SouthDakotaAds />;
  if (hasPungRanger) return <PungRangerAds />;
  return null;
}
