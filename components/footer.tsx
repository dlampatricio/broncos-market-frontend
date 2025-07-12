'use client'

import Link from "next/link";
import { Separator } from "./ui/separator";

const dataFooter = [
  {
    id: 1,
    name: "Sobre Nosotros",
    link: "/about-us",
  },
  {
    id: 2,
    name: "Productos",
    link: "/all-products",
  },
]

const Footer = () => {
  return ( 
    <footer className="mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <p className="text-gray-600 dark:text-gray-400"> 
              <span className="text-lg font-semibold text-red-900 dark:text-red-500 mr-2">
                Bronco&apos;s Market  
              </span>
              E-commerce
            </p>         
          <ul className="flex flex-wrap gap-6 text-sm font-medium">
            {dataFooter.map((data) => (
              <li key={data.id}>
                <Link 
                  href={data.link} 
                  className="text-red-900 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <Separator className="my-3 border-gray-300 dark:border-gray-700" />
        
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <span>
            &copy; 2025{" "}
            <Link href="/" className="text-red-900 hover:underline dark:text-red-500">
              Bronco&apos;s Market
            </Link>
            . Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
   );
}
 
export default Footer;