type SectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionTitle({ title, subtitle, align = "center" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-400 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
