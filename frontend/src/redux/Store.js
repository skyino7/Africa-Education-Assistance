// import { configureStore } from "@reduxjs/toolkit";
// import AuthSlice from "./AuthSlice";
// import storage from "redux-persist/lib/storage";
// import { persistStore, persistReducer } from "redux-persist";


// const persistConfig = {
//     key: 'root',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, AuthSlice);

// export const store = configureStore({
//     reducer: {
//         auth: persistedReducer
//     }
// });

// export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './AuthSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
