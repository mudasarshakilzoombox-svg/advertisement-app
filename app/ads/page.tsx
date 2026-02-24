import { getRandomAds } from "@/lib/ads.service";
import AdsInfiniteList from "@/components/AdsInfiniteList";

export const dynamic = "force-dynamic";

export default function AdsPage() {
  const initialAds = getRandomAds(9);

  return (
    <main className="bg-gray-100 min-h-screen p-14">
      <h1 className="text-3xl text-gray-900 font-bold mb-8">
        All Ads
      </h1>

      <AdsInfiniteList initialAds={initialAds} />
    </main>
  );
}