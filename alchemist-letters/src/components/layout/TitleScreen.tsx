import { useGameStore, useUIStore } from '../../store'
import { Button } from '../ui/Button'
import { useEffect, useState } from 'react'

export function TitleScreen() {
  const gameStarted = useGameStore((s) => s.gameStarted)
  const startNewGame = useGameStore((s) => s.startNewGame)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Zustand persist가 localStorage에서 데이터를 복원한 후
    // gameStarted가 true면 저장된 게임이 있는 것
    setHydrated(true)
  }, [])

  const handleContinue = () => {
    useUIStore.getState().setView('letterbox')
  }

  const handleNewGame = () => {
    startNewGame()
    useUIStore.getState().setView('letterbox')
  }

  // 저장된 게임이 있고, hydration이 완료되었을 때만 "이어하기" 표시
  const hasSave = hydrated && gameStarted

  return (
    <div className="min-h-svh paper-bg flex flex-col items-center justify-center px-6">
      {/* 타이틀 */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="font-handwriting text-5xl md:text-6xl text-ink-dark mb-4 leading-relaxed">
          연금술사의 편지
        </h1>
        <p className="font-ui text-ink-light text-base md:text-lg max-w-md mx-auto leading-relaxed">
          은퇴한 연금술사가 된 당신.<br />
          제자가 보낸 편지에 답장하며<br />
          연금술을 가르치는 선택지 기반 내러티브 게임
        </p>
      </div>

      {/* 장식선 */}
      <div className="w-32 h-px bg-ink-light/30 mb-12" />

      {/* 버튼 */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button
          variant="primary"
          size="lg"
          className="w-full font-handwriting text-xl tracking-wide"
          onClick={handleNewGame}
        >
          새 게임
        </Button>

        {hasSave && (
          <Button
            variant="secondary"
            size="lg"
            className="w-full font-handwriting text-xl tracking-wide"
            onClick={handleContinue}
          >
            이어하기
          </Button>
        )}
      </div>

      {/* 하단 정보 */}
      <p className="mt-16 font-ui text-xs text-ink-light/50">
        Click to read. Choose to shape the story.
      </p>
    </div>
  )
}
