import { BurgerIngredientsUI } from '@ui';
import { useMemo } from 'react';
import { useSelector } from '../../services/store';

export const BurgerIngredients = (): React.JSX.Element => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const selectedIngredients = useSelector((state) => state.burgerConstructor.ingredients);

  const buns = useMemo(() => ingredients.filter((i) => i.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((i) => i.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((i) => i.type === 'main'), [ingredients]);

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};
    if (bun) counters[bun._id] = 2;
    selectedIngredients.forEach((item) => {
      counters[item._id] = (counters[item._id] || 0) + 1;
    });
    return counters;
  }, [bun, selectedIngredients]);

  return (
    <BurgerIngredientsUI
      buns={buns}
      sauces={sauces}
      mains={mains}
      ingredientsCounters={ingredientsCounters}
    />
  );
};