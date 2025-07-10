'use client'

import { useRouter } from "next/navigation";

const AboutUs = () => {
  
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-red-900 dark:text-red-500 mb-6">
          ¡Gracias por elegirnos!
        </h1>
        <div className="w-24 h-1 bg-red-900 dark:bg-red-500 mx-auto mb-8"></div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-red-900 dark:text-red-500 mb-6 text-center">
          Sobre Nosotros
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4 text-lg">
              En <strong>Bronco&apos;s Market</strong>, nacimos con la misión de simplificar la vida de las familias cubanas. Somos más que un servicio de entrega de alimentos, somos tu aliado en la cocina diaria.
            </p>
            
            <p className="mb-4">
              Hemos crecido para convertirnos en el puente confiable entre los productores locales y tu mesa, llevando lo mejor de la gastronomía cubana directamente a tu hogar.
            </p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-red-900 dark:text-red-500 mr-2">✓</span>
                <span>Productos seleccionados cuidadosamente</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-900 dark:text-red-500 mr-2">✓</span>
                <span>Apoyo a productores locales</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-900 dark:text-red-500 mr-2">✓</span>
                <span>Entregas rápidas y confiables</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg border border-red-100 dark:bg-card">
            <h3 className="text-xl font-medium text-red-900 dark:text-red-500 mb-4">
              Nuestra Filosofía
            </h3>
            <p className="italic mb-4">
              &quot;Creemos que cada familia cubana merece acceso a alimentos de calidad sin perder horas en colas interminables.&quot;
            </p>
            <p>
              Por eso diseñamos combos inteligentes que se adaptan a tus necesidades, preservando los sabores auténticos de nuestra tierra.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-red-50 p-8 rounded-lg dark:bg-card">
        <h3 className="text-xl font-semibold text-red-900 mb-4 dark:text-red-500">
          ¿Por qué elegirnos?
        </h3>
        <p className="mb-6">
         No solo entregamos comida, llevamos tranquilidad con cada ingrediente premium.
        </p>
        <button className="bg-red-900 text-white px-6 py-2 rounded-md hover:bg-red-800 transition" onClick={() => router.push("/category/combos")}>
          Conoce nuestros combos
        </button>
      </section>
    </div>
  );
}

export default AboutUs;