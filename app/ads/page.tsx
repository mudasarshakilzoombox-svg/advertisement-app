import { getRandomAds } from "@/lib/ads.service";
import AdsContainer from "@/components/AdsContainer";
import InfiniteScrollClient from "@/components/InfiniteScroll";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdsPage() {
  const ADS_PER_BATCH = 15;
  const TOTAL_ADS_AVAILABLE = 190;
  
  const { adsForCurrentPage: firstBatchAds } = getRandomAds(ADS_PER_BATCH, 1);
  
  const { adsForCurrentPage: secondBatchAds } = getRandomAds(ADS_PER_BATCH, 2);

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-6 py-6">
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            All Ads
          </h1>
          
        </div>
        
        <AdsContainer adsList={firstBatchAds} />

        <InfiniteScrollClient 
          preFetchedNextBatch={secondBatchAds}
          nextBatchNumber={2}
          totalAdsCount={TOTAL_ADS_AVAILABLE}
          initialLoadedCount={firstBatchAds.length}
          adsPerBatch={ADS_PER_BATCH}
        />

      </div>
    </main>
  );
}