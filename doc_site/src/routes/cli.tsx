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
        kicker="REFERENCE"
        title="Command Line Interface"
        description="LimitAID ships as a single binary with one subcommand per provider. This page covers every flag and option."
      />

      <ProseContent>
        {/* Usage Pattern */}
        <section className="island-shell rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Usage</p>
          <h2 className="display-title mb-4 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            Basic pattern
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            Run the binary with a provider name and any flags you need. The
            provider is a required positional argument.
          </p>

          <CodeBlock>./limitaid &lt;provider&gt; [options]</CodeBlock>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold tracking-wide text-[var(--sea-ink)]">
              Available providers
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <ProviderChip name="codex" desc="Codex / OpenAI rate limits" />
              <ProviderChip name="openrouter" desc="OpenRouter balance and usage" />
              <ProviderChip name="zai" desc="Z.ai coding plan limits" />
              <ProviderChip name="all" desc="Run every provider in sequence" />
            </div>
          </div>
        </section>

        {/* Global Options */}
        <section className="island-shell mt-10 rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Flags</p>
          <h2 className="display-title mb-4 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            Global options
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            These work on the root command — before you even pick a provider.
          </p>

          <div className="overflow-hidden rounded-lg border border-[var(--line)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] bg-[var(--surface)]">
                  <th className="px-4 py-3 text-left font-semibold text-[var(--sea-ink)]">
                    Flag
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--sea-ink)]">
                    What it does
                  </th>
                </tr>
              </thead>
              <tbody>
                <OptionRow flag="-h, --help" desc="Print help text and exit" />
                <OptionRow flag="-v, --version" desc="Print version (0.1.0) and exit" />
                <OptionRow flag="--verbose" desc="Increase log verbosity (stacks)" />
                <OptionRow flag="--quiet" desc="Suppress all output except errors" />
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Options */}
        <section className="island-shell mt-10 rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Flags</p>
          <h2 className="display-title mb-4 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            Common provider options
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            Every subcommand accepts these flags.
          </p>

          <div className="overflow-hidden rounded-lg border border-[var(--line)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--line)] bg-[var(--surface)]">
                  <th className="px-4 py-3 text-left font-semibold text-[var(--sea-ink)]">
                    Flag
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--sea-ink)]">
                    What it does
                  </th>
                </tr>
              </thead>
              <tbody>
                <OptionRow flag="-j, --json" desc="Output raw JSON from the API response" />
                <OptionRow
                  flag="-c, --conf &lt;file&gt;"
                  desc="Path to a custom key config file"
                />
                <OptionRow
                  flag="--provider-config '<provider>::<key>[::<name>]'"
                  desc="Inject a key directly on the command line"
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* Provider-Specific Options */}
        <section className="island-shell mt-10 rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Flags</p>
          <h2 className="display-title mb-4 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            Provider-specific options
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            Some flags only make sense for certain providers.
          </p>

          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm font-semibold tracking-wide text-[var(--sea-ink)]">
                openrouter and zai only
              </p>
              <div className="overflow-hidden rounded-lg border border-[var(--line)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--line)] bg-[var(--surface)]">
                      <th className="px-4 py-3 text-left font-semibold text-[var(--sea-ink)]">
                        Flag
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--sea-ink)]">
                        What it does
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <OptionRow
                      flag="-n, --name &lt;name&gt;"
                      desc="Select a specific named key from your config"
                    />
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold tracking-wide text-[var(--sea-ink)]">
                all only
              </p>
              <div className="overflow-hidden rounded-lg border border-[var(--line)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--line)] bg-[var(--surface)]">
                      <th className="px-4 py-3 text-left font-semibold text-[var(--sea-ink)]">
                        Flag
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--sea-ink)]">
                        What it does
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <OptionRow
                      flag="--loop &lt;seconds&gt;"
                      desc="Re-run all providers on a timer (minimum 30s)"
                    />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Loop Mode */}
        <section className="island-shell mt-10 rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Feature</p>
          <h2 className="display-title mb-4 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            Loop mode
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            Pass <code>--loop</code> with a number of seconds and LimitAID will
            clear your terminal and re-draw the output on that interval. Handy
            for keeping a live dashboard on a spare monitor. The minimum
            interval is 30 seconds — anything lower gets bumped up automatically.
          </p>

          <CodeBlock>./limitaid all --loop 60</CodeBlock>

          <p className="mt-4 text-sm text-[var(--sea-ink-soft)]">
            That command runs every provider once, waits 60 seconds, clears the
            screen, and does it again. Press Ctrl+C to stop.
          </p>
        </section>

        {/* JSON Output */}
        <section className="island-shell mt-10 rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Feature</p>
          <h2 className="display-title mb-4 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            JSON output
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            Adding <code>--json</code> to any provider skips the formatted
            display and dumps the raw API response. Pipe it into <code>jq</code>,
            log it to a file, or feed it into your own scripts.
          </p>

          <CodeBlock>./limitaid codex --json</CodeBlock>

          <p className="mt-4 text-sm text-[var(--sea-ink-soft)]">
            Works the same way with openrouter, zai, and all. When combined with{' '}
            <code>--loop</code>, each cycle prints a fresh JSON blob.
          </p>
        </section>

        {/* Quick examples */}
        <section className="island-shell mt-10 rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Examples</p>
          <h2 className="display-title mb-4 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            Common invocations
          </h2>

          <div className="space-y-4">
            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--sea-ink)]">
                Check every provider at once
              </p>
              <CodeBlock>./limitaid all</CodeBlock>
            </div>

            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--sea-ink)]">
                Query a specific OpenRouter key
              </p>
              <CodeBlock>./limitaid openrouter --name work-key</CodeBlock>
            </div>

            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--sea-ink)]">
                Use a custom config file
              </p>
              <CodeBlock>./limitaid zai --conf ./my-keys.conf</CodeBlock>
            </div>

            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--sea-ink)]">
                Inject a key on the fly
              </p>
              <CodeBlock>
                ./limitaid openrouter --provider-config 'openrouter::sk-or-v1-abc123'
              </CodeBlock>
            </div>
          </div>
        </section>
      </ProseContent>
    </main>
  )
}

/* ── Small helper components ────────────────────────────────── */

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-[var(--line)] bg-[#1d2e45] px-4 py-3 text-sm leading-relaxed text-[#e8efff]">
      <code>{children}</code>
    </pre>
  )
}

function OptionRow({ flag, desc }: { flag: string; desc: string }) {
  return (
    <tr className="border-b border-[var(--line)] last:border-b-0">
      <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-[var(--lagoon-deep)]">
        {flag}
      </td>
      <td className="px-4 py-2.5 text-[var(--sea-ink-soft)]">{desc}</td>
    </tr>
  )
}

function ProviderChip({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="flex items-baseline gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-2">
      <code className="shrink-0 text-xs font-semibold text-[var(--lagoon-deep)]">
        {name}
      </code>
      <span className="text-sm text-[var(--sea-ink-soft)]">{desc}</span>
    </div>
  )
}
