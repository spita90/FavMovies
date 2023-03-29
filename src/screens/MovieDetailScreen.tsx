import { Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { tmdbImageBaseUrl } from "../../App";
import { Screen, Text } from "../components";
import { i18n } from "../components/core/LanguageLoader";
import { NAV_BAR_HEIGHT_PX } from "../navigation/AppNavigator";
import { RootStackScreenProps } from "../navigation/screens";
import { languageState } from "../reducers/store";
import { useTw } from "../theme";
import { Palette } from "../theme/palette";
import { capitalize } from "../utils";

export function MovieDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<"MovieDetailScreen">) {
  const tw = useTw();
  const { code: langCode } = useSelector(languageState);

  const { movieId } = route.params;

  const Header = useCallback(
    () => (
      <View style={tw`flex-row pt-sm items-center justify-between`}>
        <TouchableOpacity
          style={tw`p-xl`}
          onPress={() => {
            navigation.canGoBack() && navigation.goBack();
          }}
        >
          <Octicons name="arrow-left" size={32} color={"white"} />
        </TouchableOpacity>
        <Text textWhite textStyle={tw`text-[36px]`}>
          {movieId}
        </Text>
      </View>
    ),
    []
  );

  const ScreenContent = useCallback(
    () => (
      <LinearGradient
        style={tw`h-full grow items-center pb-[${NAV_BAR_HEIGHT_PX + 20}]`}
        colors={["white", "grey"]}
      >
        <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
          <Header />
        </ScrollView>
      </LinearGradient>
    ),
    []
  );

  return (
    <Screen>
      <ScreenContent />
    </Screen>
  );
}
