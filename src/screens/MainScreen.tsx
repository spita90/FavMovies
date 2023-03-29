import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { getTopRatedMovies } from "../api/tmdb";
import { Screen, Text } from "../components";
import { i18n } from "../components/core/LanguageLoader";
import { NAV_BAR_HEIGHT_PX } from "../navigation/AppNavigator";
import { RootStackScreenProps } from "../navigation/screens";
import { languageState, userState } from "../reducers/store";
import { useTw } from "../theme";
import { DomainError, Movie } from "../types";
import { errorHandler, showToast } from "../utils";

export function MainScreen({ navigation }: RootStackScreenProps<"MainScreen">) {
  const tw = useTw();
  const { code: langCode } = useSelector(languageState);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>();
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  /**
   * Fetches top rated movies
   */
  const fetchTopRatedMovies = async () => {
    try {
      if (__DEV__) console.log(`Fetching top rated movies`);
      const movies = await getTopRatedMovies(page);
      if (!movies.results || movies.results.length === 0)
        throw new DomainError("errors.cannotGetTopRatedMovies");
      setTopRatedMovies(movies.results);
    } catch (e) {
      errorHandler(e);
    } finally {
      setRefreshing(false);
    }
  };

  const Header = useCallback(
    () => (
      <View style={tw`mt-md mb-xl items-center`}>
        <Text
          style={tw`mt-xl`}
          textStyle={tw`text-3xl`}
          color={"darkBlue"}
          bold
        >
          {`${i18n.t("l.goodMorning")}`}
        </Text>
      </View>
    ),
    []
  );

  const MoviesList = useCallback(
    () => (
      <FlatList
        style={tw`h-full mt-xxl mx-md rounded-lg overflow-hidden`}
        showsVerticalScrollIndicator={false}
        data={topRatedMovies}
        keyExtractor={({ id: movieId }) => movieId.toString()}
        ListFooterComponent={
          <View style={tw`mb-[${NAV_BAR_HEIGHT_PX + 20}]`} />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              // TODO
            }}
          />
        }
        renderItem={({ item: movie }) => <Text>{movie.title}</Text>}
      />
    ),
    [topRatedMovies, refreshing]
  );

  const ScreenContent = useCallback(
    () => (
      <View style={tw`items-center`}>
        <Header />
        <MoviesList />
      </View>
    ),
    [topRatedMovies]
  );

  /**
   * Fetches again top rated movies after pull-to-refresh gesture
   */
  useEffect(() => {
    if (!refreshing) return;
    fetchTopRatedMovies();
  }, [refreshing]);

  return (
    <Screen>
      <View style={tw`h-full items-center`}>
        <ScreenContent />
      </View>
    </Screen>
  );
}
