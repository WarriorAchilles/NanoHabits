import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { DatabaseService } from "@/services/database";
import { colors } from "@/constants/tokens";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Initialize database tables when app starts
  useEffect(() => {
    const initDatabase = async () => {
      try {
        await DatabaseService.initialize();
      } catch (error) {
        console.error("Failed to initialize database:", error);
      }
    };

    initDatabase();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.light.background }}>
      <SafeAreaProvider style={{ backgroundColor: colors.light.background }}>
        <StatusBar
          style="dark"
          backgroundColor={colors.light.background}
          translucent={false}
          hidden={false}
          animated={true}
        />
        <RootLayoutNav />
      </SafeAreaProvider>
    </View>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            headerShown: true,
            title: "Settings",
            headerLeft: () => (
              <Pressable
                onPress={() => router.back()}
                style={{ marginLeft: 15 }}
              >
                <Text style={{ fontSize: 16, color: "#007AFF" }}>Done</Text>
              </Pressable>
            ),
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: {
              color: "#000",
              fontFamily: "Poppins-Bold",
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
