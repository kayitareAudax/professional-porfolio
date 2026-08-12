import { useRef, useState } from "react";
import { UploadCloud, Loader2, X } from "lucide-react";
import { adminUploadImage } from "../../services/portfolio";

export function ImageUploadField({
  label = "Image",
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await adminUploadImage(file);
      onChange(url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-3">
        {value && (
          <div className="relative shrink-0">
            <img
              src={value}
              alt=""
              className="w-16 h-16 object-cover border border-border"
              style={{ borderRadius: "2px" }}
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground p-0.5"
              style={{ borderRadius: "9999px" }}
            >
              <X size={10} />
            </button>
          </div>
        )}
        <label
          className="flex items-center gap-2 border border-dashed border-border px-3 py-2.5 text-xs text-muted-foreground hover:text-primary hover:border-primary/40 cursor-pointer transition-colors"
          style={{ borderRadius: "2px" }}
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <UploadCloud size={14} />
          )}
          {uploading ? "Uploading..." : value ? "Replace image" : "Upload image"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      </div>
      {error && <p className="font-mono text-[10px] text-destructive mt-1.5">{error}</p>}
    </div>
  );
}
