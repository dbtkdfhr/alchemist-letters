import { useEffect } from 'react'
import { useGameStore, useUIStore } from '../../store'
import { TitleScreen } from './TitleScreen'
import { BottomNav } from './BottomNav'
import { LetterBox } from '../letter/LetterBox'
import { LetterViewer } from '../letter/LetterViewer'
import { AlchemyView } from '../alchemy/AlchemyView'
import { LetterReply } from '../letter/LetterReply'
import { AlchemyNote } from '../alchemy/AlchemyNote'
import { EndingScreen } from './EndingScreen'
import { useBGM } from '../../hooks/useBGM'

export function GameLayout() {
  const gameStarted = useGameStore((s) => s.gameStarted)
  const gameFinished = useGameStore((s) => s.gameFinished)
  const currentView = useUIStore((s) => s.currentView)
  const { startBGM, toggleBGM, isPlaying } = useBGM()

  useEffect(() => {
    if (gameStarted) {
      startBGM()
    }
  }, [gameStarted, startBGM])

  if (!gameStarted) {
    return <TitleScreen />
  }

  // 게임 완료 시 엔딩 화면 표시
  if (gameFinished && currentView !== 'letterbox' && currentView !== 'letter') {
    return <EndingScreen />
  }

  return (
    <div className="min-h-svh paper-bg flex flex-col pb-20">
      {currentView !== 'letterbox' && (
        <header className="flex items-center justify-between px-4 py-3 border-b border-ink-light/10">
          <button
            className="font-ui text-sm text-ink-light hover:text-ink transition-colors"
            onClick={() => {
              useGameStore.getState().goToPage(0)
              useUIStore.getState().setView('letterbox')
            }}
          >
            ← 편지 보관함
          </button>
          <span className="font-handwriting text-sm text-ink/40">연금술사의 편지</span>
          <button
            onClick={toggleBGM}
            className="font-ui text-xs px-2 py-1 rounded border border-ink-light/20 text-ink-light/60 hover:text-ink hover:border-ink-light/40 transition-colors"
            title={isPlaying ? 'BGM 끄기' : 'BGM 켜기'}
          >
            {isPlaying ? '🔊' : '🔇'}
          </button>
        </header>
      )}

      <main className="flex-1 flex flex-col">
        {currentView === 'letterbox' && <LetterBox />}
        {currentView === 'letter' && <LetterViewer />}
        {currentView === 'alchemy' && <AlchemyView />}
        {currentView === 'reply' && <LetterReply />}
        {currentView === 'notebook' && <AlchemyNote />}
      </main>

      <BottomNav />
    </div>
  )
}
