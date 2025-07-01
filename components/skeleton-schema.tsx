import { Skeleton } from "./ui/skeleton";

type SkeletonSchemaProps = {
  grid: number;
  variant?: 'product' | 'category';
}

const SkeletonSchema = (props: SkeletonSchemaProps) => {
  const { grid, variant = 'product' } = props; 

  if (variant === 'category') {
    return (
      Array.from({length: grid}).map((_, index) => (
        <div key={index} className="relative group overflow-hidden rounded-lg">
          <Skeleton className="w-full h-[600px] rounded-lg"/>
        </div>
      ))
    );
  }

  // Variante para productos
  return ( 
    Array.from({length: grid}).map((_, index) => (
      <div key={index} className="p-1">
        <div className="group relative block overflow-hidden rounded-lg">
          <Skeleton className="w-full h-[210px] rounded-t-lg"/>
          <div className="p-4 space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-3/4"/>
              <Skeleton className="h-6 w-16 rounded-full"/>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
 
export default SkeletonSchema;