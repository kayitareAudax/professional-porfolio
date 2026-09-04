import { useState } from "react";
import { Plus, Trash2, ChevronRight, X } from "lucide-react";
import type { Project, FlatSkill } from "../../types";
import { inputCls } from "../../data/constants";
import { adminCreateProject, adminDeleteProject } from "../../services/portfolio";
import { ImageUploadField } from "./ImageUploadField";

export function AdminProjects({
  projects,
  setProjects,
  flatSkills,
}: {
  projects: Project[];
  setProjects: () => Promise<void>;
  flatSkills: FlatSkill[];
}) {
  const blank = (): Project => ({
    id: "",
    title: "",
    description: "",
    tags: [],
    github: "",
    live: "",
    imageUrl: "",
  });
  const [form, setForm] = useState<Project>(blank());
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  // Group flat skills by category for a nice dropdown
  const skillsByCat = flatSkills.reduce<Record<string, FlatSkill[]>>((acc, s) => {
    if (!acc[s.categoryName]) acc[s.categoryName] = [];
    acc[s.categoryName].push(s);
    return acc;
  }, {});

  const toggleSkill = (id: string) => {
    setSelectedSkillIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const save = async () => {
    if (!form.title.trim() || busy) return;
    setBusy(true);
    try {
      await adminCreateProject({
        projectName: form.title.trim(),
        projectDescription: form.description.trim(),
        projectUrl: form.live || undefined,
        githubUrl: form.github || undefined,
        imageUrl: form.imageUrl || undefined,
        skillIds: selectedSkillIds,
      });
      await setProjects();
      setForm(blank());
      setSelectedSkillIds([]);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (busy) return;
    setBusy(true);
    try {
      await adminDeleteProject(id);
      await setProjects();
    } finally {
      setBusy(false);
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

  const selectedSkills = flatSkills.filter((s) => selectedSkillIds.includes(s.id));

  return (
    <div className="space-y-8">
      <div
        className="border border-border p-5 space-y-4"
        style={{ borderRadius: "2px" }}
      >
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          Add New Project
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
            Skills (select from registered skills)
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {selectedSkills.map((s) => (
              <span
                key={s.id}
                className="flex items-center gap-1 text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5"
                style={{ borderRadius: "2px" }}
              >
                {s.name}
                <button onClick={() => toggleSkill(s.id)} className="hover:text-destructive">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
          <div
            className="space-y-3 max-h-56 overflow-y-auto border border-border p-3"
            style={{ borderRadius: "2px" }}
          >
            {Object.entries(skillsByCat).map(([cat, skills]) => (
              <div key={cat}>
                <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase mb-1.5">
                  {cat}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => {
                    const active = selectedSkillIds.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleSkill(s.id)}
                        className={`text-xs px-2 py-1 border transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                        style={{ borderRadius: "2px" }}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[9px] text-muted-foreground mt-1">
            Click to select or deselect a skill — pick as many as apply
          </p>
        </div>
        <ImageUploadField
          label="Project Image"
          value={form.imageUrl}
          onChange={(url) => setForm({ ...form, imageUrl: url })}
        />
        {field("GitHub URL", "github", "https://github.com/...")}
        {field("Live URL", "live", "https://...")}
        <div className="flex gap-2 pt-2">
          <button
            onClick={save}
            disabled={busy}
            className="flex-1 bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ borderRadius: "2px" }}
          >
            <Plus size={14} /> Add Project
          </button>
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