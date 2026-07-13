import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import type { SkillGroup } from "../../types";
import { inputCls } from "../../data/constants";

export function AdminSkills({
  skills,
  setSkills,
}: {
  skills: SkillGroup[];
  setSkills: (v: SkillGroup[]) => void;
}) {
  const [newSkill, setNewSkill] = useState("");
  const [selectedCat, setSelectedCat] = useState(skills[0]?.category ?? "");
  const [newCat, setNewCat] = useState("");

  const addSkill = () => {
    if (!newSkill.trim() || !selectedCat) return;
    const updated = skills.map((g) =>
      g.category === selectedCat
        ? { ...g, items: [...g.items, newSkill.trim()] }
        : g,
    );
    setSkills(updated);
    setNewSkill("");
  };

  const addCategory = () => {
    if (!newCat.trim() || skills.find((g) => g.category === newCat.trim()))
      return;
    setSkills([...skills, { category: newCat.trim(), items: [] }]);
    setSelectedCat(newCat.trim());
    setNewCat("");
  };

  const removeSkill = (cat: string, item: string) => {
    setSkills(
      skills.map((g) =>
        g.category === cat
          ? { ...g, items: g.items.filter((i) => i !== item) }
          : g,
      ),
    );
  };

  const removeCat = (cat: string) => {
    setSkills(skills.filter((g) => g.category !== cat));
    if (selectedCat === cat)
      setSelectedCat(skills.find((g) => g.category !== cat)?.category ?? "");
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">
          Add New Category
        </p>
        <div className="flex gap-2">
          <input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="e.g. DevOps"
            className={`${inputCls} flex-1`}
            style={{ borderRadius: "2px" }}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
          />
          <button
            onClick={addCategory}
            className="px-4 bg-primary text-primary-foreground text-sm hover:bg-primary/80 transition-colors flex items-center gap-1"
            style={{ borderRadius: "2px" }}
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      <div>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">
          Add Skill to Category
        </p>
        <div className="flex gap-2 mb-3">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className={`${inputCls} flex-1`}
            style={{ borderRadius: "2px" }}
          >
            {skills.map((g) => (
              <option key={g.category} value={g.category}>
                {g.category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g. Terraform"
            className={`${inputCls} flex-1`}
            style={{ borderRadius: "2px" }}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
          />
          <button
            onClick={addSkill}
            className="px-4 bg-primary text-primary-foreground text-sm hover:bg-primary/80 transition-colors flex items-center gap-1"
            style={{ borderRadius: "2px" }}
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Current Skills
        </p>
        {skills.map((g) => (
          <div
            key={g.category}
            className="border border-border p-4"
            style={{ borderRadius: "2px" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-primary tracking-widest uppercase">
                {g.category}
              </span>
              <button
                onClick={() => removeCat(g.category)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                title="Remove category"
              >
                <Trash2 size={13} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1 text-sm bg-secondary px-2 py-0.5 text-foreground/80"
                  style={{ borderRadius: "2px" }}
                >
                  {item}
                  <button
                    onClick={() => removeSkill(g.category, item)}
                    className="text-muted-foreground hover:text-destructive transition-colors ml-1"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
              {g.items.length === 0 && (
                <span className="text-xs text-muted-foreground italic">
                  No skills yet
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}