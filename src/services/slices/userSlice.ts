import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  loginUserApi, 
  registerUserApi, 
  getUserApi, 
  logoutApi,
  updateUserApi,
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';

// Импортируем типы строго через "import type" для verbatimModuleSyntax
import type { TLoginData, TRegisterData } from '../../utils/burger-api';
import type { TUser } from '@utils-types';

// 1. Асинхронный Thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

// 2. Асинхронный Thunk для входа (логина)
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

// 3. Асинхронный Thunk для получения данных текущего пользователя
export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    const res = await getUserApi();
    return res.user;
  }
);

// Псевдоним для совместимости с кодом компонентов
export const getUser = checkUserAuth;

// 4. Асинхронный Thunk для обновления данных профиля
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

// 5. Асинхронный Thunk для выхода из аккаунта
export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null | undefined;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      // Логин
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      // Проверка пользователя при загрузке
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
      })
      // Обновление данных профиля
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Выход из профиля
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { authChecked } = userSlice.actions;
export default userSlice.reducer;
