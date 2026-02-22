

import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './slices/StockSlice';
import userReducer from './slices/userSlice' ;

export const store = configureStore({
  reducer: {
    stocks: stockReducer,
    user : userReducer ,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
