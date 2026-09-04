import OptimizedImage from "@/components/optimized-image";
import { cn } from "@/lib/utils";

interface ProductImageMiniatureProps {
  slug: string;
  url: string;
  className?: string;
}

const ProductImageMiniature = ({ slug, url, className }: ProductImageMiniatureProps) => {
  return (
    <div className={cn("relative", className)}>
      <OptimizedImage
        src={url}
        alt={slug}
        fill
        sizes="160px"
      />
    </div>
  );
};

export default ProductImageMiniature;
