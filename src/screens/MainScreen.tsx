import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { getTopRatedMovies } from "../api/tmdb";
import { MovieItem, Screen, Text } from "../components";
import { i18n } from "../components/core/LanguageLoader";
import { RootStackScreenProps } from "../navigation/screens";
import { languageState } from "../reducers/store";
import { useTw } from "../theme";
import { DomainError, Movie } from "../types";
import { errorHandler } from "../utils";

export function MainScreen({ navigation }: RootStackScreenProps<"MainScreen">) {
  const tw = useTw();
  const { code: langCode } = useSelector(languageState);
  const [topRatedMovies, setTopRatedMovies] = useState<{
    [page: number]: Movie[];
  }>({});
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  /**
   * Fetches top rated movies
   */
  const fetchTopRatedMovies = async () => {
    try {
      if (__DEV__) console.log(`Fetching top rated movies page ${page}`);
      const movies = await getTopRatedMovies(langCode, page);
      if (!movies.results || movies.results.length === 0)
        throw new DomainError("errors.cannotGetTopRatedMovies");
      setTopRatedMovies((trmovies) => ({
        ...trmovies,
        [page]: movies.results,
      }));
    } catch (e) {
      errorHandler(e);
    } finally {
      setRefreshing(false);
    }
  };

  const Header = useCallback(
    () => (
      <View style={tw`mb-lg items-center`}>
        <Text textStyle={tw`text-3xl`} color={"darkBlue"} center bold>
          {`${i18n.t("l.topTMDBMovies")}`}
        </Text>
      </View>
    ),
    []
  );

  /**
   * Fetch top rated movies on page change
   */
  useEffect(() => {
    fetchTopRatedMovies();
  }, [page]);

  /**
   * Fetches again top rated movies after pull-to-refresh gesture
   */
  useEffect(() => {
    if (!refreshing) return;
    fetchTopRatedMovies();
  }, [refreshing]);

  return (
    <Screen>
      <FlatList
        style={tw`h-full mt-lg`}
        showsVerticalScrollIndicator={false}
        data={Object.values(topRatedMovies).flat()}
        keyExtractor={({ id: movieId }) => movieId.toString()}
        onEndReached={() => {
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.8}
        ListHeaderComponent={() => <Header />}
        ListFooterComponent={() => (
          <ActivityIndicator style={tw`py-md`} size={30} />
        )}
        ItemSeparatorComponent={() => (
          <View style={tw`w-full h-[1px] bg-lightGrey`} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
            }}
          />
        }
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
