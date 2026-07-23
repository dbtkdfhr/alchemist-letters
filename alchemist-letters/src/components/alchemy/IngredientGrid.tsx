import { useCallback, useState } from 'react'
import { useAlchemyStore, useGameStore } from '../../store'
import { getChapterByIndex } from '../../data/chapters'
import type { Ingredient } from '../../types'
import { ATTRIBUTE_SYMBOLS, ATTRIBUTE_LABELS } from '../../types'

const ICON_PATH = '/icons/'

function getIngredientIcon(ingredient: Ingredient): string {
  return `${ICON_PATH}${ingredient.id}.svg`
}

export function IngredientGrid() {
  const currentChapter = useGameStore((s) => s.currentChapter)
  const selectedSlots = useAlchemyStore((s) => s.selectedSlots)
  const selectIngredient = useAlchemyStore((s) => s.selectIngredient)
  const isIngredientUnlocked = useAlchemyStore((s) => s.isIngredientUnlocked)
  const revealClue = useAlchemyStore((s) => s.revealClue)
  const revealedClues = useAlchemyStore((s) => s.revealedClues)
  const getAvailableIngredients = useAlchemyStore((s) => s.getAvailableIngredients)

  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const available = getAvailableIngredients(currentChapter + 1)
  const chapter = getChapterByIndex(currentChapter)

  const handleImageError = useCallback((id: string) => {
    setFailedImages((prev) => new Set(prev).add(id))
  }, [])

  const handleInspect = useCallback((ingredientId: string) => {
    if (!chapter?.clues) return
    const clueToReveal = chapter.clues.find(
      (c) => c.inspectIngredient === ingredientId && !revealedClues.includes(c.id)
    )
    if (clueToReveal) {
      revealClue(clueToReveal.id)
    }
  }, [chapter, revealedClues, revealClue])

  return (
    <div>
      <h3 className="font-ui text-sm text-ink-light/60 mb-3">재료를 선택하세요</h3>
      <div className="grid grid-cols-4 gap-3">
        {available.map((ingredient) => {
          const isSelected = selectedSlots.includes(ingredient.id)
          const isMaxSlots = selectedSlots.length >= 3
          const isDisabled = isSelected || (isMaxSlots && !isSelected)
          const unlocked = isIngredientUnlocked(ingredient.id)
          const hasClue = chapter?.clues?.some(
            (c) => c.inspectIngredient === ingredient.id && !revealedClues.includes(c.id)
          )

          if (!unlocked) {
            return (
              <div
                key={ingredient.id}
                className="p-3 rounded-lg border border-dashed border-ink-light/10 bg-ink-light/[0.02] text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-ink-light/5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-ink-light/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 0v2m0-2h2m-2 0H10m9.364-3.364a9 9 0 1 0-12.728 0" />
                  </svg>
                </div>
                <div className="font-handwriting text-sm text-ink-light/30 leading-tight">???</div>
              </div>
            )
          }

          return (
            <button
              key={ingredient.id}
              onClick={() => selectIngredient(ingredient.id)}
              disabled={isDisabled}
              className={`
                p-3 rounded-lg border transition-all duration-200 text-center relative group
                ${isSelected
                  ? 'border-accent-brown bg-accent-brown/10 shadow-sm'
                  : isDisabled
                    ? 'border-transparent opacity-30 cursor-not-allowed'
                    : 'border-ink-light/10 hover:border-ink-light/30 hover:shadow-sm bg-white/50'
                }
              `}
            >
              {hasClue && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleInspect(ingredient.id) }}
                  className="
                    absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full
                    bg-accent-gold text-white text-[10px] font-bold
                    flex items-center justify-center shadow-sm
                    hover:scale-110 transition-transform
                  "
                  title="자세히 관찰하기"
                >
                  ?
                </button>
              )}
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-ink-light/10 to-ink-light/5 flex items-center justify-center p-1">
                {failedImages.has(ingredient.id) ? (
                  <span className="text-xs leading-none text-ink-light/60">
                    {ingredient.mainAttributes.map((a) => ATTRIBUTE_SYMBOLS[a]).join('')}
                    {ingredient.subAttribute ? ATTRIBUTE_SYMBOLS[ingredient.subAttribute] : ''}
                  </span>
                ) : (
                  <img
                    src={getIngredientIcon(ingredient)}
                    alt={ingredient.name}
                    className="w-full h-full object-contain opacity-80"
                    loading="lazy"
                    onError={() => handleImageError(ingredient.id)}
                  />
                )}
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