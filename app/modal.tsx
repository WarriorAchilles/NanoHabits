import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { StyledText } from '@/components/StyledText';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-bg-primary">
      <StyledText className="text-text-primary text-xl font-light mb-8">
        Modal
      </StyledText>
      <View className="w-4/5 h-px bg-text-secondary mb-8" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
