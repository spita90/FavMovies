import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  MainScreen: undefined;
  MovieDetailScreen: {
    movieId: number;
  };
  FavouritesScreen: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
