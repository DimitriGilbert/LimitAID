import { useCallback, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'

import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/providers', label: 'Providers' },
  { href: '/configuration', label: 'Configuration' },
  { href: '/cli', label: 'CLI Reference' },
] as const

function isActiveLink(linkHref: string, pathname: string): boolean {
  return linkHref === '/' ? pathname === '/' : pathname.startsWith(linkHref)
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-bg)] px-4 backdrop-blur-md">
      <nav className="page-wrap flex items-center justify-between py-3">
        <h2 className="m-0 shrink-0 text-base font-bold tracking-tight">
          <Link
            to="/"
            onClick={closeMobile}
            className="inline-flex items-center gap-2 no-underline text-[var(--ink)]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--green)] text-[10px] font-extrabold text-white">
              L
            </span>
            <span>LimitAID</span>
          </Link>
        </h2>

        <div className="hidden items-center gap-6 text-sm font-semibold sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={isActiveLink(link.href, pathname)}
              onClick={undefined}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/DimitriGilbert/LimitAID"
            target="_blank"
            rel="noreferrer"
            aria-label="LimitAID on GitHub"
            className="rounded-md p-1.5 text-[var(--ink-soft)] transition-colors hover:bg-[var(--surface-1)] hover:text-[var(--ink)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </a>
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="flex flex-col items-center justify-center gap-[5px] rounded-md p-2 text-[var(--ink-soft)] transition hover:bg-[var(--surface-1)] hover:text-[var(--ink)] sm:hidden"
          >
            <span
              className="block h-[2px] w-5 rounded-full bg-current transition-transform duration-200"
              style={{
                transform: mobileOpen
                  ? 'translateY(7px) rotate(45deg)'
                  : 'none',
              }}
            />
            <span
              className="block h-[2px] w-5 rounded-full bg-current transition-opacity duration-200"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block h-[2px] w-5 rounded-full bg-current transition-transform duration-200"
              style={{
                transform: mobileOpen
                  ? 'translateY(-7px) rotate(-45deg)'
                  : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden"
        style={{
          gridTemplateRows: mobileOpen ? '1fr' : '0fr',
        }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 px-2 pb-4 text-sm font-semibold">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={isActiveLink(link.href, pathname)}
                onClick={closeMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  onClick?: () => void
}

function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  const className = `nav-link${isActive ? ' is-active' : ''}`
  return (
    <Link to={href} onClick={onClick} className={className}>
      {label}
    </Link>
  )
}
