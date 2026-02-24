import type { Ad } from "@/types/ad";
import AdCard from "./AdCard.server";

type Props = {
  ads: Ad[];
};

export default function AdsContainer({ ads }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {ads.map((ad, index) => (
        <AdCard
          key={`${ad.id}-${index}`}
          ad={ad}
          index={index}
        />
      ))}
    </div>
  );
}