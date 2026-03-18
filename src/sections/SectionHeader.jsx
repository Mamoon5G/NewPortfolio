import ScrollReveal from "./ScrollReveal";

export default function SectionHeader({ label, title }) {
  return (
    <ScrollReveal className="text-center mb-16">
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
        {title}
      </h2>
    </ScrollReveal>
  );
}