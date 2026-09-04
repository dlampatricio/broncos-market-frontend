"use client";

import { useParams } from "next/navigation";
import ProductForm from "@/components/admin/product-form";

export default function EditProductPage() {
  const params = useParams();
  const { documentId } = params as { documentId: string };

  return <ProductForm mode="edit" documentId={documentId} />;
}
