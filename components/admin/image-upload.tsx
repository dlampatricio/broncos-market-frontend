"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Upload, X, GripVertical, Loader2 } from "lucide-react";
import { uploadImage, deleteImage, validateImageFile, UploadError } from "@/lib/upload";
import { toast } from "sonner";

interface ExistingImage {
  id: number;
  url: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

interface ImageUploadProps {
  token: string;
  refType: string;
  refField: string;
  documentId: string;
  existingImages: ExistingImage[];
  onImagesChange: (images: ExistingImage[]) => void;
}

function SortableImage({
  id,
  url,
  alt,
  onRemove,
  isUploading,
  progress,
}: {
  id: string;
  url: string;
  alt: string;
  onRemove: () => void;
  isUploading?: boolean;
  progress?: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group aspect-square rounded-lg overflow-hidden bg-muted border-2 border-transparent hover:border-border transition-colors"
    >
      <img src={url} alt={alt} className="w-full h-full object-cover" />

      {isUploading && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
          <Loader2 size={20} className="text-white animate-spin" />
          <span className="text-white text-xs font-medium">{progress ?? 0}%</span>
        </div>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
        aria-label="Eliminar imagen"
      >
        <X size={14} />
      </button>

      <div
        {...attributes}
        {...listeners}
        className="absolute bottom-1 left-1 bg-black/70 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        aria-label="Reordenar imagen"
      >
        <GripVertical size={14} />
      </div>
    </div>
  );
}

export default function ImageUpload({
  token,
  refType,
  refField,
  documentId,
  existingImages,
  onImagesChange,
}: ImageUploadProps) {
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [localPreviews, setLocalPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState<Record<number, number>>({});

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = existingImages.findIndex((img) => `existing-${img.id}` === active.id);
    const newIndex = existingImages.findIndex((img) => `existing-${img.id}` === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      onImagesChange(arrayMove(existingImages, oldIndex, newIndex));
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";

    const validFiles: File[] = [];
    for (const file of files) {
      try {
        validateImageFile(file);
        validFiles.push(file);
      } catch (err) {
        if (err instanceof UploadError) {
          toast.error(err.message);
        }
      }
    }

    if (validFiles.length === 0) return;

    const previews = validFiles.map((f) => URL.createObjectURL(f));
    setLocalFiles((prev) => [...prev, ...validFiles]);
    setLocalPreviews((prev) => [...prev, ...previews]);

    for (let i = 0; i < validFiles.length; i++) {
      const localIdx = localFiles.length + i;
      setUploading((prev) => ({ ...prev, [localIdx]: 0 }));
      try {
        await uploadImage(
          validFiles[i],
          refType,
          refField,
          documentId,
          token,
          (p) => setUploading((prev) => ({ ...prev, [localIdx]: p }))
        );
        const newImage = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${refType.split("::")[1].split(".")[0]}s?filters[documentId][$eq]=${documentId}&populate=${refField}`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then((r) => r.json());

        const uploadedImages = newImage.data?.[0]?.[refField];
        if (uploadedImages?.length) {
          onImagesChange([...existingImages, ...uploadedImages]);
        }
      } catch {
        toast.error("Error al subir imagen");
      } finally {
        setUploading((prev) => {
          const next = { ...prev };
          delete next[localIdx];
          return next;
        });
      }
    }

    setLocalFiles([]);
    setLocalPreviews([]);
  };

  const removeExisting = useCallback(
    async (imageId: number) => {
      try {
        await deleteImage(imageId, token);
        onImagesChange(existingImages.filter((img) => img.id !== imageId));
        toast.success("Imagen eliminada");
      } catch {
        toast.error("Error al eliminar imagen");
      }
    },
    [token, existingImages, onImagesChange]
  );

  const removeLocal = useCallback((index: number) => {
    setLocalFiles((prev) => prev.filter((_, i) => i !== index));
    setLocalPreviews((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const allItems = [
    ...existingImages.map((img) => `existing-${img.id}`),
    ...localPreviews.map((_, i) => `local-${i}`),
  ];

  return (
    <div className="space-y-4">
      {existingImages.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={allItems} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {existingImages.map((img) => (
                <SortableImage
                  key={`existing-${img.id}`}
                  id={`existing-${img.id}`}
                  url={img.formats?.small?.url || img.formats?.medium?.url || img.url}
                  alt=""
                  onRemove={() => removeExisting(img.id)}
                />
              ))}
              {localPreviews.map((preview, i) => (
                <div key={`local-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <img src={preview} alt="" className="w-full h-full object-cover" />
                  {uploading[i] !== undefined && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                      <Loader2 size={20} className="text-white animate-spin" />
                      <span className="text-white text-xs font-medium">{uploading[i]}%</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeLocal(i)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    aria-label="Eliminar imagen"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
        <span className="text-sm text-muted-foreground">Click para subir imágenes (max 5MB)</span>
        <span className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP, AVIF, GIF</span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </label>
    </div>
  );
}
