# LimitAID Documentation Site

Static documentation site for [LimitAID](https://github.com/sshm0debuild/limitAID) — an AI provider quota monitoring tool.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm run build
```

Static output is generated in `.output/public/`.

## Deploy

```bash
./deploy.sh
```

Deploys to GitHub Pages at [sshm0.debuild.dev](https://sshm0.debuild.dev).

## Tech Stack

- [TanStack Start](https://tanstack.com/start) with static prerendering
- [Tailwind CSS](https://tailwindcss.com) v4
- [Radix UI](https://www.radix-ui.com) primitives
- [Lucide](https://lucide.dev) icons
