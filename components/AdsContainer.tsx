import type { Ad } from "@/types/ad";
import AdCard from "./AdCard";

type Props = {
  adsList: Ad[];
};

export default function AdsContainer({ adsList }: Props) {
  const validAds = Array.isArray(adsList) 
    ? adsList.filter(ad => ad && ad.id) 
    : [];
  
  if (validAds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No ads found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
      {validAds.map((ad, index) => (
        <AdCard
          key={`${ad.id}-${index}-${Math.random().toString(36).substr(2, 9)}`}
          adDetails={ad}
        />
      ))}
    </div>
  );
}