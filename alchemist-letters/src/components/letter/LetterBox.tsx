import { useEffect, useState } from 'react'
import { useGameStore, useUIStore } from '../../store'
import { getChapter } from '../../data/chapters'

export function LetterBox() {
  const readLetters = useGameStore((s) => s.readLetters)
  const unlockedLetters = useGameStore((s) => s.unlockedLetters)
  const sentReplies = useGameStore((s) => s.sentReplies)
  const gameFinished = useGameStore((s) => s.gameFinished)
  const lastOutcome = useGameStore((s) => s.lastOutcome)
  const setView = useUIStore((s) => s.setView)

  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Collect all unlocked chapters with data
  const chapters = unlockedLetters
    .map((id) => ({ id, data: getChapter(id) }))
    .filter((c): c is { id: string; data: NonNullable<ReturnType<typeof getChapter>> } => c.data !== undefined)

	// Sort by chapter id descending (newest first)
	  chapters.sort((a, b) => b.id.localeCompare(a.id))

  if (chapters.length === 0) return null

  const pendingCount = chapters.filter((c) => !readLetters.includes(c.id)).length
  const isAllRead = pendingCount === 0 && chapters.length > 0

  const unreadEntries = chapters.filter((c) => !readLetters.includes(c.id))

  return (
    <div className="flex-1 max-w-lg mx-auto w-full px-4 py-8">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h2 className="font-handwriting text-3xl text-ink-dark mb-2">편지 보관함</h2>
        <div className="w-16 h-px bg-ink-light/20 mx-auto" />
      </div>

      {/* 편지 목록 */}
      <div className="space-y-3">
        {chapters.map(({ id, data }) => {
          const isRead = readLetters.includes(id)
          const isReplied = id in sentReplies
          const isCurrentUnread = !isRead
          const unreadIndex = isCurrentUnread ? unreadEntries.findIndex((e) => e.id === id) : -1

          return (
            <div
              key={id}
              onClick={() => {
                useGameStore.getState().goToPage(0)
                const idx = parseInt(id.replace('ch', '')) - 1
                // Set the current chapter to this chapter's index
                useGameStore.setState({ currentChapter: idx })
                setView('letter')
              }}
              className={`
                letter-bg rounded-sm p-4 cursor-pointer
                transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5
                border ${isCurrentUnread ? 'border-accent-brown/30' : 'border-ink-light/10'}
                ${isCurrentUnread ? 'bg-accent-brown/[0.02]' : ''}
                ${isCurrentUnread
                  ? 'transition-all duration-500 ease-out'
                  : ''
                }
              `}
              style={isCurrentUnread && !mounted ? {
                transform: 'translateX(100%)',
                opacity: 0,
              } : isCurrentUnread && mounted ? {
                transform: 'translateX(0)',
                opacity: 1,
                transitionDelay: `${unreadIndex * 200}ms`,
              } : undefined}
            >
              <div className="flex items-start gap-4">
                {/* 봉투 아이콘 */}
                <div className={`
                  flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center
                  ${isCurrentUnread ? 'bg-accent-brown/15' : 'bg-ink-light/5'}
                `}>
                  <svg
                    viewBox="0 0 64 64"
                    className={`w-6 h-6 ${isCurrentUnread ? 'text-accent-brown' : 'text-ink-light/40'}`}
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
                  <h3 className="font-handwriting text-lg text-ink mb-0.5">
                    {data.title}
                  </h3>
                  <p className="font-ui text-xs text-ink-light/60">
                    Act {data.act} · {data.letter.from === 'marco' ? '마르코가 보낸 편지' : data.letter.from === 'memory' ? '기억 속 편지' : '편지'}
                  </p>
                  {isReplied && (
                    <p className="font-ui text-xs text-accent-brown/60 mt-0.5">
                      답장 완료
                    </p>
                  )}
                </div>

                {/* 상태 뱃지 */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0 mt-0.5">
                  {isCurrentUnread && (
                    <span className="font-ui text-xs px-2 py-0.5 rounded-full text-accent-brown bg-accent-brown/10 font-medium">
                      새 편지
                    </span>
                  )}
                  {isRead && !isCurrentUnread && (
                    <span className="font-ui text-xs px-2 py-0.5 rounded-full text-ink-light/40 bg-ink-light/5">
                      읽음
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 상태 표시 */}
      <div className="text-center mt-8">
        <p className="font-ui text-sm text-ink-light/40">
          {gameFinished
            ? '모든 이야기가 끝났습니다.'
            : isAllRead
              ? '새 편지가 도착하기를 기다리고 있습니다...'
              : `${pendingCount}개의 읽지 않은 편지가 있습니다.`
          }
        </p>
        {lastOutcome && (
          <p className="font-ui text-xs text-ink-light/30 mt-1">
            마지막 결과: {lastOutcome === 'success' ? '성공' : lastOutcome === 'failure' ? '실패' : '대실패'}
          </p>
        )}
      </div>
    </div>
  )
}
