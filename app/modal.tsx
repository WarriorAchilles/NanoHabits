import React from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, View, Text, SafeAreaView } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { masterStyles } from "@/constants/tokens";

export default function ModalScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={masterStyles.centeredContainer}>
        <Text style={[masterStyles.titleLight, { fontSize: 20 }]}>asdf</Text>
        <View style={masterStyles.divider} />
        <EditScreenInfo path="app/modal.tsx" />
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}
