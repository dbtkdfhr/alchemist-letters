import { useState, useEffect } from 'react'
import { useGameStore, useUIStore, useAlchemyStore } from '../../store'
import { getChapterByIndex } from '../../data/chapters'
import { LetterPaper } from './LetterPaper'
import { useSound } from '../../hooks/useSound'

export function LetterViewer() {
  const currentChapter = useGameStore((s) => s.currentChapter)
  const currentPage = useGameStore((s) => s.currentPage)
  const completeChapter = useGameStore((s) => s.completeChapter)
  const gameFinished = useGameStore((s) => s.gameFinished)
  const setView = useUIStore((s) => s.setView)
  const isRecipeDiscovered = useAlchemyStore((s) => s.isRecipeDiscovered)
  const { play } = useSound()

  const [visible, setVisible] = useState(true)
  const [animating, setAnimating] = useState(false)

  const chapter = getChapterByIndex(currentChapter)
  if (!chapter) return null

  const pages = chapter.letter.content
  const totalPages = pages.length
  const isFirstPage = currentPage <= 0
  const isLastPage = currentPage >= totalPages - 1
  const hasReplyOptions = chapter.replyOptions.length > 0

  const recipeNotYetDiscovered =
    hasReplyOptions &&
    chapter.requiredRecipe != null &&
    !isRecipeDiscovered(chapter.requiredRecipe)

  const animateToPage = (targetPage: number) => {
    if (animating) return
    play('pageTurn')
    setAnimating(true)
    setVisible(false)
    setTimeout(() => {
      useGameStore.getState().goToPage(targetPage)
      setVisible(true)
      setTimeout(() => setAnimating(false), 100)
    }, 200)
  }

  const handleClick = () => {
    if (animating) return
    if (!isLastPage) {
      animateToPage(currentPage + 1)
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isFirstPage) {
      animateToPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (hasReplyOptions) {
      if (recipeNotYetDiscovered) {
        useAlchemyStore.getState().setReturnToLetter(true)
        setView('alchemy')
        return
      }
      setView('reply')
      useGameStore.getState().goToPage(0)
    } else {
      const outcome = chapter.result.success ?? chapter.result.failure
      completeChapter(currentChapter, outcome)
      setView('letterbox')
    }
  }

  useEffect(() => {
    useGameStore.getState().goToPage(0)
  }, [currentChapter])

  return (
    <LetterPaper>
      <div className="mb-4 text-center">
        <span className="font-ui text-xs text-ink-light/60">
          {chapter.letter.from === 'marco' ? '마르코가 보낸 편지' : chapter.letter.from === 'memory' ? '기억 속 편지' : '편지'}
        </span>
      </div>

      <div
        className={`
          flex-1 flex flex-col justify-center cursor-pointer
          transition-all duration-300 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
        onClick={handleClick}
      >
        <div className="font-handwriting text-lg md:text-xl text-ink leading-relaxed whitespace-pre-line">
          {pages[currentPage]}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!isFirstPage && (
            <button
              className="font-ui text-xs text-ink-light/40 hover:text-ink-light/70 transition-colors"
              onClick={handlePrev}
            >
              ← 이전
            </button>
          )}
        </div>

        <span className="font-ui text-xs text-ink-light/50">
          {currentPage + 1} / {totalPages}
        </span>

        <div className="flex items-center gap-3">
          {!isLastPage && (
            <button
              className="font-ui text-xs text-ink-light/40 hover:text-ink-light/70 transition-colors"
              onClick={() => animateToPage(currentPage + 1)}
            >
              다음 →
            </button>
          )}
          {isLastPage && (
            <div className="flex flex-col items-end gap-1">
              {recipeNotYetDiscovered && (
                <p className="font-ui text-xs text-ink-light/50 text-right leading-relaxed whitespace-nowrap">
                  편지 속 단서를 바탕으로<br />연금술을 실험해보세요
                </p>
              )}
              <button
                className="font-ui text-sm text-accent-brown hover:text-[#7A3B10] transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
              >
                {recipeNotYetDiscovered
                  ? '실험하러 가기 →'
                  : hasReplyOptions
                    ? '답장 쓰기 →'
                    : gameFinished
                      ? '이야기 마무리 →'
                      : '다음으로 →'
                }
              </button>
            </div>
          )}
        </div>
      </div>
    </LetterPaper>
  )
}
