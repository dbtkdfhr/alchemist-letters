import { useEffect } from 'react'
import { IngredientGrid } from './IngredientGrid'
import { AlchemySlots } from './AlchemySlots'
import { useAlchemyStore, useUIStore, useGameStore } from '../../store'

export function AlchemyView() {
  const returnToLetter = useAlchemyStore((s) => s.returnToLetter)
  const setView = useUIStore((s) => s.setView)
  const clearSlots = useAlchemyStore((s) => s.clearSlots)

  useEffect(() => {
    clearSlots()
  }, [clearSlots])

  return (
    <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <h2 className="font-handwriting text-3xl text-ink-dark mb-2">재료 상자</h2>
        <div className="w-16 h-px bg-ink-light/20 mx-auto" />
      </div>

      {/* 재료 그리드 */}
      <IngredientGrid />

      {/* 조합 슬롯 */}
      <AlchemySlots />

      {/* 편지 다시보기 */}
      {returnToLetter && (
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              useGameStore.getState().goToPage(0)
              setView('letter')
            }}
            className="font-ui text-sm text-ink-light/50 hover:text-accent-brown transition-colors underline underline-offset-2"
          >
            편지 다시보기
          </button>
        </div>
      )}
    </div>
  )
}
