import { Skeleton } from "./ui/skeleton";

type SkeletonSchemaProps = {
  grid: number;
  variant?: 'default' | 'category';
}

const SkeletonSchema = (props: SkeletonSchemaProps) => {
  const { grid, variant = 'default' } = props; 

  if (variant === 'category') {
    return (
      Array.from({length: grid}).map((_, index) => (
        <div key={index} className="flex flex-col gap-4 mx-auto max-w-[270px] w-full">
          <Skeleton className="w-full h-[480px] rounded-lg"/>
        </div>
      ))
    );
  }

  // Variante por defecto (para productos)
  return ( 
    Array.from({length: grid}).map((_, index) => (
      <div key={index} className="flex flex-col gap-8 mx-auto space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl"/>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]"/>
          <Skeleton className="h-4 w-[250px]"/>
        </div>
      </div>
    ))
  );
}
 
export default SkeletonSchema;