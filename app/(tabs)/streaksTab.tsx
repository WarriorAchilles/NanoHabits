import React from 'react';
import { View, Text } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { masterStyles } from '@/constants/tokens';

export default function streaksScreen() {
  return (
    <View style={masterStyles.centeredContainer}>
      <Text style={masterStyles.titleLight}>
        streaks content
      </Text>
      <View style={masterStyles.divider} />
      <EditScreenInfo path="app/(tabs)/streaksTab.tsx" />
    </View>
  );
}
