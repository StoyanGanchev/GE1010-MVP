export const Footer = (): JSX.Element => {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-r from-white via-accent-light/50 to-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} EduAI Future Lab — MVP preview</p>
        <p>Built for GE1010 Entrepreneurship showcase.</p>
      </div>
    </footer>
  );
};
