import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './ingredientsSlice/ingredientsSlice';
import burgerConstructorReducer from './burgerConstructorSlice/burgerConstructorSlice';
import orderReducer from './orderSlice/orderSlice';
import ordersFeedReducer from './ordersFeed/ordersFeedSlice';
import profileOrdersReducer from './profileOrdersSlice/profileOrdersSlice';
import userReducer from './userSlice/userSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  // Заменить на импорт настоящего редьюсера
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feed: ordersFeedReducer,
  profileOrders: profileOrdersReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
