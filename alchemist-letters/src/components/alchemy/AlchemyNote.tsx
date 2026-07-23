import { useState } from 'react'
import { useAlchemyStore, useGameStore } from '../../store'
import { getIngredient } from '../../data/ingredients'
import { RECIPES } from '../../data/recipes'
import { getChapter as getChapterData } from '../../data/chapters'
import { ATTRIBUTE_SYMBOLS, ATTRIBUTE_LABELS } from '../../types'
import type { RecipeGrade } from '../../types'

type NoteTab = 'recipes' | 'ingredients' | 'branch'

const gradeLabels: Record<RecipeGrade, string> = {
  perfect: '완벽',
  success: '성공',
  minor: '미미',
  failure: '실패',
  disaster: '대참사',
}

const gradeColors: Record<RecipeGrade, string> = {
  perfect: 'text-accent-gold border-accent-gold/30 bg-accent-gold/5',
  success: 'text-accent-success border-accent-success/30 bg-accent-success/5',
  minor: 'text-ink-light border-ink-light/10 bg-white/50',
  failure: 'text-ink-light/60 border-ink-light/5 bg-ink-light/5',
  disaster: 'text-accent-danger border-accent-danger/30 bg-accent-danger/5',
}

export function AlchemyNote() {
  const [tab, setTab] = useState<NoteTab>('recipes')
  const discoveredRecipes = useAlchemyStore((s) => s.discoveredRecipes)
  const renameRecipe = useAlchemyStore((s) => s.renameRecipe)
  const completedChapters = useGameStore((s) => s.completedChapters)
  const currentChapter = useGameStore((s) => s.currentChapter)
  const chapterOutcomes = useGameStore((s) => s.chapterOutcomes)
  const unlockedLetters = useGameStore((s) => s.unlockedLetters)
  const readLetters = useGameStore((s) => s.readLetters)
  const [renaming, setRenaming] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')

  return (
    <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <h2 className="font-handwriting text-3xl text-ink-dark mb-2">연금술 노트</h2>
        <div className="w-16 h-px bg-ink-light/20 mx-auto mb-4" />
      </div>

      {/* 탭 */}
      <div className="flex gap-1 mb-6 bg-ink-light/5 rounded-lg p-1">
        <button
          onClick={() => setTab('recipes')}
          className={`
            flex-1 py-2 rounded-md font-ui text-sm transition-all
            ${tab === 'recipes'
              ? 'bg-white shadow-sm text-ink font-medium'
              : 'text-ink-light/60 hover:text-ink'
            }
          `}
        >
          레시피
        </button>
        <button
          onClick={() => setTab('ingredients')}
          className={`
            flex-1 py-2 rounded-md font-ui text-sm transition-all
            ${tab === 'ingredients'
              ? 'bg-white shadow-sm text-ink font-medium'
              : 'text-ink-light/60 hover:text-ink'
            }
          `}
        >
          재료 도감
        </button>
        <button
          onClick={() => setTab('branch')}
          className={`
            flex-1 py-2 rounded-md font-ui text-sm transition-all
            ${tab === 'branch'
              ? 'bg-white shadow-sm text-ink font-medium'
              : 'text-ink-light/60 hover:text-ink'
            }
          `}
        >
          분기
        </button>
      </div>

      {/* 레시피 탭 */}
      {tab === 'recipes' && (
        <div className="space-y-3">
          {/* 발견한 레시피 */}
          {Object.values(discoveredRecipes).map((entry) => (
            <div
              key={entry.recipeId}
              className={`p-4 rounded-lg border ${gradeColors[entry.result.grade]}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 mr-2">
                  {renaming === entry.recipeId ? (
                    <input
                      autoFocus
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onBlur={() => {
                        if (renameValue.trim()) {
                          renameRecipe(entry.recipeId, renameValue.trim())
                        }
                        setRenaming(null)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (renameValue.trim()) {
                            renameRecipe(entry.recipeId, renameValue.trim())
                          }
                          setRenaming(null)
                        }
                      }}
                      className="font-handwriting text-base text-ink bg-transparent border-b border-accent-brown outline-none w-full"
                    />
                  ) : (
                    <h3
                      className="font-handwriting text-base text-ink cursor-pointer hover:text-accent-brown"
                      onClick={() => {
                        setRenaming(entry.recipeId)
                        setRenameValue(entry.customName)
                      }}
                      title="클릭하여 이름 변경"
                    >
                      {entry.customName}
                    </h3>
                  )}
                  <span className="font-ui text-xs text-ink-light/50">
                    {gradeLabels[entry.result.grade]}
                  </span>
                </div>
                <span className="font-ui text-xs text-ink-light/50 flex-shrink-0">
                  효능 {entry.result.potency}
                </span>
              </div>

              <p className="font-ui text-sm text-ink-light/70 mb-2">
                {entry.result.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {entry.ingredients.map((id) => {
                  const ing = getIngredient(id)
                  return ing ? (
                    <span
                      key={id}
                      className="font-ui text-xs px-2 py-1 bg-ink-light/5 rounded"
                    >
                      {ing.name}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          ))}

          {/* 미발견 레시피 */}
          {RECIPES.filter(
            (r) => !Object.values(discoveredRecipes).some(
              (e) => JSON.stringify(e.ingredients.sort()) === JSON.stringify([...r.ingredients].sort())
            )
          ).map((recipe) => (
            <div
              key={recipe.id}
              className="p-4 rounded-lg border border-dashed border-ink-light/10 bg-white/30"
            >
              <div className="flex items-center gap-3">
                <span className="font-handwriting text-base text-ink-light/30">???</span>
                <span className="font-ui text-xs text-ink-light/30">
                  미발견 레시피
                </span>
              </div>
            </div>
          ))}

          {Object.keys(discoveredRecipes).length === 0 && (
            <div className="text-center py-8">
              <p className="font-ui text-sm text-ink-light/40">
                아직 발견한 레시피가 없습니다.
              </p>
              <p className="font-ui text-xs text-ink-light/30 mt-2">
                재료 상자에서 재료를 조합해보세요.
              </p>
            </div>
          )}
        </div>
      )}

      {tab === 'branch' && (
        <div className="space-y-1">
          {unlockedLetters.map((id) => {
            const ch = getChapterData(id)
            if (!ch) return null
            const chIdx = parseInt(id.replace('ch', '')) - 1
            const isCompleted = completedChapters.includes(chIdx)
            const isCurrent = currentChapter === chIdx
            const isRead = readLetters.includes(id)
            const outcome = chapterOutcomes[id] ?? null

            return (
              <div key={id} className="flex items-stretch gap-3">
                <div className="flex flex-col items-center w-6 flex-shrink-0">
                  <div className={`
                    w-3 h-3 rounded-full mt-1.5 border-2
                    ${isCompleted
                      ? outcome === 'success'
                        ? 'bg-accent-success border-accent-success'
                        : outcome === 'disaster'
                          ? 'bg-accent-danger border-accent-danger'
                          : 'bg-accent-gold border-accent-gold'
                      : isCurrent
                        ? 'bg-accent-brown border-accent-brown animate-pulse'
                        : isRead
                          ? 'bg-ink-light/30 border-ink-light/30'
                          : 'bg-white border-ink-light/20'
                    }
                  `} />
                  <div className="w-px flex-1 bg-ink-light/10" />
                </div>

                <div className={`
                  flex-1 p-3 rounded-lg border mb-1
                  ${isCurrent
                    ? 'border-accent-brown/30 bg-accent-brown/5'
                    : isCompleted
                      ? 'border-ink-light/10 bg-white/50'
                      : isRead
                        ? 'border-ink-light/5 bg-white/30'
                        : 'border-dashed border-ink-light/5 bg-ink-light/[0.02]'
                  }
                `}>
                  <div className="flex items-center justify-between">
                    <span className={`
                      font-handwriting text-sm
                      ${isCompleted || isCurrent ? 'text-ink' : 'text-ink-light/40'}
                    `}>
                      {ch.title}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isCompleted && outcome && (
                        <span className={`
                          font-ui text-[10px] px-1.5 py-0.5 rounded
                          ${outcome === 'success'
                            ? 'text-accent-success bg-accent-success/10'
                            : outcome === 'disaster'
                              ? 'text-accent-danger bg-accent-danger/10'
                              : 'text-accent-gold bg-accent-gold/10'
                          }
                        `}>
                          {outcome === 'success' ? '성공' : outcome === 'disaster' ? '대실패' : '실패'}
                        </span>
                      )}
                      {isCurrent && (
                        <span className="font-ui text-[10px] text-accent-brown bg-accent-brown/10 px-1.5 py-0.5 rounded">
                          현재
                        </span>
                      )}
                      {!isRead && (
                        <span className="font-ui text-[10px] text-ink-light/30 px-1.5 py-0.5 rounded bg-ink-light/5">
                          new
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 재료 도감 탭 */}
      {tab === 'ingredients' && (
        <div className="grid grid-cols-2 gap-3">
          {useAlchemyStore.getState().getAllIngredients().map((ing) => {
            const unlocked = useAlchemyStore.getState().isIngredientUnlocked(ing.id)
            return (
              <div
                key={ing.id}
                className={`
                  p-3 rounded-lg border transition-all
                  ${unlocked
                    ? 'border-ink-light/10 bg-white/50'
                    : 'border-dashed border-ink-light/5 bg-ink-light/[0.02]'
                  }
                `}
              >
                {unlocked ? (
                  <>
                    <div className="font-handwriting text-sm text-ink mb-1">{ing.name}</div>
                    <div className="font-ui text-xs text-ink-light/60 mb-2 leading-relaxed">
                      {ing.description}
                    </div>
                    <div className="flex gap-1">
                      {ing.mainAttributes.map((attr) => (
                        <span key={attr} className="text-xs" title={ATTRIBUTE_LABELS[attr]}>
                          {ATTRIBUTE_SYMBOLS[attr]}
                        </span>
                      ))}
                      {ing.subAttribute && (
                        <span className="text-xs opacity-60" title={ATTRIBUTE_LABELS[ing.subAttribute]}>
                          {ATTRIBUTE_SYMBOLS[ing.subAttribute]}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-2">
                    <div className="font-handwriting text-sm text-ink-light/30 mb-1">???</div>
                    <div className="font-ui text-xs text-ink-light/20">미발견 재료</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
