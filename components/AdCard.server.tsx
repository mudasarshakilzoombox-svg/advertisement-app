import { Ad } from "@/types/ad";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export default function AdCard({ ad }: { ad: Ad }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden">
      
      <div className="h-60 w-full overflow-hidden">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl text-gray-900 font-semibold">
            {ad.title}
          </h2>

          <span className="text-sm px-4 py-1 border rounded-full text-gray-600">
            {ad.condition}
          </span>
        </div>

        <p className="text-gray-500 mt-3">
          {ad.location}
        </p>

        <p className="mt-4 text-2xl font-bold text-indigo-600">
          Rs {formatPrice(ad.price)}
        </p>
      </div>
    </div>
  );
}