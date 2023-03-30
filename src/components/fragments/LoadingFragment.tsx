import Lottie from "lottie-react-native";
import React, { useCallback, useMemo } from "react";
import { View } from "react-native";
import { AppTitle, Text } from "..";
import { useTw } from "../../theme";

/**
 * Shows a cool random animation with the app logo.
 * Uses Lottie for the animation
 */
export const LoadingFragment = () => {
  const tw = useTw();

  const LottieAnimation = useCallback(
    () => (
      <View style={tw`rounded-[40px] overflow-hidden`}>
        <Lottie
          style={tw`w-[80%] rounded-lg`}
          source={require("../../../assets/animations/fav_movies.json")}
          loop={false}
          autoPlay
        />
      </View>
    ),
    []
  );

  return (
    <View style={tw`h-full justify-center items-center`}>
      <LottieAnimation />
      <View style={tw`mt-sm`}>
        <AppTitle ignoreFontFamily />
      </View>
    </View>
  );
};
