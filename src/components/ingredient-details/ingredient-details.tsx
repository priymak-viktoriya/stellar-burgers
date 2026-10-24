import { IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails = (): React.JSX.Element | null => {
  const { id } = useParams<{ id: string }>();
  const ingredient = useSelector((s) =>
    s.ingredients.ingredients.find((i) => i._id === id)
  );

  if (!ingredient) return null;

  return <IngredientDetailsUI ingredientData={ingredient} />;
};