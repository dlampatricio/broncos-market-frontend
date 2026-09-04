"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, type CategoryFormData } from "@/schemas/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import ImageUpload from "./image-upload";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

interface CategoryFormProps {
  mode: "new" | "edit";
  documentId?: string;
}

interface CategoryImage {
  id: number;
  url: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
  };
}

export default function CategoryForm({ mode, documentId }: CategoryFormProps) {
  const router = useRouter();
  const token = localStorage.getItem("admin_token") || "";

  const [mainImage, setMainImage] = useState<CategoryImage[]>([]);
  const [homeImage, setHomeImage] = useState<CategoryImage[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(mode === "edit");

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { categoryName: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (mode === "edit" && documentId) {
      const fetchCategory = async () => {
        try {
          const res = await fetch(
            `${API_URL}/api/categories?filters[documentId][$eq]=${documentId}&populate=mainImage&populate=homeImage`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = await res.json();
          const cat = data.data?.[0];
          if (cat) {
            form.reset({ categoryName: cat.categoryName });
            if (cat.mainImage) setMainImage([cat.mainImage]);
            if (cat.homeImage) setHomeImage([cat.homeImage]);
          }
        } catch {
          toast.error("Error al cargar categoría");
        } finally {
          setLoadingCategory(false);
        }
      };
      fetchCategory();
    }
  }, [mode, documentId, token, form]);

  const onSubmit = async (data: CategoryFormData) => {
    setSaving(true);
    try {
      const endpoint =
        mode === "new"
          ? `${API_URL}/api/categories`
          : `${API_URL}/api/categories/${documentId}`;
      const method = mode === "new" ? "POST" : "PUT";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: { categoryName: data.categoryName } }),
      });

      if (!res.ok) throw new Error("Error");

      toast.success(mode === "new" ? "Categoría creada" : "Categoría actualizada");
      router.push("/admin/categories");
    } catch {
      toast.error("Error al guardar la categoría");
    } finally {
      setSaving(false);
    }
  };

  if (loadingCategory) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 size={20} className="animate-spin mr-2" />
        Cargando categoría...
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories">
          <Button variant="ghost" size="icon">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          {mode === "new" ? "Nueva Categoría" : "Editar Categoría"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Nombre de la categoría *</Label>
              <Input
                id="categoryName"
                {...register("categoryName")}
                placeholder="Ej: Combos, Lácteos, Bebidas..."
              />
              {errors.categoryName && (
                <p className="text-sm text-destructive">{errors.categoryName.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagen principal (página de categoría)</CardTitle>
          </CardHeader>
          <CardContent>
            {mode === "edit" && documentId ? (
              <ImageUpload
                token={token}
                refType="api::category.category"
                refField="mainImage"
                documentId={documentId}
                existingImages={mainImage}
                onImagesChange={setMainImage}
              />
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <span className="text-sm text-muted-foreground">
                  Sube la imagen después de crear la categoría
                </span>
              </label>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagen de inicio (portada)</CardTitle>
          </CardHeader>
          <CardContent>
            {mode === "edit" && documentId ? (
              <ImageUpload
                token={token}
                refType="api::category.category"
                refField="homeImage"
                documentId={documentId}
                existingImages={homeImage}
                onImagesChange={setHomeImage}
              />
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <span className="text-sm text-muted-foreground">
                  Sube la imagen después de crear la categoría
                </span>
              </label>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/categories">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" className="bg-red-900 hover:bg-red-800" disabled={saving}>
            {saving && <Loader2 size={16} className="mr-2 animate-spin" />}
            {saving ? "Guardando..." : mode === "new" ? "Crear categoría" : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
