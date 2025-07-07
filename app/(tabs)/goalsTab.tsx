import React from 'react';
import { View } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { masterStyles } from '@/constants/tokens';
import { Text } from 'react-native';

export default function goalsScreen() {
  return (
    <View style={masterStyles.centeredContainer}>
      <Text style={masterStyles.titleLight}>
        goals content
      </Text>
      <View style={masterStyles.divider} />
      <EditScreenInfo path="app/(tabs)/goalsTab.tsx" />
    </View>
  );
}
 