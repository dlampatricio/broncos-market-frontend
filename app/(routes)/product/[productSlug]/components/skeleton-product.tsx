import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProduct = () => {
  return ( 
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid gap-6 px-4 sm:grid-cols-2 sm:px-0">
        {/* Imagen */}
        <div className="flex justify-center sm:block">
          <Skeleton className="h-[300px] w-full rounded-lg sm:h-[200px] sm:w-[350px]" />
        </div>
        
        {/* Info del producto */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-6 w-[100px]" />
          </div>
          
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
          
          <Skeleton className="h-6 w-[120px] my-4" />
          
          <div className="flex items-center gap-4 pt-4">
            <Skeleton className="h-10 flex-grow" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default SkeletonProduct;