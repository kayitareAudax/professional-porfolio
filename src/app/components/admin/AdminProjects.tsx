import { useState } from "react";
import { Plus, Trash2, ChevronRight } from "lucide-react";
import type { Project } from "../../types";
import { inputCls } from "../../data/constants";

export function AdminProjects({
  projects,
  setProjects,
}: {
  projects: Project[];
  setProjects: (v: Project[]) => void;
}) {
  const blank = (): Project => ({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    tags: [],
    github: "",
    live: "",
    image: "",
  });
  const [form, setForm] = useState<Project>(blank());
  const [tagsInput, setTagsInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const save = () => {
    if (!form.title.trim()) return;
    const proj: Project = {
      ...form,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (editingId) {
      setProjects(projects.map((p) => (p.id === editingId ? proj : p)));
      setEditingId(null);
    } else {
      setProjects([...projects, proj]);
    }
    setForm(blank());
    setTagsInput("");
  };

  const startEdit = (p: Project) => {
    setForm(p);
    setTagsInput(p.tags.join(", "));
    setEditingId(p.id);
  };

  const remove = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    if (editingId === id) {
      setForm(blank());
      setTagsInput("");
      setEditingId(null);
    }
  };

  const field = (
    label: string,
    key: keyof Project,
    placeholder: string,
    type = "text",
  ) => (
    <div>
      <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={form[key] as string}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className={inputCls}
        style={{ borderRadius: "2px" }}
      />
    </div>
  );

  return (
    <div className="space-y-8">
      <div
        className="border border-border p-5 space-y-4"
        style={{ borderRadius: "2px" }}
      >
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          {editingId ? "Edit Project" : "Add New Project"}
        </p>
        {field("Title", "title", "Lumen — Real-time Analytics Engine")}
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe the project..."
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
            placeholder="Go, React, PostgreSQL"
            className={inputCls}
            style={{ borderRadius: "2px" }}
          />
        </div>
        {field("GitHub URL", "github", "https://github.com/...")}
        {field("Live URL", "live", "https://...")}
        {field("Image URL", "image", "https://images.unsplash.com/...")}
        <div className="flex gap-2 pt-2">
          <button
            onClick={save}
            className="flex-1 bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2"
            style={{ borderRadius: "2px" }}
          >
            <Plus size={14} /> {editingId ? "Update Project" : "Add Project"}
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
          Current Projects ({projects.length})
        </p>
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between gap-3 border border-border px-4 py-3 hover:border-primary/30 transition-colors"
            style={{ borderRadius: "2px" }}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {p.title}
              </p>
              <div className="flex gap-1 flex-wrap mt-1">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] text-primary/60 border border-primary/15 px-1.5 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => startEdit(p)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ChevronRight size={15} />
              </button>
              <button
                onClick={() => remove(p.id)}
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