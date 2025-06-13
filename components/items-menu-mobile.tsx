import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Menu } from "lucide-react";
import Link from "next/link";

const ItemsMenuMobile = () => {
  return ( 
    <div>
      <Popover>
        <PopoverTrigger>
          <Menu/>
        </PopoverTrigger>
        <PopoverContent>
          <Link href="/category/combos" className="block">Combos</Link>
          <Link href="/category/dairy" className="block">Lácteos</Link>
          <Link href="/category/meats" className="block">Cárnicos</Link>
          <Link href="/category/drinks" className="block">Bebidas</Link>
          <Link href="/category/jams" className="block">Confituras</Link>
          <Link href="/category/others" className="block">Otros</Link>
        </PopoverContent>
      </Popover>
    </div>
   );
}
 
export default ItemsMenuMobile;