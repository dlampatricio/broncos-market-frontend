export type CategoryType = {
  id: string;
  documentId: string;
  categoryName: string;
  slug: string;
  mainImage: {
    id: number;
    url: string;
    formats: {
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  homeImage: {
    id: number;
    url: string;
    formats: {
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  createdAt: string;
  updatedAt: string;
};

export type StrapiResponse<T> = {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data: T;
};
