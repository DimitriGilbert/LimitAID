import { createFileRoute } from '@tanstack/react-router'
import { Layers, BarChart3, Repeat, Zap } from 'lucide-react'

import PageHero from '#/components/PageHero'
import ProseContent from '#/components/ProseContent'
import AllDemo from '#/components/demos/AllDemo'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

const FEATURES = [
  {
    icon: Layers,
    title: 'Multi-Provider',
    description:
      'Codex, OpenRouter, Z.ai — hit them all from a single CLI. One command, three dashboards.',
  },
  {
    icon: BarChart3,
    title: 'Visual Progress Bars',
    description:
      'Block-character bar graphs show usage at a glance. No JSON parsing, no squinting.',
  },
  {
    icon: Repeat,
    title: 'Loop Mode',
    description:
      'Run ./limitaid all --loop 60 and get a refreshed snapshot every 60 seconds.',
  },
  {
    icon: Zap,
    title: 'Zero Config',
    description:
      'Codex and Z.ai keys are auto-discovered from existing tool configs. It just works.',
  },
] as const

function LandingPage() {
  return (
    <main className="pb-16 pt-14">
      {/* Hero */}
      <PageHero
        kicker="LIMITAID v0.1.0"
        title="AI Provider Quota Monitor"
        description="Check your rate limits, balances, and usage across Codex, OpenRouter, and Z.ai — from one command in your terminal."
      />

      {/* Terminal Demo */}
      <section className="page-wrap px-4 rise-in" style={{ animationDelay: '120ms' }}>
        <AllDemo className="mx-auto max-w-3xl" />
      </section>

      {/* Features Grid */}
      <section className="page-wrap px-4 py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="feature-card rise-in rounded-xl border border-[var(--line)] p-6"
              style={{ animationDelay: `${index * 90 + 200}ms` }}
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(79,184,178,0.14)]">
                <Icon
                  size={18}
                  strokeWidth={2}
                  className="text-[var(--lagoon-deep)]"
                />
              </div>
              <h2 className="mb-1.5 text-base font-semibold text-[var(--sea-ink)]">
                {title}
              </h2>
              <p className="m-0 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="page-wrap px-4 py-8">
        <ProseContent>
          <div className="island-shell rise-in rounded-xl p-6 sm:p-8">
            <h2 className="display-title mb-4 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
              Get Started
            </h2>
            <ol className="m-0 list-none space-y-3 pl-0 text-sm text-[var(--sea-ink-soft)]">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(79,184,178,0.14)] text-xs font-bold text-[var(--lagoon-deep)]">
                  1
                </span>
                <span>
                  Clone the repo:{' '}
                  <code>git clone https://github.com/DimitriGilbert/LimitAID.git</code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(79,184,178,0.14)] text-xs font-bold text-[var(--lagoon-deep)]">
                  2
                </span>
                <span>
                  Make it executable: <code>chmod +x limitaid</code>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(79,184,178,0.14)] text-xs font-bold text-[var(--lagoon-deep)]">
                  3
                </span>
                <span>
                  Run: <code>./limitaid all</code>
                </span>
              </li>
            </ol>
            <p className="mt-5 mb-0 text-sm text-[var(--sea-ink-soft)]">
              OpenRouter needs a manual key entry. See the{' '}
              <a
                href="/configuration"
                className="font-medium text-[var(--lagoon-deep)] underline decoration-[rgba(50,143,151,0.4)] underline-offset-2"
              >
                configuration guide
              </a>{' '}
              for the full setup.
            </p>
          </div>
        </ProseContent>
      </section>
    </main>
  )
}
