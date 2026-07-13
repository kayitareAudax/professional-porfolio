export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-[0.25em] text-primary uppercase mb-3">
      {children}
    </p>
  );
}