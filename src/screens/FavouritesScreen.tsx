import React from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { MovieItem, Screen } from "../components";
import { RootStackScreenProps } from "../navigation/screens";
import { userState } from "../reducers/store";
import { useTw } from "../theme";

export function FavouritesScreen({
  navigation,
}: RootStackScreenProps<"FavouritesScreen">) {
  const tw = useTw();
  const { favMovies } = useSelector(userState);

  return (
    <Screen>
      <FlatList
        style={tw`h-full mt-lg`}
        showsVerticalScrollIndicator={false}
        data={favMovies}
        keyExtractor={({ id: movieId }) => movieId.toString()}
        ItemSeparatorComponent={() => (
          <View style={tw`w-full h-[1px] bg-lightGrey`} />
        )}
        renderItem={({ item: movie }) => {
          return (
            <MovieItem
              movie={movie}
              onPress={() =>
                navigation.navigate("MovieDetailScreen", { movie: movie })
              }
            />
          );
        }}
      />
    </Screen>
  );
}
