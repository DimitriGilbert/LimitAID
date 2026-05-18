export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer mt-20 px-4 pb-12 pt-8 text-[var(--ink-muted)]">
      <div className="page-wrap flex flex-col items-center gap-2 text-center text-[13px]">
        <div className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[var(--green)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
          LimitAID
        </div>
        <div className="flex items-center gap-2">
          <span>&copy; {year} Dimitri Gilbert</span>
          <span className="opacity-30" aria-hidden="true">&middot;</span>
          <a
            href="https://github.com/DimitriGilbert/LimitAID"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[var(--ink-muted)] no-underline transition hover:text-[var(--ink)]"
          >
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              width="14"
              height="14"
              className="shrink-0"
            >
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
