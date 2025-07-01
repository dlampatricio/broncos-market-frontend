const BannerProduct = () => {
  return ( 
    <div className="relative">
      <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center text-center px-4">
        <p className="text-white/90 mb-2">Olvídate de las colas y el estrés</p>
        <h4 className="text-4xl sm:text-6xl font-bold text-white mb-4">
          BRONCO&apos;S MARKET
        </h4>
        <p className="text-white/80 mb-6 text-lg max-w-xl mx-auto">
          Lo esencial llega a tu puerta, sin complicaciones
        </p>
      </div>
      <div className="h-[80vh] bg-cover bg-center bg-[url('/slider-image.jpg')]" />
    </div>
   );
}
 
export default BannerProduct;