import { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const siteUrl = "https://broncosmarket.vercel.app";
const defaultOgImage = `${siteUrl}/og-image.png`;

async function getCategory(slug: string) {
  const res = await fetch(
    `${API_URL}/api/categories?filters[slug][$eq]=${slug}&populate=homeImage&pagination[limit]=1`,
    { next: { revalidate: 600 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.data?.[0] || null;
}

type Props = { params: Promise<{ categorySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategory(categorySlug);
  const name = category?.categoryName || categorySlug;

  const categoryImage = category?.homeImage
    ? category.homeImage.formats?.medium?.url || category.homeImage.url
    : defaultOgImage;

  return {
    title: name,
    description: `Explora productos de ${name} en Bronco's Market. Envíos rápidos a Cienfuegos y alrededores.`,
    alternates: {
      canonical: `${siteUrl}/category/${categorySlug}`,
    },
    openGraph: {
      title: `${name} | Bronco's Market`,
      description: `Explora productos de ${name} en Bronco's Market.`,
      url: `${siteUrl}/category/${categorySlug}`,
      images: [
        {
          url: categoryImage,
          width: 600,
          height: 600,
          alt: name,
        },
      ],
      type: "website",
      siteName: "Bronco's Market",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Bronco's Market`,
      description: `Explora productos de ${name} en Bronco's Market.`,
      images: [categoryImage],
    },
  };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
