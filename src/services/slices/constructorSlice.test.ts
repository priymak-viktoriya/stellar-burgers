import constructorReducer, {
  addIngredient,
  setBun,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} from './constructorSlice';
import type { TConstructorIngredient, TIngredient } from '@utils-types';

describe('Проверка редьюсера burgerConstructor', () => {
  const defaultState = {
    bun: null,
    ingredients: [],
  };

  // Создаем базовый мок ингредиента
  const createMockIngredient = (id: string, name: string, type: 'bun' | 'main'): TIngredient => ({
    _id: id,
    name,
    type,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 100,
    image: 'img.png',
    image_large: 'large.png',
    image_mobile: 'mobile.png',
  });

  const mockBun = createMockIngredient('bun-id', 'Тестовая булка', 'bun');

  // Ингредиенты для тестов (с готовыми id, так как prepare генерирует их в экшене)
  const mockMain1: TConstructorIngredient = {
    ...createMockIngredient('main-id-1', 'Начинка 1', 'main'),
    id: 'uuid-111'
  };
  const mockMain2: TConstructorIngredient = {
    ...createMockIngredient('main-id-2', 'Начинка 2', 'main'),
    id: 'uuid-222'
  };

  it('должен возвращать пустое начальное состояние при неизвестном экшене', () => {
    const result = constructorReducer(undefined, { type: 'SOME_UNKNOWN_ACTION' });
    expect(result).toEqual(defaultState);
  });

  it('должен добавлять булку в конструктор (setBun)', () => {
    const result = constructorReducer(defaultState, setBun(mockBun));
    expect(result.bun).toEqual(expect.objectContaining({
      _id: 'bun-id',
      name: 'Тестовая булка'
    }));
    expect(result.bun?.id).toBeDefined();
  });

  it('должен добавлять начинку в массив ингредиентов (addIngredient)', () => {
    const { id, ...ingredientWithoutId } = mockMain1;

    const result = constructorReducer(defaultState, addIngredient(ingredientWithoutId));

    expect(result.ingredients).toHaveLength(1);
    // Проверяем, что редьюсер сам сгенерировал строковый id
    expect(result.ingredients[0]).toEqual({
      ...ingredientWithoutId,
      id: expect.any(String)
    });
  });

  it('должен удалять ингредиент из массива по его id (removeIngredient)', () => {
    const stateWithItems = { ...defaultState, ingredients: [mockMain1, mockMain2] };
    const result = constructorReducer(stateWithItems, removeIngredient('uuid-111'));

    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0].id).toBe('uuid-222'); // Остался второй
  });

  it('должен менять ингредиенты местами (moveIngredient)', () => {
    const stateWithItems = { ...defaultState, ingredients: [mockMain1, mockMain2] };
    const result = constructorReducer(stateWithItems, moveIngredient({ from: 0, to: 1 }));

    // Второй должен стать первым, а первый — вторым
    expect(result.ingredients[0].id).toBe('uuid-222');
    expect(result.ingredients[1].id).toBe('uuid-111');
  });

  it('должен полностью очищать конструктор (clearConstructor)', () => {
    const filledState = {
      bun: { ...mockBun, id: 'bun-uuid' } as TConstructorIngredient,
      ingredients: [mockMain1]
    };
    const result = constructorReducer(filledState, clearConstructor());

    expect(result).toEqual(defaultState);
  });
});