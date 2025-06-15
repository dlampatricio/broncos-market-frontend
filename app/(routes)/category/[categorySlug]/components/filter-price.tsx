import useGetProductField from "@/api/useGetProductField";

const FilterPrice = () => {
  
  const {result, loading} = useGetProductField();
  
  return ( 
    <div className="my-5">
      <p className="mb-3 font-bold">Precio</p>
      {loading && result == null && (
        <p>Cargando Precio...</p>
      )}
    </div>
   );
}
 
export default FilterPrice;