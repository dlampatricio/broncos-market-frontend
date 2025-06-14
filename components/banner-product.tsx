import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
  return ( 
    <>
      <div className="mt-4 text-center">
        <p>Olvídate de las colas y el estrés</p>
        <h4 className="mt-2 text-5xl font-extrabold uppercase">Bronco&apos;s Market</h4>
        <p className="my-2 text-lg">Lo esencial llega a tu puerta, sin complicaciones</p>
        <Link href="#" className={buttonVariants()}>Comprar</Link>
      </div>
      <div className="h-[350px] bg-cover lg:h-[700px] bg-[url('/slider-image.jpg')] bg-center mt-5" />
    </>
   );
}
 
export default BannerProduct;