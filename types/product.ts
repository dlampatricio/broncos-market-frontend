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
    formats: {
      small: {
        url: string;
      }
    }
  }[];
  category: {
      slug: string;
      categoryName: string;
  };
  weight: string;
  familySize: string;
  min: number;
}