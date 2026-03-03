import { getAds } from "@/lib/ads.service";
import InfiniteScrollClient from "@/src/components/InfiniteScroll";
import { ADS_PER_BATCH, TOTAL_ADS_AVAILABLE } from "@/config/ads.config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdsPage() {
  const { adsForCurrentPage: firstBatchAds } = getAds(ADS_PER_BATCH, 1);
  const { adsForCurrentPage: secondBatchAds } = getAds(ADS_PER_BATCH, 2);

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-6 py-6">  
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            All Ads
          </h1>
        </div>
        <InfiniteScrollClient 
          initialAds={firstBatchAds}
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