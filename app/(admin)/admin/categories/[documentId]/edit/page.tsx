"use client";

import { useParams } from "next/navigation";
import CategoryForm from "@/components/admin/category-form";

export default function EditCategoryPage() {
  const params = useParams();
  const { documentId } = params as { documentId: string };

  return <CategoryForm mode="edit" documentId={documentId} />;
}
