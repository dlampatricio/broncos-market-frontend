import Link from 'next/link';

const footerLinks = {
  tienda: [
    { label: 'Productos', href: '/all-products' },
    { label: 'Destacados', href: '/#featured' },
  ],
  empresa: [
    { label: 'Sobre Nosotros', href: '/about-us' },
    { label: 'Carrito', href: '/cart' },
    { label: 'Favoritos', href: '/loved-products' },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 sm:py-12">
          {/* Brand - always spans 2 columns on mobile */}
          <div className="col-span-2">
            <Link
              href="/"
              aria-label="Bronco's Market - Inicio"
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="text-xl font-bold text-red-900 dark:text-red-500">
                BRONCO&apos;S
              </span>
              <span className="text-xl font-light text-red-900/60 dark:text-red-500/60">
                MARKET
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Tu aliado confiable en la cocina diaria. Productos frescos y de calidad directo a tu
              hogar.
            </p>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
              Tienda
            </h3>
            <ul className="space-y-2">
              {footerLinks.tienda.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
              Empresa
            </h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Bronco&apos;s Market. Todos los derechos reservados.
          </p>
          <p>
            Design &amp; Dev by{' '}
            <Link
              href="https://dlampatricio.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              David Lam
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
