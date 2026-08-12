import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Achievement } from "../../types";
import { inputCls } from "../../data/constants";
import { adminCreateAchievement, adminDeleteAchievement } from "../../services/portfolio";
import { ImageUploadField } from "./ImageUploadField";

export function AdminAchievements({
  achievements,
  setAchievements,
}: {
  achievements: Achievement[];
  setAchievements: () => Promise<void>;
}) {
  const blank = (): Achievement => ({
    id: "",
    title: "",
    issuer: "",
    date: "",
    type: "certificate",
    description: "",
    url: "",
    image: "",
  });
  const [form, setForm] = useState<Achievement>(blank());
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!form.title.trim() || busy) return;
    setBusy(true);
    try {
      await adminCreateAchievement({
        title: form.title.trim(),
        issuer: form.issuer.trim(),
        date: form.date.trim(),
        type: form.type,
        description: form.description.trim(),
        url: form.url || undefined,
        imageUrl: form.image || undefined,
      });
      await setAchievements();
      setForm(blank());
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (busy) return;
    setBusy(true);
    try {
      await adminDeleteAchievement(id);
      await setAchievements();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      <div
        className="border border-border p-5 space-y-4"
        style={{ borderRadius: "2px" }}
      >
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          Add Achievement
        </p>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
            Type
          </label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as Achievement["type"] })
            }
            className={inputCls}
            style={{ borderRadius: "2px" }}
          >
            <option value="certificate">Certificate</option>
            <option value="award">Award</option>
            <option value="recognition">Recognition</option>
          </select>
        </div>
        {(["title", "issuer", "date"] as const).map((key) => (
          <div key={key}>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
              {key}
            </label>
            <input
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={
                key === "date"
                  ? "Mar 2024"
                  : key === "issuer"
                    ? "Amazon Web Services"
                    : "AWS Certified Solutions Architect"
              }
              className={inputCls}
              style={{ borderRadius: "2px" }}
            />
          </div>
        ))}
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Brief description..."
            rows={3}
            className={`${inputCls} resize-none`}
            style={{ borderRadius: "2px" }}
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
            Credential URL (optional)
          </label>
          <input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://..."
            className={inputCls}
            style={{ borderRadius: "2px" }}
          />
        </div>
        <ImageUploadField
          label="Cover Image (optional)"
          value={form.image}
          onChange={(url) => setForm({ ...form, image: url })}
        />
        <div className="flex gap-2 pt-2">
          <button
            onClick={save}
            disabled={busy}
            className="flex-1 bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ borderRadius: "2px" }}
          >
            <Plus size={14} /> Add Entry
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Current Achievements ({achievements.length})
        </p>
        {achievements.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between gap-3 border border-border px-4 py-3 hover:border-primary/30 transition-colors"
            style={{ borderRadius: "2px" }}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {a.title}
              </p>
              <p className="font-mono text-xs text-primary">
                {a.issuer} · {a.date}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => remove(a.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
