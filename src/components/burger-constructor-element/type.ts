import type { TConstructorIngredient } from '@utils-types';

export type BurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  handleClose: () => void;
  moveCard: (from: number, to: number) => void;
};