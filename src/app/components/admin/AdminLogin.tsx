import { useState } from "react";
import { Lock, UserCheck } from "lucide-react";
import { inputCls } from "../../data/constants";
import { login } from "../../utils/api";

export function AdminLogin({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [pw, setPw] = useState("");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(false);
    try {
      await login(username, pw);
      onSuccess();
    } catch {
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div
        className="bg-card border border-border p-8 w-full max-w-sm shadow-2xl"
        style={{ borderRadius: "4px" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 bg-primary/10 flex items-center justify-center"
            style={{ borderRadius: "2px" }}
          >
            <UserCheck size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-sans font-semibold text-foreground">
              Admin Access
            </p>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">
              PORTFOLIO EDITOR
            </p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErr(false);
              }}
              placeholder="Enter username"
              autoFocus
              className={`${inputCls} ${err ? "border-destructive" : ""}`}
              style={{ borderRadius: "2px" }}
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setErr(false);
              }}
              placeholder="Enter password"
              className={`${inputCls} ${err ? "border-destructive" : ""}`}
              style={{ borderRadius: "2px" }}
            />
            {err && (
              <p className="font-mono text-[10px] text-destructive mt-1.5">
                Invalid credentials. Try again.
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ borderRadius: "2px" }}
          >
            <Lock size={14} /> {loading ? "Signing in..." : "Unlock Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}