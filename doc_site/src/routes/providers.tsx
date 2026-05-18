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
        kicker="PROVIDERS"
        title="Supported AI Providers"
        description="LimitAID queries three AI platforms, each with its own rate limiting and billing model. Here's what you get from each."
      />

      <ProseContent>
        {/* Codex / OpenAI */}
        <section className="island-shell rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Provider 1</p>
          <h2 className="display-title mb-3 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            Codex / OpenAI
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            This provider hits the chatgpt.com usage API and returns two
            independent rate-limit windows: a rolling 5-hour window for
            short-burst work, and a weekly window for sustained usage. It also
            reports your credits balance and any Spark sub-limits that apply to
            your plan tier. Credentials are pulled automatically from{' '}
            <code>~/.codex/auth.json</code> — no manual setup required if
            you've already logged in through Codex.
          </p>

          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            <InfoRow label="Primary window" value="5-hour rolling" />
            <InfoRow label="Secondary window" value="Weekly reset" />
            <InfoRow label="Credits" value="Balance reported" />
            <InfoRow label="Spark sub-limits" value="Per-tier caps" />
          </div>

          <div className="mb-4 space-y-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--sea-ink-soft)]">
            <div>
              <span className="font-medium text-[var(--sea-ink)]">API:</span>{' '}
              <code>GET https://chatgpt.com/backend-api/wham/usage</code>
            </div>
            <div>
              <span className="font-medium text-[var(--sea-ink)]">Auto-discovery:</span>{' '}
              Reads <code>~/.codex/auth.json</code>
            </div>
          </div>

          <CodexDemo />
        </section>

        {/* OpenRouter */}
        <section className="island-shell mt-10 rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Provider 2</p>
          <h2 className="display-title mb-3 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            OpenRouter
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            OpenRouter exposes a single key endpoint that returns your credit
            limit, remaining balance, and a usage breakdown across daily, weekly,
            and monthly windows. Unlike Codex, there's no auto-discovery — you
            need to add your API key to <code>keys.conf</code> by hand. The
            response also flags whether your key is on the free tier, which
            matters if you're watching spending closely.
          </p>

          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            <InfoRow label="Credit limit" value="Configured per key" />
            <InfoRow label="Remaining" value="Balance + percentage" />
            <InfoRow label="Usage windows" value="Daily / Weekly / Monthly" />
            <InfoRow label="Free tier" value="Flagged in response" />
          </div>

          <div className="mb-4 space-y-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--sea-ink-soft)]">
            <div>
              <span className="font-medium text-[var(--sea-ink)]">API:</span>{' '}
              <code>GET https://openrouter.ai/api/v1/key</code>
            </div>
            <div>
              <span className="font-medium text-[var(--sea-ink)]">Configuration:</span>{' '}
              Manual — add to <code>keys.conf</code>
            </div>
          </div>

          <OpenRouterDemo />
        </section>

        {/* Z.ai */}
        <section className="island-shell mt-10 rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Provider 3</p>
          <h2 className="display-title mb-3 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            Z.ai
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            The Z.ai coding plan endpoint reports two hard limits: a 5-hour
            time-limit window that gates how long you can run agents, and a
            weekly token budget. What makes this provider useful is the per-tool
            MCP breakdown — you can see exactly which tools (search-prime,
            web-reader, zread, etc.) are eating into your quota. Credentials
            come from your opencode config at{' '}
            <code>~/.config/opencode/opencode.json</code>, picked up
            automatically.
          </p>

          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            <InfoRow label="Time limit" value="5-hour window" />
            <InfoRow label="Token budget" value="Weekly cap" />
            <InfoRow label="MCP breakdown" value="Per-tool counters" />
            <InfoRow label="Auto-discovery" value="opencode config" />
          </div>

          <div className="mb-4 space-y-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--sea-ink-soft)]">
            <div>
              <span className="font-medium text-[var(--sea-ink)]">API:</span>{' '}
              <code>GET https://api.z.ai/api/monitor/usage/quota/limit</code>
            </div>
            <div>
              <span className="font-medium text-[var(--sea-ink)]">Auto-discovery:</span>{' '}
              Reads <code>~/.config/opencode/opencode.json</code>
            </div>
          </div>

          <ZaiDemo />
        </section>
      </ProseContent>
    </main>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2 text-sm">
      <span className="shrink-0 font-medium text-[var(--sea-ink)]">{label}</span>
      <span className="text-[var(--sea-ink-soft)]">{value}</span>
    </div>
  )
}
