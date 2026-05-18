import type { ReactNode } from 'react'

interface ProseContentProps {
  children: ReactNode
  className?: string
}

export default function ProseContent({ children, className }: ProseContentProps) {
  return (
    <div className="page-wrap px-4">
      <div className={`prose prose-lg dark:prose-invert max-w-none ${className ?? ''}`}>
        {children}
      </div>
    </div>
  )
}
