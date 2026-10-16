import { useState } from "react";
import { Plus, Trash2, ChevronRight, X } from "lucide-react";
import type { WorkExperience, FlatSkill } from "../../types";
import { inputCls } from "../../data/constants";
import { adminCreateExperience, adminDeleteExperience } from "../../services/portfolio";

export function AdminExperience({
  experience,
  setExperience,
  flatSkills,
}: {
  experience: WorkExperience[];
  setExperience: () => Promise<void>;
  flatSkills: FlatSkill[];
}) {
  const blank = () => ({
    id: "",
    role: "",
    company: "",
    period: "",
    description: "",
    tags: [],
    startDate: "",
    endDate: "",
    isCurrent: false,
  });
  const [form, setForm] = useState(blank());
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

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
    if (!form.role.trim() || busy) return;
    setBusy(true);
    try {
      await adminCreateExperience({
        role: form.role.trim(),
        description: form.description.trim(),
        companyName: form.company.trim(),
        startDate: form.startDate || new Date().toISOString().slice(0, 10),
        endDate: form.isCurrent ? undefined : form.endDate || undefined,
        skillIds: selectedSkillIds,
      });
      await setExperience();
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
      await adminDeleteExperience(id);
      await setExperience();
    } finally {
      setBusy(false);
    }
  };

  const selectedSkills = flatSkills.filter((s) => selectedSkillIds.includes(s.id));

  return (
    <div className="space-y-8">
      <div
        className="border border-border p-5 space-y-4"
        style={{ borderRadius: "2px" }}
      >
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          Add Work Experience
        </p>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
            Role
          </label>
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="Senior Software Engineer"
            className={inputCls}
            style={{ borderRadius: "2px" }}
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
            Company
          </label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Stripe"
            className={inputCls}
            style={{ borderRadius: "2px" }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className={inputCls}
              style={{ borderRadius: "2px" }}
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
              End Date
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                disabled={form.isCurrent}
                className={inputCls}
                style={{ borderRadius: "2px", opacity: form.isCurrent ? 0.4 : 1 }}
              />
            </div>
            <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isCurrent}
                onChange={(e) => setForm({ ...form, isCurrent: e.target.checked, endDate: e.target.checked ? "" : form.endDate })}
                className="accent-primary"
              />
              <span className="font-mono text-[10px] text-muted-foreground">Currently here (Present)</span>
            </label>
          </div>
        </div>
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