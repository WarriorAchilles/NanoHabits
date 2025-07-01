import React from 'react';
import { View } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { StyledText } from '@/components/StyledText';
import { masterStyles } from '@/constants/tokens';

export default function TabOneScreen() {
  return (
    <View style={masterStyles.centeredContainer}>
      <StyledText style={masterStyles.titleBold} weight="bold" size={20}>
        Welcome to NanoHabits (tab one content)
      </StyledText>
      <View style={masterStyles.divider} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}
 