// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Используем localStorage
import rootReducer from './slices';

// Конфигурация для redux-persist
const persistConfig = {
  key: 'root', // Ключ для хранения состояния в localStorage
  storage, // Хранилище (localStorage)
  whitelist: ['user'], // Указываем, какие части состояния нужно сохранять (например, только user)
};

// Оборачиваем rootReducer с помощью persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем store с persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: ['persist/PERSIST'], // Игнорируем проверки сериализации для экшенов redux-persist
  //     },
  //   }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Создаем persistor для управления сохранением
const persistor = persistStore(store);

export { store, persistor };
