import AdCard from "./AdCard";
import StatusMessage from "./StatusMessage";
import type { AdsContainerProps } from "@/src/types/adProps";
import type { Ad } from "@/src/types/ad";

export default function AdsContainer({ adsList, emptyMessage }: AdsContainerProps) {
  const validAds = Array.isArray(adsList)
    ? adsList.filter((ad): ad is Ad => ad && ad.id !== undefined)
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