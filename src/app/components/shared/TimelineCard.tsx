export function TimelineCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -left-8 top-2 w-2 h-2 bg-primary rounded-full ring-4 ring-background" />
      <div className="bg-card border border-border p-6 hover:border-primary/30 transition-colors duration-200">
        {children}
      </div>
    </div>
  );
}