import Button from "@/components/Button";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-6xl font-extrabold drop-shadow-lg leading-tight">
          Advertisements
        </h1>

        <p className="mt-6 sm:mt-4 text-base sm:text-lg md:text-xl text-white/90">
          Discover and explore all advertisements in one place.
        </p>

        <div className="mt-4 sm:mt-8">
          <Button href="/ads">
            Open Ads
          </Button>
        </div>

      </div>
    </section>
  );
}