import { IngredientDetailsUI } from '@ui';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import styles from './ingredient-details.module.css';

export const IngredientDetails = (): React.JSX.Element | null => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isModal = location.state?.background; // Проверяем, открыто ли в модалке

  const ingredient = useSelector((s) =>
    s.ingredients.ingredients.find((i) => i._id === id)
  );

  if (!ingredient) return null;

  // Если открыто в модалке — просто отдаем контент
  if (isModal) {
    return <IngredientDetailsUI ingredientData={ingredient} />;
  }

  // Если открыто как отдельная страница — оборачиваем в контейнер и добавляем заголовок
  return (
    <div className={styles.pageWrapper}>
      <h2 className={`text text_type_main-large ${styles.title}`}>
        Детали ингредиента
      </h2>
      <IngredientDetailsUI ingredientData={ingredient} />
    </div>
  );
};