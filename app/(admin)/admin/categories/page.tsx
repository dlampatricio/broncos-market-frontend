"use client";

import { useAdminCategories, useAdminProducts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Pencil, Trash2, PackageOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CategoryType } from "@/types/category";
import { ProductType } from "@/types/product";
import OptimizedImage from "@/components/optimized-image";
import { toast } from "sonner";
import ConfirmDialog from "@/components/admin/confirm-dialog";
import { useAdminToken } from "@/hooks/use-admin-token";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function AdminCategoriesPage() {
  const token = useAdminToken();
  const { data, isLoading, refetch } = useAdminCategories(token);
  const { data: productsData } = useAdminProducts(token);
  const [search, setSearch] = useState("");
  const [deletingCategory, setDeletingCategory] = useState<CategoryType | null>(null);
  const [deleting, setDeleting] = useState(false);

  const categories = data?.data || [];
  const products = productsData?.data || [];

  const getCategoryProductCount = (categorySlug: string) =>
    products.filter((p: ProductType) => p.category?.slug === categorySlug).length;

  const filtered = categories.filter((c: CategoryType) =>
    c.categoryName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deletingCategory) return;
    const productCount = getCategoryProductCount(deletingCategory.slug);
    if (productCount > 0) {
      toast.error(`No se puede eliminar: hay ${productCount} productos en esta categoría`);
      setDeletingCategory(null);
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/api/categories/${deletingCategory.documentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Categoría eliminada");
        refetch();
      } else {
        toast.error("Error al eliminar");
      }
    } catch {
      toast.error("Error de conexión");
    } finally {
      setDeleting(false);
      setDeletingCategory(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Categorías ({filtered.length})</h1>
        <Link href="/admin/categories/new">
          <Button className="bg-red-900 hover:bg-red-800">
            <Plus size={18} className="mr-2" />
            Nueva categoría
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8 text-muted-foreground">Cargando...</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <PackageOpen size={40} className="mb-4 opacity-50" />
          <p>No se encontraron categorías</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground w-12">Img</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Nombre</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Slug</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Productos</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((category: CategoryType) => (
                  <tr key={category.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2">
                      <div className="w-10 h-10 relative rounded-md overflow-hidden bg-muted">
                        {category.homeImage ? (
                          <OptimizedImage
                            src={category.homeImage.formats?.small?.url || category.homeImage.formats?.medium?.url || category.homeImage.url}
                            alt={category.categoryName}
                            fill
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">-</div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 font-medium text-sm">{category.categoryName}</td>
                    <td className="py-3 px-2 text-sm text-muted-foreground">{category.slug}</td>
                    <td className="py-3 px-2 text-center">
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {getCategoryProductCount(category.slug)}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/categories/${category.documentId}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Editar">
                            <Pencil size={14} />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => setDeletingCategory(category)}
                          aria-label="Eliminar"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden grid gap-3">
            {filtered.map((category: CategoryType) => (
              <Card key={category.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 relative rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {category.homeImage ? (
                        <OptimizedImage
                          src={category.homeImage.formats?.small?.url || category.homeImage.formats?.medium?.url || category.homeImage.url}
                          alt={category.categoryName}
                          fill
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">-</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{category.categoryName}</h3>
                      <p className="text-xs text-muted-foreground">{category.slug}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground mt-1 inline-block">
                        {getCategoryProductCount(category.slug)} productos
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-3 pt-3 border-t border-border gap-1">
                    <Link href={`/admin/categories/${category.documentId}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Editar">
                        <Pencil size={14} />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeletingCategory(category)}
                      aria-label="Eliminar"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <ConfirmDialog
        open={!!deletingCategory}
        onConfirm={handleDelete}
        onCancel={() => setDeletingCategory(null)}
        title="Eliminar categoría"
        description={`¿Estás seguro de eliminar "${deletingCategory?.categoryName}"? Esta acción no se puede deshacer.`}
        loading={deleting}
      />
    </div>
  );
}
