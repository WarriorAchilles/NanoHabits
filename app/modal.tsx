import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-bg-primary">
      <Text className="text-text-primary text-xl font-bold mb-8">
        Modal
      </Text>
      <View className="w-4/5 h-px bg-text-secondary mb-8" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
