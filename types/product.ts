export type ProductType = {
  id: string;
  productName: string;
  description: string;
  slug: string;
  active: boolean;
  isFeatured: boolean;
  price: number;
  images: {
      id: number;
      url: string;
    }[];
  category: {
      slug: string;
      categoryName: string;
  };
  weight: string;
  familySize: string;
}