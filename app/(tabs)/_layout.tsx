import React from "react";
import { Link, Tabs } from "expo-router";
import { Pressable, View, Text, Image } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { colors } from "@/constants/tokens";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

function NanoHabitsIcon() {
  return (
    <Image
      source={require("../../assets/images/nanohabits-icon.png")}
      style={{ width: 80, height: 80, resizeMode: "contain" }}
    />
  );
}

function TabLabel({
  title,
  focused,
  color,
}: {
  title: string;
  focused: boolean;
  color: string;
}) {
  return (
    <Text
      style={{
        fontFamily: focused ? "Poppins-Bold" : "Poppins",
        fontSize: 15,
        color,
      }}
    >
      {title}
    </Text>
  );
}

export default function TabLayout() {
  const colorScheme = "light";
  const currentColors = colors[colorScheme];

  const sharedScreenOptions = {
    headerTitleAlign: "center" as const,
    headerTitle: () => null,
    headerLeft: () => <NanoHabitsIcon />,
    headerRight: () => (
      <Link href="/modal" asChild>
        <Pressable>
          {({ pressed }) => (
            <FontAwesome6
              name="bars"
              size={25}
              color={currentColors.text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    ),
    headerStyle: { backgroundColor: currentColors.background },
    headerShadowVisible: false,
    tabBarShowLabel: true,
    tabBarIconStyle: { display: "none" as const, height: 0 },
    tabBarItemStyle: {
      justifyContent: "center" as const,
      alignItems: "center" as const,
      paddingTop: 0,
      paddingBottom: 0,
    },
    tabBarStyle: {
      backgroundColor: currentColors.background,
      borderTopWidth: 1,
      borderTopColor: currentColors.divider,
      height: 52,
      paddingBottom: 0,
      paddingTop: 0,
    },
    tabBarActiveTintColor: currentColors.text,
    tabBarInactiveTintColor: currentColors.tabIconDefault,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: useClientOnlyValue(false, true) as boolean,
        ...sharedScreenOptions,
      }}
    >
      <Tabs.Screen
        name="goalsTab"
        options={{
          title: "Goals",
          tabBarIcon: () => null,
          tabBarLabel: ({ focused, color }) => (
            <TabLabel title="Goals" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Habits",
          tabBarIcon: () => null,
          tabBarLabel: ({ focused, color }) => (
            <TabLabel title="Habits" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="streaksTab"
        options={{
          title: "Streaks",
          tabBarIcon: () => null,
          tabBarLabel: ({ focused, color }) => (
            <TabLabel title="Streaks" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
