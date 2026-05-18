import { createFileRoute } from '@tanstack/react-router'

import PageHero from '#/components/PageHero'
import ProseContent from '#/components/ProseContent'

export const Route = createFileRoute('/cli')({
  component: CLIReferencePage,
})

function CLIReferencePage() {
  return (
    <main className="pb-16 pt-14">
      <PageHero
        kicker="Reference"
        title="Command Line Interface"
        description="LimitAID ships as a single binary with one subcommand per provider."
      />

      <ProseContent>
        <section className="section-block p-6 rise-in">
          <p className="kicker mb-1">Usage</p>
          <h2 className="mb-3 mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">Basic pattern</h2>
          <p className="mb-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            Run the binary with a provider name and any flags you need.
          </p>

          <CodeBlock>./limitaid &lt;provider&gt; [options]</CodeBlock>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-[var(--ink)]">Available providers</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <ProviderChip name="codex" desc="Codex / OpenAI rate limits" />
              <ProviderChip name="openrouter" desc="OpenRouter balance and usage" />
              <ProviderChip name="zai" desc="Z.ai coding plan limits" />
              <ProviderChip name="all" desc="Run every provider in sequence" />
            </div>
          </div>
        </section>

        <section className="section-block mt-8 p-6 rise-in">
          <p className="kicker mb-1">Flags</p>
          <h2 className="mb-4 mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">Global options</h2>
          <p className="mb-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            These work on the root command — before you even pick a provider.
          </p>
          <FlagTable rows={[
            ['-h, --help', 'Print help text and exit'],
            ['-v, --version', 'Print version (0.1.0) and exit'],
            ['--verbose', 'Increase log verbosity (stacks)'],
            ['--quiet', 'Suppress all output except errors'],
          ]} />
        </section>

        <section className="section-block mt-8 p-6 rise-in">
          <p className="kicker mb-1">Flags</p>
          <h2 className="mb-4 mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">Common provider options</h2>
          <p className="mb-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            Every subcommand accepts these flags.
          </p>
          <FlagTable rows={[
            ['-j, --json', 'Output raw JSON from the API response'],
            ['-c, --conf &lt;file&gt;', 'Path to a custom key config file'],
            ['--provider-config \'...\'', 'Inject a key directly on the command line'],
          ]} />
        </section>

        <section className="section-block mt-8 p-6 rise-in">
          <p className="kicker mb-1">Flags</p>
          <h2 className="mb-4 mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">Provider-specific options</h2>
          <p className="mb-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            Some flags only make sense for certain providers.
          </p>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-[var(--ink)]">openrouter and zai only</p>
              <FlagTable rows={[
                ['-n, --name &lt;name&gt;', 'Select a specific named key from your config'],
              ]} />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-[var(--ink)]">all only</p>
              <FlagTable rows={[
                ['--loop &lt;seconds&gt;', 'Re-run all providers on a timer (minimum 30s)'],
              ]} />
            </div>
          </div>
        </section>

        <section className="section-block mt-8 p-6 rise-in">
          <p className="kicker mb-1">Feature</p>
          <h2 className="mb-4 mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">Loop mode</h2>
          <p className="mb-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            Pass <code>--loop</code> with a number of seconds and LimitAID will
            clear your terminal and re-draw the output on that interval. Minimum
            interval is 30 seconds.
          </p>
          <CodeBlock>./limitaid all --loop 60</CodeBlock>
          <p className="mt-3 text-sm text-[var(--ink-soft)]">
            Press Ctrl+C to stop.
          </p>
        </section>

        <section className="section-block mt-8 p-6 rise-in">
          <p className="kicker mb-1">Feature</p>
          <h2 className="mb-4 mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">JSON output</h2>
          <p className="mb-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            Adding <code>--json</code> skips the formatted display and dumps the
            raw API response. Pipe it into <code>jq</code>, log it to a file.
          </p>
          <CodeBlock>./limitaid codex --json</CodeBlock>
          <p className="mt-3 text-sm text-[var(--ink-soft)]">
            Works the same way with openrouter, zai, and all. When combined with{' '}
            <code>--loop</code>, each cycle prints a fresh JSON blob.
          </p>
        </section>

        <section className="section-block mt-8 p-6 rise-in">
          <p className="kicker mb-1">Examples</p>
          <h2 className="mb-4 mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">Common invocations</h2>
          <div className="space-y-4">
            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--ink)]">Check every provider at once</p>
              <CodeBlock>./limitaid all</CodeBlock>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--ink)]">Query a specific OpenRouter key</p>
              <CodeBlock>./limitaid openrouter --name work-key</CodeBlock>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--ink)]">Use a custom config file</p>
              <CodeBlock>./limitaid zai --conf ./my-keys.conf</CodeBlock>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--ink)]">Inject a key on the fly</p>
              <CodeBlock>./limitaid openrouter --provider-config 'openrouter::sk-or-v1-abc123'</CodeBlock>
            </div>
          </div>
        </section>
      </ProseContent>
    </main>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-4 py-3 text-sm leading-relaxed text-[var(--ink-soft)]">
      <code>{children}</code>
    </pre>
  )
}

function FlagTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-hidden rounded-md border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--surface-1)]">
            <th className="px-4 py-2.5 text-left text-[13px] font-semibold text-[var(--ink)]">Flag</th>
            <th className="px-4 py-2.5 text-left text-[13px] font-semibold text-[var(--ink)]">What it does</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([flag, desc]) => (
            <tr key={flag} className="border-b border-[var(--border)] last:border-b-0">
              <td className="whitespace-nowrap px-4 py-2 font-mono text-[12px] text-[var(--green)]">{flag}</td>
              <td className="px-4 py-2 text-[var(--ink-soft)]">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ProviderChip({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="flex items-baseline gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2">
      <code className="shrink-0 text-[12px] font-bold text-[var(--green)]">{name}</code>
      <span className="text-sm text-[var(--ink-soft)]">{desc}</span>
    </div>
  )
}
