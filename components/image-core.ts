export type OutputMime = "image/jpeg" | "image/png" | "image/webp";
export type CropPosition = { x: number; y: number };

export function extensionForMime(mime: string) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "png";
}

export function cropRect(sourceWidth: number, sourceHeight: number, targetRatio: number, position: CropPosition) {
  const sourceRatio = sourceWidth / sourceHeight;
  if (Math.abs(sourceRatio - targetRatio) < 0.0001) return { x: 0, y: 0, width: sourceWidth, height: sourceHeight };
  if (sourceRatio > targetRatio) {
    const width = sourceHeight * targetRatio;
    return { x: (sourceWidth - width) * position.x, y: 0, width, height: sourceHeight };
  }
  const height = sourceWidth / targetRatio;
  return { x: 0, y: (sourceHeight - height) * position.y, width: sourceWidth, height };
}

export function fitSize(sourceWidth: number, sourceHeight: number, maxWidth?: number, maxHeight?: number) {
  const widthLimit = maxWidth && maxWidth > 0 ? maxWidth : Infinity;
  const heightLimit = maxHeight && maxHeight > 0 ? maxHeight : Infinity;
  const scale = Math.min(1, widthLimit / sourceWidth, heightLimit / sourceHeight);
  return { width: Math.max(1, Math.round(sourceWidth * scale)), height: Math.max(1, Math.round(sourceHeight * scale)) };
}

export function outputFileName(originalName: string, action: "compressed" | "resized" | "converted", mime: string) {
  const base = originalName.replace(/\.[^/.]+$/, "") || "image";
  return `${base}_${action}.${extensionForMime(mime)}`;
}
