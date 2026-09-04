export type ProductImage = {
  id: number;
  url: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
};

export type ProductCategory = {
  id: string;
  slug: string;
  categoryName: string;
};

export type ProductType = {
  id: string;
  documentId: string;
  productName: string;
  description: string;
  slug: string;
  active: boolean;
  isFeatured: boolean;
  price: number;
  min: number;
  images: ProductImage[];
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
};
