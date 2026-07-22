import { IngredientGrid } from './IngredientGrid'
import { AlchemySlots } from './AlchemySlots'

export function AlchemyView() {
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
    </div>
  )
}
