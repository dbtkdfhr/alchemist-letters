import { useGameStore, useAlchemyStore } from '../../store'
import { getChapterByIndex } from '../../data/chapters'

export function CluePanel() {
  const currentChapter = useGameStore((s) => s.currentChapter)
  const revealedClues = useAlchemyStore((s) => s.revealedClues)
  const isClueRevealed = useAlchemyStore((s) => s.isClueRevealed)

  const chapter = getChapterByIndex(currentChapter)
  const clues = chapter?.clues
  if (!clues || clues.length === 0) return null

  const allRevealed = clues.every((c) => isClueRevealed(c.id))

  return (
    <div className="mt-6">
      <h3 className="font-ui text-sm text-ink-light/60 mb-3">
        편지 속 단서
        {!allRevealed && (
          <span className="ml-2 text-xs text-accent-gold">
            (재료를 관찰하여 단서 해금)
          </span>
        )}
      </h3>
      <div className="space-y-2">
        {clues.map((clue) => {
          const revealed = isClueRevealed(clue.id)

          return (
            <div
              key={clue.id}
              className={`
                p-3 rounded-lg border transition-all duration-300
                ${revealed
                  ? 'border-accent-gold/30 bg-accent-gold/5'
                  : 'border-ink-light/10 bg-white/30'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-handwriting text-sm text-ink leading-tight">
                  {clue.title}
                </span>
                {revealed ? (
                  <span className="font-ui text-[10px] text-accent-gold/60 px-1.5 py-0.5 rounded bg-accent-gold/10">
                    해금
                  </span>
                ) : (
                  <span className="font-ui text-[10px] text-ink-light/30 px-1.5 py-0.5 rounded bg-ink-light/5">
                    ????
                  </span>
                )}
              </div>
              <p
                className={`
                  font-ui text-sm leading-relaxed transition-all duration-500
                  ${revealed
                    ? 'text-ink-light/80'
                    : 'text-ink-light/30 select-none blur-sm'
                  }
                `}
              >
                {revealed ? clue.clearText : clue.blurredText}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}