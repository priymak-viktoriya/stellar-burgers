import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import type { TOrder } from '@utils-types';

// Асинхронный Thunk для получения общей ленты заказов
export const fetchOrdersFeed = createAsyncThunk(
  'feed/fetchOrdersFeed',
  async () => {
    const data = await getFeedsApi();
    return data; // Возвращает { orders, total, totalToday }
  }
);

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | undefined;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrdersFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchOrdersFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Селекторы для безопасного получения данных в компонентах
export const getFeedOrdersSelector = (state: { feed: ReturnType<typeof feedSlice.reducer> }) => state.feed.orders;

export default feedSlice.reducer;
