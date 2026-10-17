export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-24">
      <div className="container max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-8 px-4 sm:px-6 text-xs font-mono text-text-secondary">
        <div className="flex items-center gap-3">
          <span>© {currentYear} Kenshien Alao</span>
        </div>
      </div>
    </footer>
  );
}
