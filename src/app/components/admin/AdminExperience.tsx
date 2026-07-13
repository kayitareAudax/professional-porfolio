import { useState } from "react";
import { Plus, Trash2, ChevronRight } from "lucide-react";
import type { WorkExperience } from "../../types";
import { inputCls } from "../../data/constants";

export function AdminExperience({
  experience,
  setExperience,
}: {
  experience: WorkExperience[];
  setExperience: (v: WorkExperience[]) => void;
}) {
  const blank = (): WorkExperience => ({
    id: crypto.randomUUID(),
    role: "",
    company: "",
    period: "",
    description: "",
    tags: [],
  });
  const [form, setForm] = useState<WorkExperience>(blank());
  const [tagsInput, setTagsInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const save = () => {
    if (!form.role.trim()) return;
    const item: WorkExperience = {
      ...form,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (editingId) {
      setExperience(experience.map((e) => (e.id === editingId ? item : e)));
      setEditingId(null);
    } else {
      setExperience([item, ...experience]);
    }
    setForm(blank());
    setTagsInput("");
  };

  const startEdit = (e: WorkExperience) => {
    setForm(e);
    setTagsInput(e.tags.join(", "));
    setEditingId(e.id);
  };
  const remove = (id: string) => {
    setExperience(experience.filter((e) => e.id !== id));
    if (editingId === id) {
      setForm(blank());
      setTagsInput("");
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
          {editingId ? "Edit Entry" : "Add Work Experience"}
        </p>
        {(["role", "company", "period"] as const).map((key) => (
          <div key={key}>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
              {key}
            </label>
            <input
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={
                key === "period"
                  ? "2023 – Present"
                  : key === "company"
                    ? "Stripe"
                    : "Senior Software Engineer"
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
            placeholder="Describe your role and impact..."
            rows={3}
            className={`${inputCls} resize-none`}
            style={{ borderRadius: "2px" }}
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
            Tags (comma separated)
          </label>
          <input
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Go, Kubernetes, PostgreSQL"
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
                setTagsInput("");
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
          Current Experience ({experience.length})
        </p>
        {experience.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between gap-3 border border-border px-4 py-3 hover:border-primary/30 transition-colors"
            style={{ borderRadius: "2px" }}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {e.role}
              </p>
              <p className="font-mono text-xs text-primary">
                {e.company} · {e.period}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => startEdit(e)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ChevronRight size={15} />
              </button>
              <button
                onClick={() => remove(e.id)}
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