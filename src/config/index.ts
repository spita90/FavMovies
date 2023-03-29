import Constants from "expo-constants";

interface Config {
  environment?: string;
  version?: string;
  tmdbApiKey?: string;
}

export const config: Config = {
  environment: Constants.expoConfig!.extra?.environment,
  version: Constants.expoConfig!.extra?.version,
  tmdbApiKey: Constants.expoConfig!.extra?.tmdbApiKey,
};
