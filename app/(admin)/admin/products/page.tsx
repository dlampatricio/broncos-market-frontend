"use client";

import { useAdminProducts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, Pencil, Trash2, Star, PackageOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProductType } from "@/types/product";
import { formatPrice } from "@/lib/format-price";
import OptimizedImage from "@/components/optimized-image";
import { toast } from "sonner";
import ConfirmDialog from "@/components/admin/confirm-dialog";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function AdminProductsPage() {
  const token = localStorage.getItem("admin_token") || "";
  const { data, isLoading, refetch } = useAdminProducts(token);
  const [search, setSearch] = useState("");
  const [deletingProduct, setDeletingProduct] = useState<ProductType | null>(null);
  const [deleting, setDeleting] = useState(false);

  const products = data?.data || [];
  const filtered = products.filter((p: ProductType) =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deletingProduct) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/api/products/${deletingProduct.documentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Producto eliminado");
        refetch();
      } else {
        toast.error("Error al eliminar el producto");
      }
    } catch {
      toast.error("Error de conexión");
    } finally {
      setDeleting(false);
      setDeletingProduct(null);
    }
  };

  const toggleActive = async (product: ProductType) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${product.documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: { active: !product.active } }),
      });
      if (res.ok) {
        toast.success(product.active ? "Producto desactivado" : "Producto activado");
        refetch();
      }
    } catch {
      toast.error("Error al actualizar");
    }
  };

  const toggleFeatured = async (product: ProductType) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${product.documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: { isFeatured: !product.isFeatured } }),
      });
      if (res.ok) {
        toast.success(product.isFeatured ? "Removido de destacados" : "Marcado como destacado");
        refetch();
      }
    } catch {
      toast.error("Error al actualizar");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Productos ({filtered.length})</h1>
        <Link href="/admin/products/new">
          <Button className="bg-red-900 hover:bg-red-800">
            <Plus size={18} className="mr-2" />
            Nuevo producto
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar producto..."
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
          <p>No se encontraron productos</p>
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
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Precio</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Categoría</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Activo</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Dest.</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product: ProductType) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2">
                      <div className="w-10 h-10 relative rounded-md overflow-hidden bg-muted">
                        {product.images?.[0] ? (
                          <OptimizedImage
                            src={product.images[0].formats?.small?.url || product.images[0].formats?.medium?.url || product.images[0].url}
                            alt={product.productName}
                            fill
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">-</div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{product.productName}</span>
                        {product.isFeatured && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm">{formatPrice(product.price)}</td>
                    <td className="py-3 px-2 text-sm text-muted-foreground">{product.category?.categoryName || "-"}</td>
                    <td className="py-3 px-2 text-center">
                      <Switch checked={product.active} onCheckedChange={() => toggleActive(product)} aria-label="Toggle activo" />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Switch checked={product.isFeatured} onCheckedChange={() => toggleFeatured(product)} aria-label="Toggle destacado" />
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/products/${product.documentId}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Editar">
                            <Pencil size={14} />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => setDeletingProduct(product)}
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
            {filtered.map((product: ProductType) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {product.images?.[0] ? (
                        <OptimizedImage
                          src={product.images[0].formats?.small?.url || product.images[0].formats?.medium?.url || product.images[0].url}
                          alt={product.productName}
                          fill
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">sin img</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm truncate">{product.productName}</h3>
                        {product.isFeatured && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                      <p className="text-xs text-muted-foreground">{product.category?.categoryName || "Sin categoría"}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 text-xs">
                        <Switch checked={product.active} onCheckedChange={() => toggleActive(product)} className="scale-75" />
                        Activo
                      </label>
                      <label className="flex items-center gap-1.5 text-xs">
                        <Switch checked={product.isFeatured} onCheckedChange={() => toggleFeatured(product)} className="scale-75" />
                        Dest.
                      </label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/products/${product.documentId}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Editar">
                          <Pencil size={14} />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeletingProduct(product)}
                        aria-label="Eliminar"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <ConfirmDialog
        open={!!deletingProduct}
        onConfirm={handleDelete}
        onCancel={() => setDeletingProduct(null)}
        title="Eliminar producto"
        description={`¿Estás seguro de eliminar "${deletingProduct?.productName}"? Esta acción no se puede deshacer.`}
        loading={deleting}
      />
    </div>
  );
}
