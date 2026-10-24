import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  TConstructorIngredient,
  TConstructorState,
  TIngredient,
} from '@utils-types';

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.ingredients.push(action.payload);
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: nanoid() } };
      },
    },
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = { ...action.payload, id: nanoid() };
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) {
      const { from, to } = action.payload;
      const [moved] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, moved);
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  addIngredient,
  setBun,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} = constructorSlice.actions;

export const getConstructorBun = (state: {
  burgerConstructor: TConstructorState;
}) => state.burgerConstructor.bun;

export const getConstructorIngredients = (state: {
  burgerConstructor: TConstructorState;
}) => state.burgerConstructor.ingredients;

export default constructorSlice.reducer;