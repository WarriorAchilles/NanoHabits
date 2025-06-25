import React from 'react';
import { View, Text } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';

export default function TabTwoScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-bg-primary">
      <Text className="text-text-primary text-xl font-bold mb-8">
        Tab Two
      </Text>
      <View className="w-4/5 h-px bg-text-secondary mb-8" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}
