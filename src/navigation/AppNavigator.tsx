import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Platform, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Text } from "../components";
import { Octicons } from "@expo/vector-icons";
import { i18n } from "../components/core/LanguageLoader";
import { languageState, userState } from "../reducers/store";
import { FavouritesScreen, MainScreen, MovieDetailScreen } from "../screens";
import { useTw } from "../theme";
import { RootStackParamList } from "./screens";
import { addFavMovie, removeFavMovie } from "../reducers/userReducer";

/**
 * The root level navigator
 */
export const AppNavigator = () => {
  const tw = useTw();

  /**
   * Triggers app re-render on language change
   */
  const { code: languageCode } = useSelector(languageState);

  /**
   * Handles the root level screens
   */
  const Stack = createStackNavigator<RootStackParamList>();

  const fadeInAnim = useRef(new Animated.Value(0)).current;

  /**
   * Handles the fade-in effect after the initial loading screen
   */
  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, []);

  const AppTitle = useCallback(
    () => (
      <View style={tw`flex-row items-baseline`}>
        <Text size="tt">Fav</Text>
        <Text size="tt" bold>
          Movies
        </Text>
      </View>
    ),
    []
  );

  const HeaderFavouriteIcon = ({
    route,
  }: {
    route: RouteProp<RootStackParamList, "MovieDetailScreen">;
  }) => {
    const { favMoviesIds } = useSelector(userState);
    const movieId = route.params.movieId;
    const movieIsInFavs = favMoviesIds.includes(movieId);
    return (
      <TouchableOpacity
        style={tw`px-md h-full justify-center`}
        onPress={() => {
          movieIsInFavs ? removeFavMovie(movieId) : addFavMovie(movieId);
        }}
      >
        <Octicons
          name={movieIsInFavs ? "heart-fill" : "heart"}
          size={20}
          color={movieIsInFavs ? "red" : "blue"}
        />
      </TouchableOpacity>
    );
  };

  const MainScreenStack = useCallback(
    () => (
      <Stack.Navigator
        detachInactiveScreens={true}
        initialRouteName={"MainScreen"}
      >
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={({ navigation }) => ({
            headerTitle: () => <AppTitle />,
            headerRight: () => (
              <TouchableOpacity
                style={tw`px-md h-full justify-center`}
                onPress={() => navigation.navigate("FavouritesScreen")}
              >
                <Text color="blue">{i18n.t("l.favourites")}</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="MovieDetailScreen"
          component={MovieDetailScreen}
          options={({ route }) => ({
            title: i18n.t("l.movieInfo"),
            presentation: "card",
            headerRight: () => <HeaderFavouriteIcon route={route} />,
          })}
        />
        <Stack.Screen
          name="FavouritesScreen"
          component={FavouritesScreen}
          options={{ title: i18n.t("l.favourites") }}
        />
      </Stack.Navigator>
    ),
    [languageCode]
  );

  return (
    <Animated.View
      style={[tw`absolute top-0 w-full h-full`, { opacity: fadeInAnim }]}
    >
      <NavigationContainer
        documentTitle={{
          formatter: () => `FavMovies`,
        }}
      >
        <MainScreenStack />
      </NavigationContainer>
    </Animated.View>
  );
};
