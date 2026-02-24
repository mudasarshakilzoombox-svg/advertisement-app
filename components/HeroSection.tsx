import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
      <h1 className="text-6xl font-extrabold drop-shadow-lg">
        Advertisements
      </h1>

      <p className="mt-6 text-xl text-white/90">
        Discover and explore all advertisements in one place.
      </p>

      <Link
        href="/ads"
        className="mt-10 bg-purple-900 px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition"
      >
        Open Ads
      </Link>
    </section>
  );
}