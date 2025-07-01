import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { StyledText } from '@/components/StyledText';
import { masterStyles } from '@/constants/tokens';

export default function ModalScreen() {
  return (
    <View style={masterStyles.centeredContainer}>
      <StyledText style={masterStyles.titleLight} weight="light" size={20}>
        Modal
      </StyledText>
      <View style={masterStyles.divider} />
      <EditScreenInfo path="app/modal.tsx" />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
