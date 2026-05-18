import { createFileRoute } from '@tanstack/react-router'

import PageHero from '#/components/PageHero'
import ProseContent from '#/components/ProseContent'
import CodexDemo from '#/components/demos/CodexDemo'
import OpenRouterDemo from '#/components/demos/OpenRouterDemo'
import ZaiDemo from '#/components/demos/ZaiDemo'

export const Route = createFileRoute('/providers')({
  component: ProvidersPage,
})

function ProvidersPage() {
  return (
    <main className="pb-16 pt-14">
      <PageHero
        kicker="Providers"
        title="Supported AI Providers"
        description="LimitAID queries three AI platforms, each with its own rate limiting and billing model."
      />

      <ProseContent>
        <ProviderSection
          index={1}
          title="Codex / OpenAI"
          description="Hits the chatgpt.com usage API and returns two independent rate-limit windows: a rolling 5-hour window for short-burst work, and a weekly window for sustained usage. It also reports your credits balance and any Spark sub-limits that apply to your plan tier. Credentials are pulled automatically from ~/.codex/auth.json."
        >
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <InfoRow label="Primary window" value="5-hour rolling" />
            <InfoRow label="Secondary window" value="Weekly reset" />
            <InfoRow label="Credits" value="Balance reported" />
            <InfoRow label="Spark sub-limits" value="Per-tier caps" />
          </div>

          <ApiBlock
            lines={[
              ['API', 'GET https://chatgpt.com/backend-api/wham/usage'],
              ['Auto-discovery', 'Reads ~/.codex/auth.json'],
            ]}
          />

          <CodexDemo />
        </ProviderSection>

        <ProviderSection
          index={2}
          title="OpenRouter"
          description="Exposes a single key endpoint that returns your credit limit, remaining balance, and a usage breakdown across daily, weekly, and monthly windows. Unlike Codex, there's no auto-discovery — you need to add your API key to keys.conf by hand."
        >
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <InfoRow label="Credit limit" value="Configured per key" />
            <InfoRow label="Remaining" value="Balance + percentage" />
            <InfoRow label="Usage windows" value="Daily / Weekly / Monthly" />
            <InfoRow label="Free tier" value="Flagged in response" />
          </div>

          <ApiBlock
            lines={[
              ['API', 'GET https://openrouter.ai/api/v1/key'],
              ['Configuration', 'Manual — add to keys.conf'],
            ]}
          />

          <OpenRouterDemo />
        </ProviderSection>

        <ProviderSection
          index={3}
          title="Z.ai"
          description="Reports two hard limits: a 5-hour time-limit window that gates how long you can run agents, and a weekly token budget. The per-tool MCP breakdown lets you see exactly which tools (search-prime, web-reader, zread, etc.) are eating into your quota. Credentials come from your opencode config."
        >
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <InfoRow label="Time limit" value="5-hour window" />
            <InfoRow label="Token budget" value="Weekly cap" />
            <InfoRow label="MCP breakdown" value="Per-tool counters" />
            <InfoRow label="Auto-discovery" value="opencode config" />
          </div>

          <ApiBlock
            lines={[
              ['API', 'GET https://api.z.ai/api/monitor/usage/quota/limit'],
              ['Auto-discovery', 'Reads ~/.config/opencode/opencode.json'],
            ]}
          />

          <ZaiDemo />
        </ProviderSection>
      </ProseContent>
    </main>
  )
}

function ProviderSection({ index, title, description, children }: {
  index: number
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="section-block mt-8 first:mt-0 p-6 rise-in">
      <div className="mb-1 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--green-soft)] text-[10px] font-bold text-[var(--green)]">
          {index}
        </span>
        <p className="kicker m-0">{title}</p>
      </div>
      <h2 className="mb-3 mt-3 text-xl font-bold tracking-tight text-[var(--ink)]">
        {title}
      </h2>
      <p className="mb-5 text-sm leading-relaxed text-[var(--ink-soft)]">
        {description}
      </p>
      {children}
    </section>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2 text-sm">
      <span className="shrink-0 font-medium text-[var(--ink)]">{label}</span>
      <span className="text-[var(--ink-soft)]">{value}</span>
    </div>
  )
}

function ApiBlock({ lines }: { lines: [string, string][] }) {
  return (
    <div className="mb-5 space-y-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-1)] p-4 text-sm text-[var(--ink-soft)]">
      {lines.map(([label, value]) => (
        <div key={label}>
          <span className="font-medium text-[var(--ink)]">{label}:</span>{' '}
          <code className="text-[12px]">{value}</code>
        </div>
      ))}
    </div>
  )
}
