import AdsContainer from "@/components/AdsContainer";
import { getRandomAds } from "@/utils/ads";

export const dynamic = "force-dynamic";

export default async function AdsPage() {
  const initialAds = getRandomAds(12);

  return (
    <main className="bg-gray-100 min-h-screen p-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        All Ads
      </h1>

      <AdsContainer initialAds={initialAds} />
    </main>
  );
}