import { IngredientsCategoryUI } from '@ui';
import type { TIngredient } from '@utils-types';

type TIngredientsCategoryProps = {
  title: string;
  titleId: string;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  ingredients: TIngredient[];
  ingredientsCounters: Record<string, number>;
};

export const IngredientsCategory = ({
  title,
  titleId,
  titleRef,
  ingredients,
  ingredientsCounters,
}: TIngredientsCategoryProps): React.JSX.Element => {
  return (
    <IngredientsCategoryUI
      title={title}
      titleId={titleId}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
    />
  );
};