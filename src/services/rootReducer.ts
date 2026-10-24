import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import userReducer from './slices/userSlice';
import ordersReducer from './slices/ordersSlice';
import feedReducer from './slices/feedSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  orders: ordersReducer,
  feed: feedReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
});