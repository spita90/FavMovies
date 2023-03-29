module.exports = {
  name: "FavMovies",
  displayName: "FavMovies",
  expo: {
    name: "FavMovies",
    slug: "FavMovies",
    version: "1.0.0",
    extra: {
      environment: process.env.STAGE,
      version: process.env.APP_VERSION,
      tmdbApiKey: "a74169393e0da3cfbc2c58c5feec63d7",
    },
    orientation: "portrait",
    icon: "./assets/favicon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/favicon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/favicon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
  },
};
