import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { User } from "../types";
import { Language, languageReducer } from "./languageReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  userState: persistReducer(
    {
      key: "store.favmovies.user",
      keyPrefix: "",
      storage: AsyncStorage,
    },
    userReducer
  ),
  languageState: persistReducer(
    {
      key: "store.favmovies.language",
      keyPrefix: "",
      storage: AsyncStorage,
    },
    languageReducer
  ),
});

export const userState = (state: any) => {
  return state.userState as User;
};

export const languageState = (state: any) => {
  return state.languageState as Language;
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
