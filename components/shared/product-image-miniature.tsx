/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

interface ProductImageMiniatureProps {
  slug: string;
  url: string;
  className?: string;
}

const ProductImageMiniature = ({ slug, url, className }: ProductImageMiniatureProps) => {
  return (
      <img
        src={url}
        alt={slug}
        className={cn("rounded-md", className)}
      />
  );
}
 
export default ProductImageMiniature;