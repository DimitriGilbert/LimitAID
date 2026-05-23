export const SITE_URL = 'https://limitaid.dbuild.dev'

export const DEFAULT_SEO = {
  title: 'LimitAID - AI Provider Quota Monitor',
  description:
    'LimitAID is a CLI for checking AI provider quotas, balances, and usage across Codex, OpenRouter, and Z.ai from one terminal command.',
  image: `${SITE_URL}/og-image.png`,
} as const

interface SeoOptions {
  title?: string
  description?: string
  path?: string
}

export function seo({ title = DEFAULT_SEO.title, description = DEFAULT_SEO.description, path = '/' }: SeoOptions = {}) {
  const url = new URL(path, SITE_URL).toString()

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Dimitri Gilbert' },
      { name: 'theme-color', content: '#0f172a' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'LimitAID' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: DEFAULT_SEO.image },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: DEFAULT_SEO.image },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
