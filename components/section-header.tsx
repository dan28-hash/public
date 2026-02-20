interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <span className="mb-3 inline-block text-xs font-bold tracking-widest uppercase text-accent">
        {label}
      </span>
      <h2 className="text-balance text-3xl font-bold tracking-tight uppercase text-text-primary md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
