export default {
  expo: {
    name: "greengift",
    slug: "greengift",

    // Required for Google login + deep linking
    scheme: "greengift",

    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },

    // Required for Google OAuth on Expo
    experiments: {
      typedRoutes: true,
    },

    ios: {
      bundleIdentifier: "com.greengift.app",
    },

    android: {
      package: "com.greengift.app",
    },
  },
};
