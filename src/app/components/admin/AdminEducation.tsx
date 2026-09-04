import { useState } from "react";
import { Plus, Trash2, ChevronRight } from "lucide-react";
import type { Education } from "../../types";
import { inputCls } from "../../data/constants";
import { adminCreateEducation, adminDeleteEducation } from "../../services/portfolio";

export function AdminEducation({
  education,
  setEducation,
}: {
  education: Education[];
  setEducation: () => Promise<void>;
}) {
  const blank = () => ({
    id: "",
    degree: "",
    institution: "",
    period: "",
    description: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });
  const [form, setForm] = useState(blank());
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!form.degree.trim() || busy) return;
    setBusy(true);
    try {
      await adminCreateEducation({
        name: form.degree.trim(),
        description: form.description.trim(),
        startDate: form.startDate || new Date().toISOString().slice(0, 10),
        endDate: form.isCurrent ? undefined : form.endDate || undefined,
      });
      await setEducation();
      setForm(blank());
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (busy) return;
    setBusy(true);
    try {
      await adminDeleteEducation(id);
      await setEducation();
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
          Add Education
        </p>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
            Degree
          </label>
          <input
            value={form.degree}
            onChange={(e) => setForm({ ...form, degree: e.target.value })}
            placeholder="B.Sc. Computer Science"
            className={inputCls}
            style={{ borderRadius: "2px" }}
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
            Institution
          </label>
          <input
            value={form.institution}
            onChange={(e) => setForm({ ...form, institution: e.target.value })}
            placeholder="MIT"
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
              <span className="font-mono text-[10px] text-muted-foreground">Currently enrolled (Present)</span>
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
            placeholder="Describe your studies, honors, thesis..."
            rows={3}
            className={`${inputCls} resize-none`}
            style={{ borderRadius: "2px" }}
          />
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
          Current Education ({education.length})
        </p>
        {education.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between gap-3 border border-border px-4 py-3 hover:border-primary/30 transition-colors"
            style={{ borderRadius: "2px" }}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {e.degree}
              </p>
              <p className="font-mono text-xs text-primary">
                {e.institution} · {e.period}
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