import { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const siteUrl = "https://broncosmarket.vercel.app";
const defaultOgImage = `${siteUrl}/og-image.png`;

async function getProduct(slug: string) {
  const res = await fetch(
    `${API_URL}/api/products?filters[slug][$eq]=${slug}&populate[images][fields][0]=url&populate[images][fields][1]=formats&populate[category][fields][0]=categoryName&populate[category][fields][1]=slug&pagination[limit]=1`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.data?.[0] || null;
}

type Props = { params: Promise<{ productSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getProduct(productSlug);
  if (!product) return { title: "Producto no encontrado" };

  const productImage = product.images?.[0]
    ? product.images[0].formats?.medium?.url || product.images[0].url
    : defaultOgImage;

  return {
    title: product.productName,
    description: product.description,
    alternates: {
      canonical: `${siteUrl}/product/${product.slug}`,
    },
    openGraph: {
      title: product.productName,
      description: product.description,
      url: `${siteUrl}/product/${product.slug}`,
      images: [
        {
          url: productImage,
          width: 600,
          height: 600,
          alt: product.productName,
        },
      ],
      type: "website",
      siteName: "Bronco's Market",
    },
    twitter: {
      card: "summary_large_image",
      title: product.productName,
      description: product.description,
      images: [productImage],
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
