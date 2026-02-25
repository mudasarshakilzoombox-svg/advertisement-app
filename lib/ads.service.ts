import type { Ad } from "@/types/ad";
import { getAllAds } from "./ads.repository";

function shuffleArray<ItemType>(items: ItemType[]): ItemType[] {
  const shuffledItems = [...items];

  for (
    let currentIndex = shuffledItems.length - 1;
    currentIndex > 0;
    currentIndex--
  ) {
    const randomIndex = Math.floor(
      Math.random() * (currentIndex + 1)
    );

    [
      shuffledItems[currentIndex],
      shuffledItems[randomIndex],
    ] = [
      shuffledItems[randomIndex],
      shuffledItems[currentIndex],
    ];
  }

  return shuffledItems;
}

export function getRandomAds(limit: number): Ad[] {
  const allAds = getAllAds();

  if (allAds.length === 0 || limit <= 0) {
    return [];
  }

  const randomizedAds = shuffleArray(allAds);
  const selectedAds: Ad[] = [];

  while (selectedAds.length < limit) {
    selectedAds.push(...randomizedAds);
  }

  return selectedAds.slice(0, limit);
}