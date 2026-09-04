import OptimizedImage from "./optimized-image";

const BannerProduct = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center text-center px-4">
        <p className="text-white/90 mb-2">Olvídate de las colas y el estrés</p>
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">BRONCO&apos;S MARKET</h1>
        <p className="text-white/80 mb-6 text-lg max-w-xl mx-auto">
          Lo esencial llega a tu puerta, sin complicaciones
        </p>
      </div>
      <div className="relative h-[80vh]">
        <OptimizedImage
          src="/slider-image.jpg"
          alt="Bronco's Market"
          fill
          priority
          sizes="100vw"
          quality={80}
        />
      </div>
    </div>
  );
};

export default BannerProduct;
