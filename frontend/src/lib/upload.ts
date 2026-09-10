import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";

const cloudName = (
  process.env.CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_NAME ||
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  "lpxtww2i"
).trim();

const rawApiKey =
  process.env.CLOUDINARY_API_KEY || process.env.CLOUDINAY_KEY || "";
const apiKey = rawApiKey.replace(/^fS-/, "").trim();
const apiSecret = (process.env.CLOUDINARY_SECRET || "").trim();

const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export async function saveUploadedFile(
  file: File,
  folder: string = "portfolio",
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (isCloudinaryConfigured) {
    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          overwrite: true,
        },
        (error, result) => {
          if (error || !result) {
            reject(
              new Error(
                error?.message || "Failed to upload image to Cloudinary",
              ),
            );
          } else {
            resolve(result.secure_url);
          }
        },
      );
      uploadStream.end(buffer);
    });
  }

  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  const ext = path.extname(file.name) || ".png";
  const baseName = path
    .basename(file.name, ext)
    .replace(/[^a-zA-Z0-9_-]/g, "_");
  const uniqueName = `${baseName}_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 6)}${ext}`;
  const filePath = path.join(UPLOADS_DIR, uniqueName);

  await fs.writeFile(filePath, buffer);
  return `/uploads/${uniqueName}`;
}

export async function removeUploadedFile(
  imageUrl?: string | null,
): Promise<void> {
  if (!imageUrl) return;

  if (isCloudinaryConfigured && imageUrl.includes("res.cloudinary.com")) {
    try {
      const uploadIndex = imageUrl.indexOf("/upload/");
      if (uploadIndex !== -1) {
        let pathAfterUpload = imageUrl.substring(uploadIndex + 8);
        pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, "");
        const dotIndex = pathAfterUpload.lastIndexOf(".");
        const publicId =
          dotIndex !== -1
            ? pathAfterUpload.substring(0, dotIndex)
            : pathAfterUpload;
        await cloudinary.uploader.destroy(publicId, { invalidate: true });
      }
    } catch (err) {
      console.warn("Failed to delete image from Cloudinary:", err);
    }
    return;
  }

  if (imageUrl.startsWith("/uploads/")) {
    try {
      const filePath = path.join(
        process.cwd(),
        "public",
        imageUrl.replace(/^\//, ""),
      );
      await fs.unlink(filePath).catch(() => {});
    } catch {
      // ignore
    }
  }
}
