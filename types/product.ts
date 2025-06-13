export type ProductType = {
  id: string;
  productName: string;
  slug: string;
  active: boolean;
  isFeatured: boolean;
  price: number;
  images: {
      id: number;
      url: string;
    }[];
  category: {
    data: {
      slug: string;
      categoryName: string;
    }
  };
}