# LimitAID - AI Provider Quota Monitor

CLI tool to query quota limits for AI providers (Codex/OpenAI, OpenRouter, Z.ai).

## Architecture

```
LimitAID/
├── bin/
│   ├── limitaid          # Main entry - subcommand router (codex|openrouter|zai|all)
│   ├── codex             # Codex + Spark limits
│   ├── openrouter        # OpenRouter balance per key
│   ├── zai               # Z.ai coding plan limits per key
│   └── all               # Run all providers sequentially
├── lib/
│   ├── output.sh         # Pretty print + JSON formatting helpers
│   ├── config.sh         # Key config loading (auto-discover + overrides)
│   ├── http.sh           # curl wrapper for API calls
│   └── time.sh           # Time formatting helpers (seconds -> human readable)
├── limitaid.rc           # Source this to add bin/ to PATH
└── keys.conf.example     # Example key config file
```

## CLI Interface

```
limitaid <provider> [options]

Providers:
  codex            Codex/OpenAI + Spark limits (auto-detects from ~/.codex/auth.json)
  openrouter       OpenRouter key balance (reads keys from config)
  zai              Z.ai coding plan limits (auto-detects from ~/.config/opencode/opencode.json)
  all              Query all providers sequentially

Options (on main script + all subcommands):
  --json           Output raw JSON instead of pretty format
  --conf <file>    Override key config file (default: ~/.config/limitaid/keys.conf)
  --provider-config "<provider>::<key>[::<name>]"
                   Pass a key directly on CLI (provider + key mandatory, name optional)
                   Example: --provider-config "openrouter::sk-xxx::work"
                   Example: --provider-config "zai::ddade62...::personal"
  --help           Show help
  --version        Show version
```

## Provider Details

### Codex/OpenAI (+ Spark)

- **API**: `GET https://chatgpt.com/backend-api/wham/usage`
- **Auth**: Bearer token from `~/.codex/auth.json` → `tokens.access_token`
- **Data extracted**:
  - `plan_type` (e.g. "prolite")
  - `rate_limit.primary_window` → 5h limit (used_percent, reset_at)
  - `rate_limit.secondary_window` → weekly limit (used_percent, reset_at)
  - `additional_rate_limits[0]` → Spark 5h + weekly limits
  - `credits.balance`

### OpenRouter

- **API**: `GET https://openrouter.ai/api/v1/key`
- **Auth**: Bearer API key
- **Data extracted**:
  - `data.label` (key name)
  - `data.limit` / `data.limit_remaining` (credit limit + remaining)
  - `data.usage` / `data.usage_daily` / `data.usage_weekly` / `data.usage_monthly`
  - `data.is_free_tier`
- **Keys**: From config file, format `openrouter_<name>=<path_to_key_file>`
  - Key file contains the raw API key string
  - Multiple keys supported (one line each)

### Z.ai Coding Plan

- **API**: `GET https://api.z.ai/api/monitor/usage/quota/limit`
- **Auth**: Bearer API key
- **Data extracted**:
  - `data.level` (plan level, e.g. "pro")
  - `data.limits[0]` → TIME_LIMIT (5h window: usage, remaining, percentage, nextResetTime)
    - `usageDetails[]` → per-MCP breakdown (search-prime, web-reader, zread, etc.)
  - `data.limits[1]` → TOKENS_LIMIT (weekly: percentage, nextResetTime)
- **Keys**: Auto-discover from `~/.config/opencode/opencode.json` → `provider.zai-coding-plan.options.apiKey`
- **Multiple keys**: From config file, format `zai_<name>=<path_to_key_file>`

## Output Format

### Pretty (default)

```
$ limitaid codex

Codex/OpenAI (prolite)
├─ 5h window:  11% used ██████░░░░░░░░░░░░░░░░ resets in 4h35m
├─ Weekly:     12% used ██████░░░░░░░░░░░░░░░░░ resets in 6d5h
├─ Credits:    $0.00
└─ Spark:
   ├─ 5h window:   0% used ░░░░░░░░░░░░░░░░░░░░░ resets in 5h00m
   └─ Weekly:       0% used ░░░░░░░░░░░░░░░░░░░░░ resets in 7d0h

$ limitaid openrouter

OpenRouter
├─ work (sk-...xxx)
│  ├─ Limit:      $50.00
│  ├─ Remaining:  $42.50
│  └─ Usage today: $3.20
└─ personal (sk-...yyy)
   ├─ Limit:      unlimited
   └─ Usage today: $1.10

$ limitaid zai

Z.ai Coding Plan (pro)
├─ 5h window:    3% used █░░░░░░░░░░░░░░░░░░░░ resets in 3h22m
│  └─ MCP usage: search-prime: 9, web-reader: 4, zread: 22
└─ Weekly tokens: 1% used ░░░░░░░░░░░░░░░░░░░░░ resets in 5d14h
```

### JSON (`--json` flag)

Raw API response, one JSON object per provider. For `all`, outputs an array.

## Config File

Default: `~/.config/limitaid/keys.conf`

```conf
# OpenRouter keys (name=path to file containing the API key)
openrouter_work=/home/didi/.secrets/openrouter_work
openrouter_personal=/home/didi/.secrets/openrouter_personal

# Z.ai keys (overrides auto-discovered key)
zai_personal=/home/didi/.secrets/zai_personal
```

## Key Discovery Priority

1. `--provider-config` CLI flag (highest priority)
2. `keys.conf` file (via `--conf` or default location)
3. Auto-discover from existing configs:
   - Codex: `~/.codex/auth.json`
   - Z.ai: `~/.config/opencode/opencode.json`

## Implementation Steps

1. **Scaffold project** with parseArger `project` command
2. **Create lib/ helpers** (output.sh, config.sh, http.sh, time.sh)
3. **Create bin/codex** subcommand - API call + pretty output
4. **Create bin/openrouter** subcommand - multi-key support
5. **Create bin/zai** subcommand - MCP usage breakdown
6. **Create bin/all** subcommand - sequential aggregation
7. **Wire up main bin/limitaid** with subcommand routing
8. **Test** each provider manually
9. **Generate completion** with parseArger `completely`
10. **Generate docs** with parseArger `document`

## Dependencies

- `bash` (4.3+ for associative arrays)
- `curl` (API calls)
- `jq` (JSON parsing)
- `sqlite3` (optional, for future local-only fallback)
- `parseArger` (at `/home/didi/workspace/Code/parseArger/parseArger`)
