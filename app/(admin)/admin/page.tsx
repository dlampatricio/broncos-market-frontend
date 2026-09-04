"use client";

import { useAdminProducts, useAdminCategories } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Tags, TrendingUp, Eye } from "lucide-react";
import Link from "next/link";
import type { ProductType } from "@/types/product";
import SkeletonCard from "@/components/admin/skeleton-card";
import { useAdminToken } from "@/hooks/use-admin-token";

export default function AdminDashboard() {
  const token = useAdminToken();
  const { data: productsData, isLoading: loadingProducts } = useAdminProducts(token);
  const { data: categoriesData, isLoading: loadingCategories } = useAdminCategories(token);

  const products = productsData?.data || [];
  const totalProducts = products.length;
  const activeProducts = products.filter((p: ProductType) => p.active).length;
  const featuredProducts = products.filter((p: ProductType) => p.isFeatured).length;
  const totalCategories = categoriesData?.data?.length || 0;

  const stats = [
    { title: "Productos totales", value: totalProducts, icon: Package, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950" },
    { title: "Productos activos", value: activeProducts, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950" },
    { title: "Destacados", value: featuredProducts, icon: Eye, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950" },
    { title: "Categorías", value: totalCategories, icon: Tags, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loadingProducts || loadingCategories
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon size={18} className={stat.color} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Accesos rápidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Package size={18} className="text-red-900 dark:text-red-500" />
              <span className="font-medium">Gestionar productos</span>
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Tags size={18} className="text-red-900 dark:text-red-500" />
              <span className="font-medium">Gestionar categorías</span>
            </Link>
            <Link href="/" target="_blank" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <Eye size={18} className="text-red-900 dark:text-red-500" />
              <span className="font-medium">Ver tienda</span>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Últimos productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {products.slice(0, 5).map((product: ProductType) => (
                <div key={product.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                  <span className="text-sm font-medium truncate">{product.productName}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.active
                      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                  }`}>
                    {product.active ? "Activo" : "Inactivo"}
                  </span>
                </div>
              ))}
              {products.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No hay productos aún</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
