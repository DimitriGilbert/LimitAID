import type { ReactNode } from 'react'

interface PageHeroProps {
  kicker: string
  title: string
  description?: ReactNode
}

export default function PageHero({ kicker, title, description }: PageHeroProps) {
  return (
    <div className="page-wrap mb-16 px-4 rise-in">
      <p className="island-kicker mb-3">{kicker}</p>
      <h1 className="display-title text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
