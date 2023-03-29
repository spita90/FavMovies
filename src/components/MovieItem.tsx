import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from ".";
import { TMDB_IMAGES_BASE_URL } from "../../App";
import { useTw } from "../theme";
import { Movie } from "../types";
import { Octicons } from "@expo/vector-icons";
import { Palette } from "../theme/palette";

export interface MovieItemProps {
  movie: Movie;
  onPress?: () => void;
}

export function MovieItem({ movie, onPress }: MovieItemProps) {
  const tw = useTw();

  return (
    <TouchableOpacity
      style={tw`flex-row p-md`}
      onPress={() => onPress && onPress()}
    >
      <Image
        style={tw`flex-2 h-[100px] rounded-sm`}
        source={{ uri: `${TMDB_IMAGES_BASE_URL}${movie.poster_path}` }}
      />
      <View style={tw`flex-5 pl-md justify-start`}>
        <Text size="xl">{movie.title}</Text>
        <View style={tw`flex-row grow mt-xs`}>
          <Octicons name="calendar" size={16} color="grey" />
          <Text style={tw`pl-[4px]`} color="grey">
            {new Date(movie.release_date).getFullYear()}
          </Text>
          <Octicons
            style={tw`pl-sm`}
            name="star-fill"
            size={16}
            color={Palette.yellow}
          />
          <Text style={tw`pl-[4px]`} color="grey">
            {movie.vote_average}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
