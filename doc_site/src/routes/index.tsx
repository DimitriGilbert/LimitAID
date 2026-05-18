import { createFileRoute } from '@tanstack/react-router'
import { Layers, BarChart3, Repeat, Zap } from 'lucide-react'

import PageHero from '#/components/PageHero'
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
    accent: 'green' as const,
  },
  {
    icon: BarChart3,
    title: 'Visual Progress Bars',
    description:
      'Block-character bar graphs show usage at a glance. No JSON parsing, no squinting.',
    accent: 'red' as const,
  },
  {
    icon: Repeat,
    title: 'Loop Mode',
    description:
      'Run ./limitaid all --loop 60 and get a refreshed snapshot every 60 seconds.',
    accent: 'green' as const,
  },
  {
    icon: Zap,
    title: 'Zero Config',
    description:
      'Codex and Z.ai keys are auto-discovered from existing tool configs. It just works.',
    accent: 'red' as const,
  },
] as const

const STEPS = [
  { num: 1, text: 'Install in one line:', cmd: 'bash <(curl -sL https://raw.githubusercontent.com/DimitriGilbert/LimitAID/main/utils/get_limitaid) --install' },
  { num: 2, text: 'Reload your shell, then run:', cmd: 'limitaid all' },
]

const MANUAL_STEPS = [
  { label: 'Clone', cmd: 'git clone https://github.com/DimitriGilbert/LimitAID.git && cd LimitAID' },
  { label: 'Install to shell', cmd: './utils/install' },
  { label: 'Run', cmd: './limitaid all' },
]

function LandingPage() {
  return (
    <main className="pb-20">
      <section className="hero-gradient py-20 md:py-28">
        <div className="page-wrap px-4">
          <PageHero
            kicker="LimitAID v0.1.0"
            title="Know your limits."
            description="Check rate limits, balances, and usage across Codex, OpenRouter, and Z.ai — from one command in your terminal."
          />
        </div>
      </section>

      <section className="page-wrap px-4 rise-in" style={{ animationDelay: '100ms' }}>
        <div className="-mt-8">
          <AllDemo className="mx-auto max-w-3xl" />
        </div>
      </section>

      <section className="page-wrap px-4 py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description, accent }, index) => (
            <article
              key={title}
              className="rise-in border border-[var(--border)] bg-[var(--surface-0)] p-6 transition-colors hover:border-[var(--accent)]"
              style={{ animationDelay: `${index * 70 + 150}ms` }}
            >
              <div
                className={`mb-4 flex h-8 w-8 items-center justify-center rounded-md ${
                  accent === 'green' ? 'bg-[var(--green-soft)] text-[var(--green)]' : 'bg-[var(--red-soft)] text-[var(--red)]'
                }`}
              >
                <Icon size={16} strokeWidth={2} />
              </div>
              <h2 className="mb-1.5 text-sm font-bold tracking-tight text-[var(--ink)]">
                {title}
              </h2>
              <p className="m-0 text-[13px] leading-relaxed text-[var(--ink-soft)]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap px-4 pb-8">
        <div className="section-block rise-in p-6 sm:p-8" style={{ animationDelay: '100ms' }}>
          <h2 className="mb-6 text-lg font-bold tracking-tight text-[var(--ink)]">
            Get Started
          </h2>
          <div className="divide-y divide-[var(--border)]">
            {STEPS.map(({ num, text, cmd }) => (
              <div key={num} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                    num === 2 ? 'bg-[var(--green)]' : 'bg-[var(--ink)]'
                  }`}
                >
                  {num}
                </span>
                <div className="pt-0.5 min-w-0">
                  <span className="text-sm text-[var(--ink-soft)]">
                    {text}
                  </span>
                  <pre className="mt-2 overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                    <code>{cmd}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md border border-[var(--border)] bg-[var(--surface-1)] p-4">
            <p className="mb-3 text-[13px] font-semibold text-[var(--ink)]">
              Or install manually:
            </p>
            <div className="space-y-2">
              {MANUAL_STEPS.map(({ label, cmd }) => (
                <div key={label} className="flex items-baseline gap-3">
                  <span className="shrink-0 text-[12px] font-bold uppercase tracking-wider text-[var(--green)]">
                    {label}
                  </span>
                  <code className="text-[13px] text-[var(--ink-soft)]">{cmd}</code>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 mb-0 text-[13px] text-[var(--ink-muted)]">
            OpenRouter needs a manual key entry. See the{' '}
            <a href="/configuration" className="font-medium text-[var(--green)]">
              configuration guide
            </a>{' '}
            for the full setup.
          </p>
        </div>
      </section>
    </main>
  )
}
