export const Backdrop = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="from-muted/50 to-background absolute inset-0 bg-linear-to-b" />
      <div className="bg-primary/5 absolute top-0 left-1/2 h-full max-h-[500px] w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
    </div>
  );
};
