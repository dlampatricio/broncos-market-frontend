const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export class UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadError";
  }
}

export function validateImageFile(file: File): void {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new UploadError(`Tipo no permitido: ${file.type}. Usa JPG, PNG, WebP, AVIF o GIF.`);
  }
  if (file.size > MAX_FILE_SIZE) {
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    throw new UploadError(`La imagen pesa ${mb}MB. El máximo es 5MB.`);
  }
}

export async function uploadImage(
  file: File,
  ref: string,
  refField: string,
  documentId: string,
  token: string,
  onProgress?: (percent: number) => void
): Promise<{ id: number; url: string }> {
  validateImageFile(file);

  const formData = new FormData();
  formData.append("files", file);
  formData.append("ref", ref);
  formData.append("refField", refField);
  formData.append("field", refField);
  formData.append("documentId", documentId);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/api/upload`);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve(data[0]);
      } else {
        reject(new UploadError("Error al subir la imagen"));
      }
    };

    xhr.onerror = () => reject(new UploadError("Error de conexión al subir imagen"));
    xhr.send(formData);
  });
}

export async function uploadImages(
  files: File[],
  ref: string,
  refField: string,
  documentId: string,
  token: string,
  onFileProgress?: (fileIndex: number, percent: number) => void
): Promise<void> {
  for (let i = 0; i < files.length; i++) {
    await uploadImage(files[i], ref, refField, documentId, token, (p) =>
      onFileProgress?.(i, p)
    );
  }
}

export async function deleteImage(imageId: number, token: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/upload/files/${imageId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new UploadError("Error al eliminar la imagen");
}
