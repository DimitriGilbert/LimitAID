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
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex items-center justify-between py-3 sm:py-4">
        {/* Logo */}
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            onClick={closeMobile}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
          >
            <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#56c6be,#7ed3bf)]" />
            <span className="text-[var(--lagoon)]">LimitAID</span>
          </Link>
        </h2>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-5 text-sm font-semibold sm:flex">
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

        {/* Right section: theme toggle + mobile hamburger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="flex flex-col items-center justify-center gap-[5px] rounded-lg p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] sm:hidden"
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

      {/* Mobile nav dropdown */}
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

/* ------------------------------------------------------------------ */

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
