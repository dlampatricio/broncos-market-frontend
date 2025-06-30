export type CategoryType = {
  id: string;
  categoryName: string;
  slug: string;
  mainImage: {
    url: string;
  };
  homeImage: {
    formats: {
      medium: {
        url: string;
      }
    }
  };
}