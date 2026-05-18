import type { ReactNode } from 'react'

interface PageHeroProps {
  kicker: string
  title: string
  description?: ReactNode
}

export default function PageHero({ kicker, title, description }: PageHeroProps) {
  return (
    <div className="rise-in">
      <p className="kicker mb-3">{kicker}</p>
      <h1 className="text-4xl leading-[1.05] font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
