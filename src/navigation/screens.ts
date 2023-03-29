import { StackScreenProps } from "@react-navigation/stack";
import { Movie } from "../types";

export type RootStackParamList = {
  MainScreen: undefined;
  MovieDetailScreen: {
    movie: Movie;
  };
  FavouritesScreen: undefined;
  SettingsScreen: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
