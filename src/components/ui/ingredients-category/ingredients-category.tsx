import { BurgerIngredient } from '../../burger-ingredient/burger-ingredient';
import styles from './ingredients-category.module.css';
import type { TIngredient } from '@utils-types';

type TIngredientsCategoryUIProps = {
  title: string;
  titleId: string;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  ingredients: TIngredient[];
  ingredientsCounters: Record<string, number>;
};

export const IngredientsCategoryUI = ({
  title,
  titleId,
  titleRef,
  ingredients,
  ingredientsCounters,
}: TIngredientsCategoryUIProps): React.JSX.Element => (
  <div id={titleId}>
    <h3 ref={titleRef} className="text text_type_main-medium mt-10 mb-6">{title}</h3>
    <ul className={styles.items}>
      {ingredients.map((ingredient) => (
        <BurgerIngredient
          key={ingredient._id}
          ingredient={ingredient}
          count={ingredientsCounters[ingredient._id] || 0}
        />
      ))}
    </ul>
  </div>
);