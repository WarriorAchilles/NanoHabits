import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { masterStyles } from '@/constants/tokens';

export default function ModalScreen() {
  return (
    <View style={masterStyles.centeredContainer}>
      <Text style={[masterStyles.titleLight, { fontSize: 20 }]}>
        Modal
      </Text>
      <View style={masterStyles.divider} />
      <EditScreenInfo path="app/modal.tsx" />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
