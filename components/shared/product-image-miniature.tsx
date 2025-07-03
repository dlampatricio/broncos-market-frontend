/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductImageMiniatureProps {
  slug: string;
  url: string;
  className?: string;
}

const ProductImageMiniature = ({ slug, url, className }: ProductImageMiniatureProps) => {
  return (
    <Link href={`/product/${slug}`}>
      <img
        src={url}
        alt={slug}
        className={cn("rounded-md", className)}
      />
    </Link>
  );
}
 
export default ProductImageMiniature;