import { BurgerConstructorElementUI } from '@ui';
import { memo } from 'react';

import type { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement = memo(function BurgerConstructorElement({
  ingredient,
  index,
  totalItems,
  handleClose,
  moveCard,
}: BurgerConstructorElementProps): React.JSX.Element {
  
  const handleMoveUp = (): void => {
    if (index > 0) moveCard(index, index - 1);
  };

  const handleMoveDown = (): void => {
    if (index < totalItems - 1) moveCard(index, index + 1);
  };

  return (
    <BurgerConstructorElementUI
      ingredient={ingredient}
      index={index}
      totalItems={totalItems}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleClose}
    />
  );
});