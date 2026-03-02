import type { Ad } from "@/src/types/ad";
import AdCard from "./AdCard";
import StatusMessage from "./StatusMessage";

type Props = {
  adsList: Ad[];
  emptyMessage?: string;
};

export default function AdsContainer({ adsList, emptyMessage }: Props) {
  const validAds = Array.isArray(adsList)
    ? adsList.filter((ad) => ad && ad.id)
    : [];

  if (validAds.length === 0) {
    return (
      <StatusMessage 
        type="empty" 
        message={emptyMessage || "No ads found"}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {validAds.map((ad, index) => {
        const uniqueKey = `ad-${index}-${ad.id}`;
        
        return (
          <AdCard
            key={uniqueKey}
            adDetails={ad}
          />
        );
      })}
    </div>
  );
}