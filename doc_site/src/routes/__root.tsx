import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import Footer from '../components/Footer'
import Header from '../components/Header'
import { DEFAULT_SEO, SITE_URL, seo } from '../lib/seo'
import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

const STRUCTURED_DATA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LimitAID',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Linux, macOS',
  url: SITE_URL,
  downloadUrl: 'https://github.com/DimitriGilbert/LimitAID',
  codeRepository: 'https://github.com/DimitriGilbert/LimitAID',
  description: DEFAULT_SEO.description,
  author: {
    '@type': 'Person',
    name: 'Dimitri Gilbert',
  },
})

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo().meta,
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script src="https://chemin.dbuild.dev/script.js" data-id="7040d34e-b41f-4f20-88d1-b86ac93266c4" data-utcoffset="2" data-server="https://chemin.dbuild.dev" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[var(--green-soft)]">
        <Header />
        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
