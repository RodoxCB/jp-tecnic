type AdminSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminSection({ title, description, children }: AdminSectionProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#25D366]">{title}</h2>
      {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}
