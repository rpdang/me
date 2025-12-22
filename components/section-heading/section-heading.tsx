type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-3xl sm:text-4xl text-center font-display font-bold capitalize mb-10 text-foreground tracking-tight">
      <span className="relative inline-block">
        {children}
        {/* Editorial accent underline */}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-primary" />
      </span>
    </h2>
  );
}
