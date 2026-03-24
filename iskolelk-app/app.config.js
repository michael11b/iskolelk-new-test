export default {
  expo: {
    name: "Iskolelk",
    slug: "iskolelk",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "iskolelk",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/screen.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.iskolelk.app",
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/images/icon.png"
    },
    extra: {
      // Environment variables for the app
      apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || "http://127.0.0.1:3002/api/v1",
      filesPublicDomain: process.env.EXPO_PUBLIC_FILES_PUBLIC_DOMAIN || "https://files.yourdomain.com",
      eas: {
        projectId: "f82a34c6-9f0e-452d-ad6e-9fee6966bbd2"
      }
    }
  }
};
