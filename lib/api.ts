"use client";

import { useQuery } from "@tanstack/react-query";
import { API_URL } from "./config";
import type { ProductType } from "@/types/product";
import type { CategoryType, StrapiResponse } from "@/types/category";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

const POPULATE_IMAGES = "populate[images][fields][0]=url&populate[images][fields][1]=formats";
const POPULATE_CATEGORY = "populate[category][fields][0]=categoryName&populate[category][fields][1]=slug";
const POPULATE_MAIN_IMAGE = "populate[mainImage][fields][0]=url&populate[mainImage][fields][1]=formats";
const POPULATE_HOME_IMAGE = "populate[homeImage][fields][0]=url&populate[homeImage][fields][1]=formats";

const PRODUCTS_POPULATE = `${POPULATE_IMAGES}&${POPULATE_CATEGORY}`;
const CATEGORIES_POPULATE = `${POPULATE_MAIN_IMAGE}&${POPULATE_HOME_IMAGE}`;

const defaultQueryOptions = {
  retry: 2,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 10000),
};

// ─── Products ──────────────────────────────────────

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetchAPI<StrapiResponse<ProductType>>(
        `/api/products?${PRODUCTS_POPULATE}&sort=productName:asc&pagination[limit]=1000`
      ),
    staleTime: 5 * 60 * 1000,
    ...defaultQueryOptions,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: () =>
      fetchAPI<StrapiResponse<ProductType>>(
        `/api/products?filters[isFeatured][$eq]=true&${PRODUCTS_POPULATE}&pagination[limit]=1000`
      ),
    staleTime: 5 * 60 * 1000,
    ...defaultQueryOptions,
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () =>
      fetchAPI<StrapiResponse<ProductType>>(
        `/api/products?${PRODUCTS_POPULATE}&filters[slug][$eq]=${slug}&pagination[limit]=1`
      ),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
    ...defaultQueryOptions,
  });
}

export function useProductsByCategory(slug: string) {
  return useQuery({
    queryKey: ["products", "category", slug],
    queryFn: () =>
      fetchAPI<StrapiResponse<ProductType>>(
        `/api/products?${PRODUCTS_POPULATE}&filters[category][slug][$eq]=${slug}&sort=productName:asc&pagination[limit]=1000`
      ),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
    ...defaultQueryOptions,
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ["products", "search", query],
    queryFn: async () => {
      const nameResults = await fetchAPI<StrapiResponse<ProductType>>(
        `/api/products?${PRODUCTS_POPULATE}&filters[productName][$containsi]=${encodeURIComponent(query)}&sort=productName:asc&pagination[limit]=1000`
      );
      const descResults = await fetchAPI<StrapiResponse<ProductType>>(
        `/api/products?${PRODUCTS_POPULATE}&filters[description][$containsi]=${encodeURIComponent(query)}&sort=productName:asc&pagination[limit]=1000`
      );
      const seen = new Set<string>();
      const merged: ProductType[] = [];
      for (const p of [...nameResults.data, ...descResults.data]) {
        if (!seen.has(p.id)) {
          seen.add(p.id);
          merged.push(p);
        }
      }
      return { data: merged, meta: nameResults.meta };
    },
    staleTime: 30 * 1000,
    enabled: query.length > 0,
    ...defaultQueryOptions,
  });
}

// ─── Categories ────────────────────────────────────

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetchAPI<StrapiResponse<CategoryType>>(
        `/api/categories?${CATEGORIES_POPULATE}&sort=slug:asc&pagination[limit]=1000`
      ),
    staleTime: 10 * 60 * 1000,
    ...defaultQueryOptions,
  });
}

// ─── Admin CRUD ────────────────────────────────────

export async function adminLogin(identifier: string, password: string) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: identifier, password }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error?.message || "Credenciales inválidas");
  }
  return res.json();
}

export function useAdminProducts(token: string) {
  return useQuery({
    queryKey: ["admin", "products"],
    queryFn: () =>
      fetchAPI<StrapiResponse<ProductType>>(
        `/api/products?${PRODUCTS_POPULATE}&sort=productName:asc&pagination[limit]=1000`
      ),
    staleTime: 30 * 1000,
    enabled: !!token,
    ...defaultQueryOptions,
  });
}

export function useAdminCategories(token: string) {
  return useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () =>
      fetchAPI<StrapiResponse<CategoryType>>(
        `/api/categories?${CATEGORIES_POPULATE}&sort=slug:asc&pagination[limit]=1000`
      ),
    staleTime: 30 * 1000,
    enabled: !!token,
    ...defaultQueryOptions,
  });
}
