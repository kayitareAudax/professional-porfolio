import { useState } from "react";
import { Plus, Trash2, ChevronRight } from "lucide-react";
import type { Education } from "../../types";
import { inputCls } from "../../data/constants";

export function AdminEducation({
  education,
  setEducation,
}: {
  education: Education[];
  setEducation: (v: Education[]) => void;
}) {
  const blank = (): Education => ({
    id: crypto.randomUUID(),
    degree: "",
    institution: "",
    period: "",
    description: "",
  });
  const [form, setForm] = useState<Education>(blank());
  const [editingId, setEditingId] = useState<string | null>(null);

  const save = () => {
    if (!form.degree.trim()) return;
    if (editingId) {
      setEducation(education.map((e) => (e.id === editingId ? form : e)));
      setEditingId(null);
    } else {
      setEducation([form, ...education]);
    }
    setForm(blank());
  };

  const startEdit = (e: Education) => {
    setForm(e);
    setEditingId(e.id);
  };
  const remove = (id: string) => {
    setEducation(education.filter((e) => e.id !== id));
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
          {editingId ? "Edit Entry" : "Add Education"}
        </p>
        {(["degree", "institution", "period"] as const).map((key) => (
          <div key={key}>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">
              {key}
            </label>
            <input
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={
                key === "period"
                  ? "2016 – 2020"
                  : key === "institution"
                    ? "MIT"
                    : "B.Sc. Computer Science"
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
            placeholder="Describe your studies, honors, thesis..."
            rows={3}
            className={`${inputCls} resize-none`}
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