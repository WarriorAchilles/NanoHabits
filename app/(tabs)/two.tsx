import React from 'react';
import { View } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { StyledText } from '@/components/StyledText';

export default function TabTwoScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-bg-primary">
      <StyledText className="text-text-primary text-xl font-light mb-8">
        Tab Two
      </StyledText>
      <View className="w-4/5 h-px bg-text-secondary mb-8" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}
