import { configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import fetchDataReducer from './fetchDataSlice';
import apiReducer from './apiSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['isLoggedIn', 'token', 'user'], // Các trường dữ liệu bạn muốn duy trì
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    fetchData: fetchDataReducer,
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
