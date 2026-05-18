import { createFileRoute } from '@tanstack/react-router'

import PageHero from '#/components/PageHero'
import ProseContent from '#/components/ProseContent'

export const Route = createFileRoute('/configuration')({
  component: ConfigurationPage,
})

function ConfigurationPage() {
  return (
    <main className="pb-16 pt-14">
      <PageHero
        kicker="CONFIGURATION"
        title="Setting Up Your Keys"
        description="LimitAID needs your API keys to query provider limits. Codex and Z.ai keys are found automatically. OpenRouter requires manual setup."
      />

      <ProseContent>
        {/* Auto-Discovery */}
        <section className="island-shell rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Auto-Discovery</p>
          <h2 className="display-title mb-3 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            Keys That Find Themselves
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            LimitAID checks well-known locations on your machine for existing
            credentials. If you've already logged into one of these tools,
            there's nothing to configure — it just works.
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

          <p className="text-sm text-[var(--sea-ink-soft)]">
            When auto-discovery finds a key, it gets stored under the name{' '}
            <code>default</code>. If you also configure a key for the same
            provider in your config file, the config file entry takes priority.
            Auto-discovery only runs when no keys have been loaded yet.
          </p>
        </section>

        {/* Key Config File */}
        <section className="island-shell mt-10 rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Config File</p>
          <h2 className="display-title mb-3 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            The keys.conf File
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            For OpenRouter keys (and to override auto-discovered keys for other
            providers), create a config file at{' '}
            <code>~/.config/limitaid/keys.conf</code>. Each line maps a named
            key to a file on disk that holds the raw API key value. No trailing
            newline in the key file.
          </p>

          <pre className="mb-5 overflow-x-auto rounded-lg p-4 text-sm leading-relaxed">
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

          <div className="space-y-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--sea-ink-soft)]">
            <div>
              <span className="font-medium text-[var(--sea-ink)]">
                Default location:
              </span>{' '}
              <code>~/.config/limitaid/keys.conf</code>
            </div>
            <div>
              <span className="font-medium text-[var(--sea-ink)]">
                Format:
              </span>{' '}
              <code>{`<provider>_<name>=<path>`}</code> — one entry per line
            </div>
            <div>
              <span className="font-medium text-[var(--sea-ink)]">
                Key files:
              </span>{' '}
              should contain the raw key with no trailing newline
            </div>
            <div>
              <span className="font-medium text-[var(--sea-ink)]">
                Providers:
              </span>{' '}
              codex, openrouter, zai
            </div>
          </div>
        </section>

        {/* CLI Overrides */}
        <section className="island-shell mt-10 rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">CLI Overrides</p>
          <h2 className="display-title mb-3 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            Override Everything From the Command Line
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            Three flags give you full control without touching a config file.
            Pass them on any provider subcommand.
          </p>

          <div className="mb-6 space-y-4">
            <CliFlag
              flag="--conf <path>"
              purpose="Use a custom config file instead of the default location. Point it wherever you keep your keys."
            />
            <CliFlag
              flag="--provider-config 'provider::key_value[::name]'"
              purpose="Inject a key directly on the command line. No file needed. This overrides everything else — config file entries and auto-discovered keys both get replaced."
            />
            <CliFlag
              flag="-n, --name <name>"
              purpose="Pick a specific named key when you have more than one configured. Works with openrouter and zai."
            />
          </div>

          <p className="mb-3 text-sm font-medium text-[var(--sea-ink)]">
            Examples
          </p>
          <pre className="overflow-x-auto rounded-lg p-4 text-sm leading-relaxed">
            <code>{`# Use a different config file
./limitaid openrouter --conf ~/my-keys.conf

# Inject a Z.ai key directly, name it "work"
./limitaid zai --provider-config 'zai::sk-abc123::work'

# Select the "work" key from your config file
./limitaid openrouter -n work`}</code>
          </pre>
        </section>

        {/* Resolution Order */}
        <section className="island-shell mt-10 rounded-xl p-6 rise-in">
          <p className="island-kicker mb-2">Resolution Order</p>
          <h2 className="display-title mb-3 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
            How LimitAID Picks Your Key
          </h2>
          <p className="mb-5 text-[var(--sea-ink-soft)]">
            When you run a provider command, keys are resolved in a strict
            priority order. The first source that provides a key wins.
          </p>

          <div className="mb-4 space-y-3">
            <StepRow step={1} label="Config file">
              Entries from <code>keys.conf</code> (or the file specified with{' '}
              <code>--conf</code>) are loaded first.
            </StepRow>
            <StepRow step={2} label="CLI override">
              <code>--provider-config</code> replaces all discovered or
              configured keys with a single injected key.
            </StepRow>
            <StepRow step={3} label="Auto-discovery">
              If nothing turned up a key yet, LimitAID checks the well-known
              locations on your machine.
            </StepRow>
          </div>
        </section>
      </ProseContent>
    </main>
  )
}

/* ── Sub-components ─────────────────────────────────────── */

function DiscoveryCard({
  provider,
  status,
  detail,
  note,
}: {
  provider: string
  status: 'auto' | 'manual'
  detail: string
  note: string
}) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="mb-1 flex items-center gap-2">
        <span
          className={`inline-block size-2 rounded-full ${status === 'auto' ? 'bg-emerald-500' : 'bg-amber-500'}`}
        />
        <span className="text-sm font-semibold text-[var(--sea-ink)]">
          {provider}
        </span>
      </div>
      <p className="mb-1 text-xs text-[var(--sea-ink-soft)]">
        <code className="text-[0.7rem]">{detail}</code>
      </p>
      <p className="text-xs text-[var(--sea-ink-soft)]">{note}</p>
    </div>
  )
}

function CliFlag({ flag, purpose }: { flag: string; purpose: string }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
      <code className="mb-1 block text-sm font-semibold text-[var(--sea-ink)]">
        {flag}
      </code>
      <p className="text-sm text-[var(--sea-ink-soft)]">{purpose}</p>
    </div>
  )
}

function StepRow({
  step,
  label,
  children,
}: {
  step: number
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--sea-ink)] text-xs font-bold text-white">
        {step}
      </span>
      <div>
        <p className="mb-0.5 text-sm font-semibold text-[var(--sea-ink)]">
          {label}
        </p>
        <p className="text-sm text-[var(--sea-ink-soft)]">{children}</p>
      </div>
    </div>
  )
}
