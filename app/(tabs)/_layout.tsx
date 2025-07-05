import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text, Image } from 'react-native';

import { colors } from '@/constants/tokens';
import { useColorScheme } from '@/components/useColorScheme';
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
        marginLeft: 15,
        resizeMode: 'contain'
      }}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Goals',
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                color: colors[colorScheme ?? 'light'].text,
                fontWeight: 'bold',
                fontFamily: 'Poppins-Bold',
                fontSize: 18
              }}>
                Goals
              </Text>
            </View>
          ),
          tabBarIcon: () => <View />,
          headerLeft: () => <NanoHabitsIcon />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome6
                    name="bars"
                    size={25}
                    color={colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTitleStyle: {
            color: colors[colorScheme ?? 'light'].text,
            fontWeight: 'bold',
            marginBottom: 32,
            fontFamily: 'Poppins-Bold',
          },
          headerStyle: {
            backgroundColor: colors[colorScheme ?? 'light'].background,
          },
          headerShadowVisible: false
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Habits',
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                color: colors[colorScheme ?? 'light'].text,
                fontWeight: 'bold',
                fontFamily: 'Poppins-Bold',
                fontSize: 18
              }}>
                Habits
              </Text>
            </View>
          ),
          tabBarIcon: () => <View />,
          headerLeft: () => <NanoHabitsIcon />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome6
                    name="bars"
                    size={25}
                    color={colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTitleStyle: {
            color: colors[colorScheme ?? 'light'].text,
            fontWeight: 'bold',
            marginBottom: 32,
            fontFamily: 'Poppins-Bold',
          },
          headerStyle: {
            backgroundColor: colors[colorScheme ?? 'light'].background,
          },
          headerShadowVisible: false
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Streaks',
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                color: colors[colorScheme ?? 'light'].text,
                fontWeight: 'bold',
                fontFamily: 'Poppins-Bold',
                fontSize: 18
              }}>
                Streaks
              </Text>
            </View>
          ),
          tabBarIcon: () => <View />,
          headerLeft: () => <NanoHabitsIcon />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome6
                    name="bars"
                    size={25}
                    color={colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTitleStyle: {
            color: colors[colorScheme ?? 'light'].text,
            fontWeight: 'bold',
            marginBottom: 32,
            fontFamily: 'Poppins-Bold',
          },
          headerStyle: {
            backgroundColor: colors[colorScheme ?? 'light'].background,
          },
          headerShadowVisible: false
        }}
      />
    </Tabs>
  );
}
