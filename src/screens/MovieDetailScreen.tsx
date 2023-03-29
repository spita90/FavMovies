import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { TMDB_IMAGES_BASE_URL } from "../../App";
import { getMovieDetails } from "../api/tmdb";
import { Screen, Text } from "../components";
import { i18n } from "../components/core/LanguageLoader";
import { RootStackScreenProps } from "../navigation/screens";
import { languageState } from "../reducers/store";
import { useTw } from "../theme";
import { MovieDetail } from "../types";
import { errorHandler } from "../utils";

export function MovieDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<"MovieDetailScreen">) {
  const tw = useTw();
  const { code: langCode } = useSelector(languageState);
  const [movieDetails, setMovieDetails] = useState<MovieDetail>();
  const [loading, setLoading] = useState<boolean>(true);

  const { movieId } = route.params;

  const AboveTheFold = useCallback(() => {
    if (!movieDetails) return null;
    return (
      <View>
        <Image
          style={[tw`w-full h-[280px]`, { resizeMode: "cover" }]}
          source={{
            uri: `${TMDB_IMAGES_BASE_URL}${movieDetails.backdrop_path}`,
          }}
        />
        <LinearGradient
          colors={["#0000", "#000"]}
          style={tw`absolute w-full h-[30%] bottom-0 justify-end`}
        >
          <Text style={tw`p-md`} color="white" size="lg">
            {movieDetails.title}
          </Text>
        </LinearGradient>
      </View>
    );
  }, [movieDetails]);

  const BelowTheFold = useCallback(() => {
    if (!movieDetails) return null;
    const descriptionAvailable = !!movieDetails.overview;
    return (
      <View style={tw`p-md`}>
        <Text textStyle={tw`leading-6`}>
          {descriptionAvailable
            ? movieDetails.overview.replaceAll(".", ".\n")
            : i18n.t("l.descriptionNotAvailable")}
        </Text>
      </View>
    );
  }, [movieDetails]);

  const ScreenContent = useCallback(
    () => (
      <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
        {!loading ? (
          <>
            {movieDetails && (
              <View>
                <AboveTheFold />
                <BelowTheFold />
              </View>
            )}
          </>
        ) : (
          <ActivityIndicator style={tw`mt-[30%]`} size={40} color="grey" />
        )}
      </ScrollView>
    ),
    [loading, movieDetails]
  );

  const fetchMovieDetails = async () => {
    try {
      if (__DEV__) console.log(`Fetching movie details`);
      const details = await getMovieDetails(langCode, movieId);
      setMovieDetails(details);
    } catch (e) {
      errorHandler(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  return (
    <Screen>
      <ScreenContent />
    </Screen>
  );
}
