import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './slices';

// Конфигурация для redux-persist
const persistConfig = {
  key: 'root', // Ключ для хранения состояния в localStorage
  storage, // (localStorage)
  whitelist: ['user'], // Указываем, какие части состояния нужно сохранять (например, только user)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем store с persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
