import React from 'react';
import { View } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { StyledText } from '@/components/StyledText';
import { masterStyles } from '@/constants/tokens';

export default function TabTwoScreen() {
  return (
    <View style={masterStyles.centeredContainer}>
      <StyledText style={masterStyles.titleLight} weight="light" size={20}>
        Tab Two content
      </StyledText>
      <View style={masterStyles.divider} />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}
