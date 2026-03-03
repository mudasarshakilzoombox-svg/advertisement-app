import AdCard from "./AdCard";
import StatusMessage from "./StatusMessage";
import type { AdsContainerProps } from "@/src/types/adProps";

export default function AdsContainer({
  adsList,
  emptyMessage,
}: AdsContainerProps) {
  // Guard: this component expects already-validated data
  if (!Array.isArray(adsList) || adsList.length === 0) {
    return (
      <StatusMessage
        type="empty"
        message={emptyMessage || "No ads found"}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {adsList.map((ad) => {
        // If this ever happens, it's a data-layer bug — not UI responsibility
        if (!ad?.id) {
          if (process.env.NODE_ENV !== "production") {
            console.error("Invalid ad detected in AdsContainer:", ad);
          }
          return null;
        }

        return (
          <AdCard
            key={ad.id}
            adDetails={ad}
          />
        );
      })}
    </div>
  );
}