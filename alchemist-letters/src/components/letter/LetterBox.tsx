import { useGameStore, useUIStore } from '../../store'
import { getChapterByIndex } from '../../data/chapters'

export function LetterBox() {
  const readLetters = useGameStore((s) => s.readLetters)
  const currentChapter = useGameStore((s) => s.currentChapter)
  const setView = useUIStore((s) => s.setView)

  const visibleIndex = currentChapter < 3 ? currentChapter : 0
  const chapter = getChapterByIndex(visibleIndex)

  if (!chapter) return null

  return (
    <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h2 className="font-handwriting text-3xl text-ink-dark mb-2">편지 보관함</h2>
        <div className="w-16 h-px bg-ink-light/20 mx-auto" />
      </div>

      {/* 새 편지 도착 */}
      <div
        className="
          letter-bg rounded-sm p-5 mb-4 cursor-pointer
          transition-all duration-200
          hover:shadow-lg hover:-translate-y-0.5
          border border-ink-light/10
        "
        onClick={() => {
          useGameStore.getState().goToPage(0)
          setView('letter')
        }}
      >
        <div className="flex items-start gap-4">
          {/* 봉투 아이콘 */}
          <div className="flex-shrink-0 w-12 h-12 bg-accent-brown/10 rounded-lg flex items-center justify-center">
            <svg
              viewBox="0 0 64 64"
              className="w-7 h-7 text-accent-brown"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="4" y="12" width="56" height="40" rx="4" />
              <polygon points="4,16 32,36 60,16" />
              <line x1="32" y1="36" x2="32" y2="52" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-handwriting text-lg text-ink mb-1">
              {chapter.title}
            </h3>
            <p className="font-ui text-sm text-ink-light/70 truncate">
              {chapter.letter.from === 'marco' ? '마르코가 보낸 편지' : '편지'}
            </p>
          </div>

          {/* 읽음 상태 */}
          <span className={`
            font-ui text-xs px-2 py-1 rounded-full flex-shrink-0 mt-1
            ${readLetters.includes(chapter.id)
              ? 'text-ink-light/40 bg-ink-light/5'
              : 'text-accent-brown bg-accent-brown/10 font-medium'
            }
          `}>
            {readLetters.includes(chapter.id) ? '읽음' : '새 편지'}
          </span>
        </div>
      </div>

      {/* 아직 도착하지 않은 편지 */}
      <div className="text-center mt-8">
        <p className="font-ui text-sm text-ink-light/40">
          {currentChapter >= 3
            ? '모든 편지를 읽었습니다.'
            : `${3 - currentChapter}개의 읽지 않은 편지가 있습니다.`}
        </p>
      </div>
    </div>
  )
}
