import { AdCardProps } from '@/types/components';

function formatPrice(priceInRupees: number): string {
  return new Intl.NumberFormat("en-PK").format(priceInRupees);
}

export default function AdCard({ adDetails }: AdCardProps) {
  return (
    <div className="group bg-white rounded-3xl border border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

      <div className="h-[190px] w-full overflow-hidden">
        <img
          src={adDetails.image}
          alt={adDetails.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-6">

        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-snug">
            {adDetails.title}
          </h2>

          <span className="ml-3 shrink-0 px-2.5 py-0.5 text-xs font-medium bg-gray-50 border rounded-full text-gray-600">
            {adDetails.condition}
          </span>
        </div>

        <p className="text-gray-500 mt-3">
          {adDetails.location}
        </p>

        <p className="mt-4 text-xl font-bold text-indigo-600">
          Rs {formatPrice(adDetails.price)}
        </p>

      </div>
    </div>
  );
}