import { useAlchemyStore } from '../../store'
import { getIngredientsByChapter } from '../../data/ingredients'
import { useGameStore } from '../../store'
import type { Ingredient } from '../../types'
import { ATTRIBUTE_SYMBOLS, ATTRIBUTE_LABELS } from '../../types'

export function IngredientGrid() {
  const currentChapter = useGameStore((s) => s.currentChapter)
  const selectedSlots = useAlchemyStore((s) => s.selectedSlots)
  const selectIngredient = useAlchemyStore((s) => s.selectIngredient)

  const available = getIngredientsByChapter(currentChapter + 1)

  return (
    <div>
      <h3 className="font-ui text-sm text-ink-light/60 mb-3">재료를 선택하세요</h3>
      <div className="grid grid-cols-4 gap-3">
        {available.map((ingredient) => {
          const isSelected = selectedSlots.includes(ingredient.id)
          const isMaxSlots = selectedSlots.length >= 3
          const isDisabled = isSelected || (isMaxSlots && !isSelected)

          return (
            <button
              key={ingredient.id}
              onClick={() => selectIngredient(ingredient.id)}
              disabled={isDisabled}
              className={`
                p-3 rounded-lg border transition-all duration-200 text-center
                ${isSelected
                  ? 'border-accent-brown bg-accent-brown/10 shadow-sm'
                  : isDisabled
                    ? 'border-transparent opacity-30 cursor-not-allowed'
                    : 'border-ink-light/10 hover:border-ink-light/30 hover:shadow-sm bg-white/50'
                }
              `}
            >
              {/* 재료 아이콘 (임시 텍스트) */}
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-ink-light/10 to-ink-light/5 flex items-center justify-center">
                <span className="font-ui text-lg">{getIngredientEmoji(ingredient)}</span>
              </div>

              <div className="font-handwriting text-sm text-ink leading-tight mb-1">
                {ingredient.name}
              </div>

              <div className="flex justify-center gap-0.5">
                {ingredient.mainAttributes.map((attr) => (
                  <span key={attr} className="text-xs" title={ATTRIBUTE_LABELS[attr]}>
                    {ATTRIBUTE_SYMBOLS[attr]}
                  </span>
                ))}
                {ingredient.subAttribute && (
                  <span className="text-xs opacity-60" title={ATTRIBUTE_LABELS[ingredient.subAttribute]}>
                    {ATTRIBUTE_SYMBOLS[ingredient.subAttribute]}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function getIngredientEmoji(ingredient: Ingredient): string {
  const emojiMap: Record<string, string> = {
    moon_moss: '🌿',
    fire_bloom: '🌺',
    silver_herb: '🌾',
    crystal_powder: '💎',
    purified_water: '💧',
    moon_oil: '🫒',
    shadow_mushroom: '🍄',
    iron_powder: '⛓️',
  }
  return emojiMap[ingredient.id] ?? '🧪'
}
