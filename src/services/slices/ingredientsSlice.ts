import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import type { TIngredient } from '@utils-types';

// 1. Создаем асинхронный Thunk для запроса ингредиентов с сервера
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

// Типизируем стейт этого слайса
type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null | undefined;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Селекторы для безопасного получения данных в компонентах
export const getIngredientsSelector = (state: { ingredients: ReturnType<typeof ingredientsSlice.reducer> }) => state.ingredients.ingredients;
export const getIsLoadingSelector = (state: { ingredients: ReturnType<typeof ingredientsSlice.reducer> }) => state.ingredients.isLoading;
export const getErrorSelector = (state: { ingredients: ReturnType<typeof ingredientsSlice.reducer> }) => state.ingredients.error;

export default ingredientsSlice.reducer;
