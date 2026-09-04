"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/schemas/product";
import { useAdminCategories } from "@/lib/api";
import { uploadImages } from "@/lib/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import ImageUpload from "./image-upload";
import { ProductImage } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

interface ProductFormProps {
  mode: "new" | "edit";
  documentId?: string;
}

export default function ProductForm({ mode, documentId }: ProductFormProps) {
  const router = useRouter();
  const token = localStorage.getItem("admin_token") || "";
  const { data: categoriesData } = useAdminCategories(token);
  const categories = categoriesData?.data || [];

  const [images, setImages] = useState<ProductImage[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(mode === "edit");

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      description: "",
      price: "",
      min: "1",
      active: true,
      isFeatured: false,
      category: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = form;

  useEffect(() => {
    if (mode === "edit" && documentId) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(
            `${API_URL}/api/products?filters[documentId][$eq]=${documentId}&populate=images&populate=category`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = await res.json();
          const product = data.data?.[0];
          if (product) {
            form.reset({
              productName: product.productName,
              description: product.description,
              price: String(product.price),
              min: String(product.min || 1),
              active: product.active,
              isFeatured: product.isFeatured,
              category: String(product.category?.id || ""),
            });
            setImages(product.images || []);
          }
        } catch {
          toast.error("Error al cargar producto");
        } finally {
          setLoadingProduct(false);
        }
      };
      fetchProduct();
    }
  }, [mode, documentId, token, form]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const onSubmit = async (data: ProductFormData) => {
    setSaving(true);
    try {
      const endpoint =
        mode === "new"
          ? `${API_URL}/api/products`
          : `${API_URL}/api/products/${documentId}`;
      const method = mode === "new" ? "POST" : "PUT";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            productName: data.productName,
            description: data.description,
            price: parseFloat(data.price),
            min: parseInt(data.min) || 1,
            active: data.active,
            isFeatured: data.isFeatured,
            category: parseInt(data.category),
          },
        }),
      });

      if (!res.ok) throw new Error("Error");
      const productData = await res.json();
      const id = productData.data.documentId;

      if (mode === "new" && images.length > 0) {
        const files = images.map((img) => img as unknown as File);
        await uploadImages(files, "api::product.product", "images", id, token);
      }

      toast.success(mode === "new" ? "Producto creado" : "Producto actualizado");
      router.push("/admin/products");
    } catch {
      toast.error("Error al guardar el producto");
    } finally {
      setSaving(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 size={20} className="animate-spin mr-2" />
        Cargando producto...
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {mode === "new" ? "Nuevo Producto" : "Editar Producto"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Nombre del producto *</Label>
              <Input
                id="productName"
                {...register("productName")}
                placeholder="Ej: Combo Familia"
              />
              {errors.productName && (
                <p className="text-sm text-destructive">{errors.productName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Describe el producto..."
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price")}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="min">Cantidad mínima</Label>
                <Input
                  id="min"
                  type="number"
                  min="1"
                  {...register("min")}
                />
                {errors.min && (
                  <p className="text-sm text-destructive">{errors.min.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Categoría *</Label>
              <Select
                value={watch("category")}
                onValueChange={(v) => setValue("category", v, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat: { id: string; categoryName: string }) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category.message}</p>
              )}
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Switch
                  checked={watch("active")}
                  onCheckedChange={(v) => setValue("active", v, { shouldDirty: true })}
                />
                <Label>Activo</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={watch("isFeatured")}
                  onCheckedChange={(v) => setValue("isFeatured", v, { shouldDirty: true })}
                />
                <Label>Destacado</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imágenes</CardTitle>
          </CardHeader>
          <CardContent>
            {mode === "edit" && documentId ? (
              <ImageUpload
                token={token}
                refType="api::product.product"
                refField="images"
                documentId={documentId}
                existingImages={images}
                onImagesChange={setImages}
              />
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <span className="text-sm text-muted-foreground">
                  Sube imágenes después de crear el producto
                </span>
              </label>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/products">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" className="bg-red-900 hover:bg-red-800" disabled={saving}>
            {saving && <Loader2 size={16} className="mr-2 animate-spin" />}
            {saving ? "Guardando..." : mode === "new" ? "Crear producto" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
