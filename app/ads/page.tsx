import { getRandomAds } from "@/lib/ads.service";
import AdsInfiniteList from "@/components/AdsInfiniteList";

export const dynamic = "force-dynamic";

export default function AdsPage() {
  const initialAds = getRandomAds(9);

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-6 py-6">
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          All Ads
        </h1>

        <AdsInfiniteList initialAds={initialAds} />

      </div>
    </main>
  );
}