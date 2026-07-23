import { useUIStore, useGameStore, useAlchemyStore } from '../../store'
import { getChapterByIndex } from '../../data/chapters'
import type { LetterView } from '../../types'

interface NavButton {
  label: string
  view: LetterView
  showWhen?: LetterView[]
  onClick?: () => LetterView | void
}

export function BottomNav() {
  const currentView = useUIStore((s) => s.currentView)
  const setView = useUIStore((s) => s.setView)

  const currentChapter = useGameStore((s) => s.currentChapter)
  const isRecipeDiscovered = useAlchemyStore((s) => s.isRecipeDiscovered)

  if (currentView === 'letterbox') return null

  const chapter = getChapterByIndex(currentChapter)

  const handleReplyClick = () => {
    if (!chapter) { setView('reply'); return }
    const recipeNotYetDiscovered =
      chapter.replyOptions.length > 0 &&
      chapter.requiredRecipe != null &&
      !isRecipeDiscovered(chapter.requiredRecipe)
    if (recipeNotYetDiscovered) {
      useAlchemyStore.getState().setReturnToLetter(true)
      setView('alchemy')
    } else {
      setView('reply')
    }
  }

  const letterViewButtons: NavButton[] = [
    { label: '연금술 노트', view: 'notebook', showWhen: ['letter', 'alchemy', 'reply'] },
    { label: '재료 상자', view: 'alchemy', showWhen: ['letter', 'reply'] },
    { label: '답장 쓰기', view: 'reply', showWhen: ['letter'], onClick: handleReplyClick },
    { label: '편지 보관함', view: 'letterbox', showWhen: ['letter', 'alchemy', 'reply', 'notebook'] },
  ]

  const visibleButtons = letterViewButtons.filter(
    (btn) => btn.showWhen?.includes(currentView)
  )

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#F5F0E8]/95 backdrop-blur-sm border-t border-ink-light/10 px-4 py-3">
      <div className="max-w-lg mx-auto flex justify-center gap-3">
        {visibleButtons.map((btn) => (
          <button
            key={btn.view}
            onClick={() => (btn.onClick ? btn.onClick() : setView(btn.view))}
            className={`
              font-ui text-sm px-4 py-2 rounded-lg transition-all duration-200
              ${currentView === btn.view
                ? 'bg-accent-brown text-white shadow-sm'
                : 'text-ink-light hover:text-ink hover:bg-ink-light/10'
              }
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
