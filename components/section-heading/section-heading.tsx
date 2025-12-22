type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-3xl sm:text-4xl text-center font-mono font-bold capitalize mb-10 text-foreground">
      <span className="relative">
        {children}
        {/* Subtle gradient underline */}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-linear-to-r from-primary via-accent to-primary opacity-60 rounded-full" />
      </span>
    </h2>
  );
}
