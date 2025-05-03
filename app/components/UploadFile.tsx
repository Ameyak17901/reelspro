"use client";
import { randomUUID } from "crypto";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface FileUploadProps {
  onSuccess: (response: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function UploadFile({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.error("Error");
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (res: IKUploadResponse) => {
    console.info("success", res);
    setUploading(false);
    setError(null);
    onSuccess(res);
  };

  const handleProgess = (event: ProgressEvent) => {
    if (event.lengthComputable && onProgress) {
      const percentComplete = (event.loaded / event.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload the video");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("Video must be smaller than 100 MB");
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("please upload a valid file (jpeg, png, webp)");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be smaller than 5 MB");
        return false;
      }
    }
    return false;
  };

  return (
    <div className="space-x-2">
      <IKUpload
        fileName={
          fileType === "video"
            ? `video/${randomUUID()}`
            : `image/${randomUUID()}`
        }
        isPrivateFile={false}
        useUniqueFileName={true}
        validateFile={validateFile}
        folder={fileType === "video" ? "/videos" : "/images"}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgess}
        onUploadStart={handleStartUpload}
        className="file-input file-input-bordered w-full"
        accept={fileType === "video" ? "video/*" : "image/*"}
      />
      {uploading && (
        <div className="flex items-center gap-2 text-sm">
          <Loader2 className="animate-spin w-4 h-4" />
          <span>Uploading...</span>
        </div>
      )}
      {error && <div className="text-error text-sm ">{error}</div>}
    </div>
  );
}
