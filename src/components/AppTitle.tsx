import React from "react";
import { View } from "react-native";
import { useTw } from "../theme";
import { Text } from "./";

export interface AppTitleProps {
  ignoreFontFamily?: boolean;
}

export function AppTitle({ ignoreFontFamily }: AppTitleProps) {
  const tw = useTw();
  return (
    <View style={tw`flex-row items-baseline`}>
      <Text ignoreFontFamily={ignoreFontFamily} size="tt">
        Fav
      </Text>
      <Text ignoreFontFamily={ignoreFontFamily} size="tt" bold>
        Movies
      </Text>
    </View>
  );
}
