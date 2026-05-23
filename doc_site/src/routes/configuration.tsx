import { createFileRoute } from '@tanstack/react-router'

import PageHero from '#/components/PageHero'
import ProseContent from '#/components/ProseContent'
import { seo } from '#/lib/seo'

export const Route = createFileRoute('/configuration')({
  head: () =>
    seo({
      title: 'LimitAID Configuration - API Keys and Provider Setup',
      description:
        'Configure LimitAID API keys for Codex, OpenRouter, and Z.ai with auto-discovery, keys.conf, and command-line overrides.',
      path: '/configuration',
    }),
  component: ConfigurationPage,
})

function ConfigurationPage() {
  return (
    <main className="pb-16 pt-14">
      <PageHero
        kicker="Configuration"
        title="Setting Up Your Keys"
        description="LimitAID needs your API keys to query provider limits. Codex and Z.ai keys are found automatically. OpenRouter requires manual setup."
      />

      <ProseContent>
        <section className="section-block p-6 rise-in">
          <p className="kicker mb-1">Auto-Discovery</p>
          <h2 className="mb-3 mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">
            Keys That Find Themselves
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            LimitAID checks well-known locations on your machine for existing
            credentials. If you've already logged into one of these tools,
            there's nothing to configure.
          </p>

          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            <DiscoveryCard
              provider="Codex"
              status="auto"
              detail="Reads ~/.codex/auth.json"
              note="Logged into Codex? Done."
            />
            <DiscoveryCard
              provider="Z.ai"
              status="auto"
              detail="Reads ~/.config/opencode/opencode.json"
              note="Uses your opencode config."
            />
            <DiscoveryCard
              provider="OpenRouter"
              status="manual"
              detail="No auto-discovery"
              note="Add keys to keys.conf by hand."
            />
          </div>

          <p className="text-sm text-[var(--ink-soft)]">
            When auto-discovery finds a key, it gets stored under the name{' '}
            <code>default</code>. If you also configure a key for the same
            provider in your config file, the config file entry takes priority.
          </p>
        </section>

        <section className="section-block mt-8 p-6 rise-in">
          <p className="kicker mb-1">Config File</p>
          <h2 className="mb-3 mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">
            The keys.conf File
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            For OpenRouter keys (and to override auto-discovered keys for other
            providers), create a config file at{' '}
            <code>~/.config/limitaid/keys.conf</code>. Each line maps a named
            key to a file on disk that holds the raw API key value.
          </p>

          <pre className="mb-5 overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--surface-1)] p-4 text-sm leading-relaxed text-[var(--ink-soft)]">
            <code>{`# LimitAID Key Configuration
# Format: <provider>_<name>=<path_to_file_containing_key>

# OpenRouter keys
# openrouter_work=/home/user/.secrets/openrouter_work
# openrouter_personal=/home/user/.secrets/openrouter_personal

# Z.ai keys (overrides auto-discovered key)
# zai_personal=/home/user/.secrets/zai_personal

# Codex keys (overrides auto-discovered key)
# codex_work=/home/user/.secrets/codex_work`}</code>
          </pre>

          <div className="space-y-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-1)] p-4 text-sm text-[var(--ink-soft)]">
            <div><span className="font-medium text-[var(--ink)]">Default location:</span> <code>~/.config/limitaid/keys.conf</code></div>
            <div><span className="font-medium text-[var(--ink)]">Format:</span> <code>{`<provider>_<name>=<path>`}</code> — one entry per line</div>
            <div><span className="font-medium text-[var(--ink)]">Key files:</span> should contain the raw key with no trailing newline</div>
            <div><span className="font-medium text-[var(--ink)]">Providers:</span> codex, openrouter, zai</div>
          </div>
        </section>

        <section className="section-block mt-8 p-6 rise-in">
          <p className="kicker mb-1">CLI Overrides</p>
          <h2 className="mb-3 mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">
            Override Everything From the Command Line
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            Three flags give you full control without touching a config file.
          </p>

          <div className="mb-6 divide-y divide-[var(--border)] rounded-md border border-[var(--border)]">
            <CliFlag
              flag="--conf <path>"
              purpose="Use a custom config file instead of the default location."
            />
            <CliFlag
              flag="--provider-config 'provider::key_value[::name]'"
              purpose="Inject a key directly on the command line. Overrides everything."
            />
            <CliFlag
              flag="-n, --name <name>"
              purpose="Pick a specific named key when you have more than one configured."
            />
          </div>

          <p className="mb-3 text-sm font-semibold text-[var(--ink)]">Examples</p>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--surface-1)] p-4 text-sm leading-relaxed text-[var(--ink-soft)]">
            <code>{`# Use a different config file
./limitaid openrouter --conf ~/my-keys.conf

# Inject a Z.ai key directly, name it "work"
./limitaid zai --provider-config 'zai::sk-abc123::work'

# Select the "work" key from your config file
./limitaid openrouter -n work`}</code>
          </pre>
        </section>

        <section className="section-block mt-8 p-6 rise-in">
          <p className="kicker mb-1">Resolution Order</p>
          <h2 className="mb-3 mt-2 text-xl font-bold tracking-tight text-[var(--ink)]">
            How LimitAID Picks Your Key
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            When you run a provider command, keys are resolved in a strict
            priority order.
          </p>

          <div className="divide-y divide-[var(--border)] rounded-md border border-[var(--border)]">
            <StepRow step={1} label="Config file">Entries from <code>keys.conf</code> (or the file specified with <code>--conf</code>) are loaded first.</StepRow>
            <StepRow step={2} label="CLI override"><code>--provider-config</code> replaces all discovered or configured keys with a single injected key.</StepRow>
            <StepRow step={3} label="Auto-discovery">If nothing turned up a key yet, LimitAID checks well-known locations on your machine.</StepRow>
          </div>
        </section>
      </ProseContent>
    </main>
  )
}

function DiscoveryCard({ provider, status, detail, note }: {
  provider: string
  status: 'auto' | 'manual'
  detail: string
  note: string
}) {
  const isAuto = status === 'auto'
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--surface-1)] p-4">
      <div className="mb-1.5 flex items-center gap-2">
        <span className={`inline-block size-2 rounded-full ${isAuto ? 'bg-[var(--green)]' : 'bg-[var(--red)]'}`} />
        <span className="text-sm font-bold text-[var(--ink)]">{provider}</span>
      </div>
      <p className="mb-0.5 text-[12px] text-[var(--ink-muted)]"><code className="text-[11px]">{detail}</code></p>
      <p className="text-[12px] text-[var(--ink-muted)]">{note}</p>
    </div>
  )
}

function CliFlag({ flag, purpose }: { flag: string; purpose: string }) {
  return (
    <div className="p-4">
      <code className="mb-1 block text-[13px] font-semibold text-[var(--green)]">{flag}</code>
      <p className="text-sm text-[var(--ink-soft)]">{purpose}</p>
    </div>
  )
}

function StepRow({ step, label, children }: { step: number; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 p-4">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[var(--ink)] text-[11px] font-bold text-white">
        {step}
      </span>
      <div className="pt-0.5">
        <p className="mb-0.5 text-sm font-bold text-[var(--ink)]">{label}</p>
        <p className="text-sm text-[var(--ink-soft)]">{children}</p>
      </div>
    </div>
  )
}
