import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import type { TIngredient } from '@utils-types';

describe('Проверка редьюсера ingredientsSlice', () => {
  // Начальное состояние, которое должно быть при инициализации
  const defaultState = {
    ingredients: [],
    isLoading: false,
    error: null,
  };

  // Моковые данные ингредиента
  const mockBurgerIngredients: TIngredient[] = [
    {
      _id: 'mock-1',
      name: 'Космическая котлета',
      type: 'main',
      proteins: 10,
      fat: 20,
      carbohydrates: 30,
      calories: 400,
      price: 500,
      image: 'image.png',
      image_large: 'large.png',
      image_mobile: 'mobile.png',
    },
  ];

  it('должен корректно возвращать начальное состояние при неизвестном экшене', () => {
    const result = ingredientsReducer(undefined, { type: 'SOME_UNKNOWN_ACTION' });
    expect(result).toEqual(defaultState);
  });

  it('должен переводить стейт в состояние загрузки при вызове fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    // Начинаем с состояния, где уже есть ошибка, чтобы проверить, что она сбрасывается
    const prevState = { ...defaultState, error: 'Старая ошибка' };
    const result = ingredientsReducer(prevState, action);

    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('должен сохранять массив ингредиентов при успешном ответе fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockBurgerIngredients
    };
    // Начинаем со стейта, где идет загрузка
    const prevState = { ...defaultState, isLoading: true };
    const result = ingredientsReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.ingredients).toEqual(mockBurgerIngredients);
  });

  it('должен записывать текст ошибки при неудачном запросе fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Сервер не отвечает' }
    };
    // Начинаем со стейта, где идет загрузка
    const prevState = { ...defaultState, isLoading: true };
    const result = ingredientsReducer(prevState, action);

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Сервер не отвечает');
  });
});