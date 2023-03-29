import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, User } from "../types";
import { store } from "./store";

const initialUserState: User = {
  firstUse: true,
  favMoviesIds: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    _setFirstUse(state, action: PayloadAction<boolean>) {
      state.firstUse = action.payload;
    },
    _addFavMovie(state, action: PayloadAction<number>) {
      state.favMoviesIds = [action.payload, ...state.favMoviesIds];
    },
    _removeFavMovie(state, action: PayloadAction<number>) {
      state.favMoviesIds = state.favMoviesIds.filter(
        (movieId) => movieId !== action.payload
      );
    },
    _wipe() {
      return initialUserState;
    },
  },
});

const { _setFirstUse, _addFavMovie, _removeFavMovie, _wipe } =
  userSlice.actions;

/**
 * EXPORTED FUNCTIONS
 */

export const setFirstUse = async (firstUse: boolean) =>
  store.dispatch(_setFirstUse(firstUse));

export const addFavMovie = async (movieId: number) =>
  store.dispatch(_addFavMovie(movieId));

export const removeFavMovie = async (movieId: number) =>
  store.dispatch(_removeFavMovie(movieId));

export const wipeUser = () => store.dispatch(_wipe());

export const userReducer = userSlice.reducer;
