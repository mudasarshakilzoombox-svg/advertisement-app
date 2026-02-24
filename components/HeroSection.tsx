import Button from "@/components/Button";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
      
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg leading-tight">
          Advertisements
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/90">
          Discover and explore all advertisements in one place.
        </p>

        <div className="mt-8 sm:mt-10">
          <Button href="/ads">
            Open Ads
          </Button>
        </div>

      </div>
    </section>
  );
}