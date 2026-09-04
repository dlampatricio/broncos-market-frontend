import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Link href="/" aria-label="Bronco's Market - Inicio">
            <span className="text-lg font-bold text-red-900 dark:text-red-500">BRONCO&apos;S</span>
            <span className="text-lg font-light text-red-900/60 dark:text-red-500/60 ml-1">MARKET</span>
          </Link>

          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/about-us" className="hover:text-foreground transition-colors">Sobre Nosotros</Link>
            <span className="text-border">·</span>
            <Link href="/all-products" className="hover:text-foreground transition-colors">Productos</Link>
          </nav>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>© {new Date().getFullYear()} Bronco&apos;s Market</p>
            <p>
              Design &amp; Dev by{" "}
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
      </div>
    </footer>
  );
};

export default Footer;
