import { useCallback, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'

import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { href: '/', label: 'Home', isTyped: true },
  { href: '/providers', label: 'Providers', isTyped: false },
  { href: '/configuration', label: 'Configuration', isTyped: false },
  { href: '/cli', label: 'CLI Reference', isTyped: false },
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
              isTyped={link.isTyped}
              onClick={undefined}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
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
                isTyped={link.isTyped}
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
  isTyped: boolean
  onClick?: () => void
}

function NavLink({ href, label, isActive, isTyped, onClick }: NavLinkProps) {
  const className = `nav-link${isActive ? ' is-active' : ''}`

  if (isTyped) {
    return (
      <Link to="/" onClick={onClick} className={className}>
        {label}
      </Link>
    )
  }

  return (
    <a href={href} onClick={onClick} className={className}>
      {label}
    </a>
  )
}
