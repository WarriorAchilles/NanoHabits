import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text, Image } from 'react-native';

import { colors } from '@/constants/tokens';
// import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// NanoHabits icon component for header left
function NanoHabitsIcon() {
  return (
    <Image
      source={require('../../assets/images/nanohabits-icon.png')}
      style={{
        width: 80,
        height: 80,
        resizeMode: 'contain'
      }}
    />
  );
}

// Reusable tab configuration function
function createTabOptions(title: string, colorScheme: 'light' | 'dark' | null | undefined) {
  const currentColors = colors[colorScheme ?? 'light'];
  
  return {
    title,
    headerTitleAlign: 'center' as const,
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{
          color: currentColors.text,
          fontWeight: 'bold' as const,
          fontFamily: 'Poppins-Bold',
          fontSize: 24
        }}>
          {title}
        </Text>
      </View>
    ),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{
          fontFamily: focused ? 'Poppins-Bold' : 'Poppins',
          fontSize: 18,
          marginTop: 30,
          width: '100%',
          height: '100%'
        }}>
          {title}
        </Text>
      </View>
    ),
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
    headerTitleStyle: {
      color: currentColors.text,
      fontWeight: 'bold' as const,
      marginBottom: 32,
      fontFamily: 'Poppins-Bold',
    },
    headerStyle: {
      backgroundColor: currentColors.background,
    },
    headerStatusBarHeight: 50,
    headerShadowVisible: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: currentColors.background,
      borderTopWidth: 1, // Increase this value to make the divider thicker
      borderTopColor: currentColors.divider, // Use the divider color from your theme
    },
  };
}

export default function TabLayout() {
  const colorScheme = 'light'; // todo: useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="goalsTab"
        options={createTabOptions('Goals', colorScheme)}
      />
      <Tabs.Screen
        name="habitsTab"
        options={createTabOptions('Habits', colorScheme)}
      />
      <Tabs.Screen
        name="streaksTab"
        options={createTabOptions('Streaks', colorScheme)}
      />
    </Tabs>
  );
}
