import type { Ad } from "@/src/types/ad";

export type AdsContainerProps = {
  adsList: Ad[];
  emptyMessage?: string;
};