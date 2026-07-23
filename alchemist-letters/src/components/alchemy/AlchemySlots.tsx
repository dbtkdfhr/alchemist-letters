import { useGameStore, useAlchemyStore, useUIStore } from '../../store';
import { getIngredient } from '../../data/ingredients';
import { getChapterByIndex } from '../../data/chapters';
import { useSound } from '../../hooks/useSound';
import { findRecipeByIngredients } from '../../data/recipes';

export function AlchemySlots() {
  const selectedSlots = useAlchemyStore((s) => s.selectedSlots);
  const removeIngredient = useAlchemyStore((s) => s.removeIngredient);
  const performCombine = useAlchemyStore((s) => s.performCombine);
  const clearSlots = useAlchemyStore((s) => s.clearSlots);
  const lastResult = useAlchemyStore((s) => s.lastResult);
  const returnToLetter = useAlchemyStore((s) => s.returnToLetter);
  const setReturnToLetter = useAlchemyStore((s) => s.setReturnToLetter);
  const hasAttempted = useAlchemyStore((s) => s.hasAttempted);
  const currentChapter = useGameStore((s) => s.currentChapter);
  const setView = useUIStore((s) => s.setView);
  const { play } = useSound();

  const discoveredRequiredRecipeForLetter =
    returnToLetter &&
    lastResult != null &&
    hasAttempted(selectedSlots) &&
    (() => {
      const chapter = getChapterByIndex(currentChapter);
      if (!chapter?.requiredRecipe) return false;
      const recipe = findRecipeByIngredients(selectedSlots);
      return recipe?.id === chapter.requiredRecipe;
    })();

  const canCombine = selectedSlots.length >= 2;

  const handleCombine = () => {
    const result = performCombine();
    if (result) {
      const grade = result.result.grade;
      if (grade === 'success' || grade === 'perfect') {
        play('combineSuccess');
      } else if (grade === 'disaster') {
        play('explosion');
      } else {
        play('combineFail');
      }
    }
  };

  return (
    <div className='mt-6'>
      <h3 className='font-ui text-sm text-ink-light/60 mb-3'>조합 슬롯</h3>

      {/* 슬롯 */}
      <div className='flex gap-3 mb-4'>
        {[0, 1, 2].map((index) => {
          const id = selectedSlots[index];
          const ingredient = id ? getIngredient(id) : null;

          return (
            <div
              key={index}
              onClick={() => ingredient && removeIngredient(index)}
              className={`
                flex-1 h-20 rounded-lg border-2 border-dashed
                flex items-center justify-center
                transition-all duration-200 cursor-pointer
                ${
                  ingredient
                    ? 'border-accent-brown/40 bg-accent-brown/5'
                    : 'border-ink-light/20 bg-white/30'
                }
              `}
            >
              {ingredient ? (
                <div className='text-center'>
                  <div className='font-handwriting text-sm text-ink'>
                    {ingredient.name}
                  </div>
                  <div className='font-ui text-xs text-ink-light/50 mt-1'>
                    클릭하여 제거
                  </div>
                </div>
              ) : (
                <span className='font-ui text-xs text-ink-light/30'>
                  비어있음
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* 액션 버튼 */}
      <div className='flex gap-3'>
        <button
          onClick={handleCombine}
          disabled={!canCombine}
          className={`
            flex-1 py-3 rounded-lg font-handwriting text-lg transition-all duration-200
            ${
              canCombine
                ? 'bg-accent-brown text-paper-bg hover:bg-[#7A3B10] shadow-sm active:shadow-none'
                : 'bg-ink-light/10 text-ink-light/40 cursor-not-allowed'
            }
          `}
        >
          조합하기
        </button>
        <button
          onClick={clearSlots}
          disabled={selectedSlots.length === 0}
          className='
            px-4 py-3 rounded-lg font-ui text-sm text-ink-light/60
            hover:text-ink hover:bg-ink-light/5 transition-all duration-200
            disabled:opacity-30 disabled:cursor-not-allowed
          '
        >
          초기화
        </button>
      </div>

      {/* 결과 표시 */}
      {lastResult && (
        <div
          className={`
          mt-4 p-4 rounded-lg border
          ${
            lastResult.result.grade === 'success' ||
            lastResult.result.grade === 'perfect'
              ? 'border-accent-success/30 bg-accent-success/5'
              : lastResult.result.grade === 'disaster'
                ? 'border-accent-danger/30 bg-accent-danger/5'
                : 'border-ink-light/10 bg-white/50'
          }
        `}
        >
          <div className='flex items-center gap-2 mb-1'>
            <span className='font-handwriting text-base text-ink'>
              {lastResult.result.effect}
            </span>
            {lastResult.isNew && (
              <span className='font-ui text-xs text-accent-success bg-accent-success/10 px-2 py-0.5 rounded-full'>
                새 발견!
              </span>
            )}
          </div>
          <p className='font-ui text-sm text-ink-light/70'>
            {lastResult.result.description}
          </p>

          {discoveredRequiredRecipeForLetter && (
            <button
              onClick={() => {
                setReturnToLetter(false);
                setView('reply');
              }}
              className='
                mt-3 w-full py-2.5 rounded-lg font-handwriting text-base
                bg-accent-brown text-paper-bg
                hover:bg-[#7A3B10] shadow-sm active:shadow-none
                transition-all duration-200
              '
            >
              답장으로 돌아가기
            </button>
          )}
        </div>
      )}
    </div>
  );
}
