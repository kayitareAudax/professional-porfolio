import { useState } from "react";
import { Plus, Trash2, ChevronRight } from "lucide-react";
import type { Achievement } from "../../types";
import { inputCls } from "../../data/constants";

export function AdminAchievements({
  achievements,
  setAchievements,
}: {
  achievements: Achievement[];
  setAchievements: (v: Achievement[]) => void;
}) {
  const blank = (): Achievement => ({
    id: crypto.randomUUID(),
    title: "",
    issuer: "",
    date: "",
    type: "certificate",
    description: "",
    url: "",
    image: "",
  });
  const [form, setForm] = useState<Achievement>(blank());
  const [editingId, setEditingId] = useState<string | null>(null);

  const save = () => {
    if (!form.title.trim()) return;
    if (editingId) {
      setAchievements(achievements.map((a) => (a.id === editingId ? form : a)));
      setEditingId(null);
    } else {
      setAchievements([form, ...achievements]);
    }
    setForm(blank());
  };

  const startEdit = (a: Achievement) => {
    setForm(a);
    setEditingId(a.id);
  };
  const remove = (id: string) => {
    setAchievements(achievements.filter((a) => a.id !== id));
    if (editingId === id) {
      setForm(blank());
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div
        className="border border-border p-5 space-y-4"
        style={{ borderRadius: "2px" }}
      >
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          {editingId ? "Edit Entry" : "Add Achievement"}
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
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
            Cover Image URL (optional)
          </label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            className={inputCls}
            style={{ borderRadius: "2px" }}
          />
        </div>
        <div className="flex gap-2 pt-2">
          <button
            onClick={save}
            className="flex-1 bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2"
            style={{ borderRadius: "2px" }}
          >
            <Plus size={14} /> {editingId ? "Update" : "Add Entry"}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setForm(blank());
                setEditingId(null);
              }}
              className="px-4 border border-border text-muted-foreground hover:text-foreground text-sm transition-colors"
              style={{ borderRadius: "2px" }}
            >
              Cancel
            </button>
          )}
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
                onClick={() => startEdit(a)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ChevronRight size={15} />
              </button>
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