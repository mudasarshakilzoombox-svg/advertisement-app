import type { Ad } from "@/types/ad";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export default function AdCard({
  ad,
  index,
}: {
  ad: Ad;
  index: number;
}) {
  return (
    <div className="group bg-white rounded-3xl border border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      
      <div className="h-[190px] w-full overflow-hidden">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-snug">
            {ad.title} {index + 1}
          </h2>

          <span className="px-4 py-1 text-sm font-medium border border-gray-300 rounded-full text-gray-600 whitespace-nowrap">
            {ad.condition}
          </span>
        </div>

        <p className="text-gray-500 mt-3">
          {ad.location}
        </p>

        <p className="mt-4 text-xl font-bold text-indigo-600">
          Rs {formatPrice(ad.price)}
        </p>

      </div>
    </div>
  );
}