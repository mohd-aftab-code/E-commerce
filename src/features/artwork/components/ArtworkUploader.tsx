"use client";

import { useState } from "react";
import { UploadCloud, Loader2, CheckCircle, XCircle } from "lucide-react";
import { submitArtwork } from "../actions";

interface ArtworkUploaderProps {
  orderItemId: string;
  onSuccess?: () => void;
}

export function ArtworkUploader({ orderItemId, onSuccess }: ArtworkUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "artwork");

      // Upload to API
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // Save artwork record in DB
      await submitArtwork(orderItemId, data.url, file.name);

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsUploading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h4 className="text-lg font-bold text-green-900 mb-1">Artwork Uploaded!</h4>
        <p className="text-green-700 text-sm">Your files have been sent for proofing. We will notify you once approved.</p>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors bg-white">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 bg-brand-primary-50 rounded-full flex items-center justify-center mb-2">
          <UploadCloud className="w-8 h-8 text-brand-primary-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Upload your print-ready artwork</h3>
          <p className="text-sm text-gray-500">PDF, AI, PSD, or High-Res JPG/PNG (Max 50MB)</p>
        </div>

        <input
          type="file"
          id={`upload-${orderItemId}`}
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.ai,.psd,.jpg,.jpeg,.png"
        />

        {!file ? (
          <label
            htmlFor={`upload-${orderItemId}`}
            className="mt-4 px-6 py-2.5 bg-brand-primary-800 text-white font-semibold rounded-lg shadow-sm hover:bg-brand-primary-900 cursor-pointer transition-colors"
          >
            Select File
          </label>
        ) : (
          <div className="mt-4 flex flex-col items-center w-full max-w-sm">
            <div className="bg-gray-100 px-4 py-3 rounded-lg w-full flex items-center justify-between mb-4 border border-gray-200">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">{file.name}</span>
              <button 
                onClick={() => setFile(null)} 
                className="text-gray-400 hover:text-red-500"
                disabled={isUploading}
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full flex justify-center items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                </>
              ) : (
                "Upload & Submit Proof"
              )}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
