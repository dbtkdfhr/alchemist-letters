import type { ReactNode } from 'react'

interface LetterPaperProps {
  children: ReactNode
  className?: string
}

export function LetterPaper({ children, className = '' }: LetterPaperProps) {
  return (
    <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-6">
      <div
        className={`
          flex-1 letter-bg rounded-sm p-6 md:p-8
          relative overflow-hidden
          ${className}
        `}
        style={{
          boxShadow: `
            0 4px 6px rgba(0,0,0,0.05),
            0 2px 4px rgba(0,0,0,0.05),
            inset 0 0 60px rgba(139, 69, 19, 0.03)
          `,
        }}
      >
        {/* 종이 질감 오버레이 */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, #8B4513 1px, transparent 1px),
              radial-gradient(circle at 80% 70%, #8B4513 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 30px 30px',
          }}
        />
        {children}
      </div>
    </div>
  )
}
