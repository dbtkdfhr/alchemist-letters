import { useGameStore, useUIStore } from '../../store'
import { getChapterByIndex } from '../../data/chapters'
import { LetterPaper } from './LetterPaper'
import { useSound } from '../../hooks/useSound'
import { useState } from 'react'

type OutcomeType = 'success' | 'failure' | 'disaster'

function determineOutcome(
  option: NonNullable<ReturnType<typeof getChapterByIndex>>['replyOptions'][number],
  state: ReturnType<typeof useGameStore.getState>
): OutcomeType {
  const { marcoAffection, marcoConfidence } = state

  // If the option has bad negative effects, it could lead to disaster
  const totalEffect = (option.effects.affection ?? 0) + (option.effects.confidence ?? 0)
  if (totalEffect < -10) return 'disaster'

  // If the player has high enough stats, any option succeeds
  if (marcoAffection > 20 && marcoConfidence > 10) return 'success'

  // Kind options tend to succeed when affection is high
  if (option.type === 'kind' && marcoAffection > 0) return 'success'

  // Strict options succeed when the player has decent confidence or affection is tanked
  if (option.type === 'strict' && marcoConfidence > -5) return 'success'

  // Risky options are more likely to fail
  if (option.type === 'risky' && marcoAffection < 10) return 'failure'

  // Neutral ground
  if (totalEffect >= 0) return 'success'

  return 'failure'
}

export function LetterReply() {
  const currentChapter = useGameStore((s) => s.currentChapter)
  const selectReply = useGameStore((s) => s.selectReply)
  const completeChapter = useGameStore((s) => s.completeChapter)
  const setView = useUIStore((s) => s.setView)
  const { play } = useSound()

  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [sentOutcome, setSentOutcome] = useState<OutcomeType | null>(null)

  const chapter = getChapterByIndex(currentChapter)
  if (!chapter) return null

  const handleSend = () => {
    if (!selectedOption) return

    const option = chapter.replyOptions.find((o) => o.id === selectedOption)
    if (!option) return

    setIsSending(true)
    play('send')

    // Apply stat changes
    selectReply(chapter.id, option.id, option.effects)

    // Determine outcome based on choice + current state
    const state = useGameStore.getState()
    const outcomeType = determineOutcome(option, state)
    setSentOutcome(outcomeType)

    // Pick the right outcome from chapter data
    const outcome = chapter.result[outcomeType] ?? chapter.result.failure

    setTimeout(() => {
      completeChapter(currentChapter, outcome, outcomeType)
      setView('letterbox')
      setIsSending(false)
    }, 1500)
  }

  const handleReread = () => {
    useGameStore.getState().goToPage(0)
    setView('letter')
  }

  return (
    <LetterPaper>
      {/* 답장 헤더 */}
      <div className="mb-6">
        <h3 className="font-handwriting text-xl text-ink-dark mb-2">
          {chapter.letter.from === 'marco' ? '마르코에게,' : '답장'}
        </h3>
        <div className="w-full h-px bg-ink-light/10" />
      </div>

      {/* 선택지 */}
      <div className="flex-1 space-y-3">
        {chapter.replyOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`
              w-full text-left p-4 rounded-lg border transition-all duration-200
              ${selectedOption === option.id
                ? 'border-accent-brown bg-accent-brown/5 shadow-sm'
                : 'border-ink-light/10 hover:border-ink-light/30 bg-white/50'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <span className={`
                flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                font-ui text-sm font-medium
                ${selectedOption === option.id
                  ? 'bg-accent-brown text-white'
                  : 'bg-ink-light/10 text-ink-light'
                }
              `}>
                {option.id.toUpperCase()}
              </span>
              <div>
                <p className="font-handwriting text-base text-ink leading-relaxed">
                  {option.text}
                </p>
                {option.recipeRequired && (
                  <span className="inline-block mt-2 font-ui text-xs text-accent-brown/70 bg-accent-brown/5 px-2 py-0.5 rounded">
                    레시피 포함
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 하단 액션 */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleReread}
          className="
            px-4 py-3 rounded-lg font-ui text-sm text-ink-light/60
            hover:text-ink hover:bg-ink-light/5 transition-all duration-200
          "
        >
          ← 편지 다시 읽기
        </button>

        <button
          onClick={handleSend}
          disabled={!selectedOption || isSending}
          className={`
            flex-1 py-3 rounded-lg font-handwriting text-lg transition-all duration-200
            ${selectedOption && !isSending
              ? 'bg-accent-brown text-paper-bg hover:bg-[#7A3B10] shadow-sm'
              : 'bg-ink-light/10 text-ink-light/40 cursor-not-allowed'
            }
          `}
        >
          {isSending
            ? '편지를 보내는 중...'
            : sentOutcome === 'failure'
              ? '...다시 편지를 써야 할까요?'
              : '편지 보내기'
          }
        </button>
      </div>

      {/* 결과 미리보기 힌트 */}
      {selectedOption && !isSending && (
        <div className="mt-4 text-center">
          <span className="font-ui text-xs text-ink-light/40">
            선택지는 마르코와의 관계와 수업의 방향에 영향을 줍니다.
          </span>
        </div>
      )}
    </LetterPaper>
  )
}
