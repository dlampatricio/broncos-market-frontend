interface ProductWeightSizeProps {
  weight: string;
  size: string;
}

const ProductWeightSize = (props: ProductWeightSizeProps) => {
  const { weight, size } = props;
  
  return ( 
    <div className="flex items-center justify-between gap-3">
      <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
        {weight}
      </p>
      <p className="px-2 py-1 text-xs text-white bg-red-900 rounded-full w-fit">
        {size}
      </p>
    </div>
   );
}
 
export default ProductWeightSize;