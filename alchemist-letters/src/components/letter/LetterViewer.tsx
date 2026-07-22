import { useState, useEffect } from 'react'
import { useGameStore, useUIStore } from '../../store'
import { getChapterByIndex } from '../../data/chapters'
import { LetterPaper } from './LetterPaper'
import { useSound } from '../../hooks/useSound'

export function LetterViewer() {
  const currentChapter = useGameStore((s) => s.currentChapter)
  const currentPage = useGameStore((s) => s.currentPage)
  const nextPage = useGameStore((s) => s.nextPage)
  const setView = useUIStore((s) => s.setView)
  const { play } = useSound()

  const [visible, setVisible] = useState(true)
  const [animating, setAnimating] = useState(false)

  const chapter = getChapterByIndex(currentChapter)
  if (!chapter) return null

  const pages = chapter.letter.content
  const totalPages = pages.length
  const isLastPage = currentPage >= totalPages - 1

  const handleClick = () => {
    if (animating) return
    if (!isLastPage) {
      play('pageTurn')
      setAnimating(true)
      setVisible(false)
      setTimeout(() => {
        nextPage()
        setVisible(true)
        setTimeout(() => setAnimating(false), 100)
      }, 200)
    }
  }

  useEffect(() => {
    useGameStore.getState().goToPage(0)
  }, [currentChapter])

  return (
    <LetterPaper>
      <div className="mb-4 text-center">
        <span className="font-ui text-xs text-ink-light/60">
          {chapter.letter.from === 'marco' ? '마르코가 보낸 편지' : '편지'}
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
        <span className="font-ui text-xs text-ink-light/50">
          {currentPage + 1} / {totalPages}
        </span>
        {!isLastPage && (
          <span className="font-ui text-xs text-ink-light/40 animate-pulse">
            계속 읽으려면 클릭
          </span>
        )}
        {isLastPage && (
          <button
            className="font-ui text-sm text-accent-brown hover:text-[#7A3B10] transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setView('reply')
              useGameStore.getState().goToPage(0)
            }}
          >
            답장 쓰기 →
          </button>
        )}
      </div>
    </LetterPaper>
  )
}
