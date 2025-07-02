export type CategoryType = {
  id: string;
  categoryName: string;
  slug: string;
  mainImage: {
    formats: {
      medium: {
        url: string;
      }
    }
  };
  homeImage: {
    formats: {
      medium: {
        url: string;
      }
    }
  };
}