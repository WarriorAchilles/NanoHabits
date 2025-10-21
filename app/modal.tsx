import React from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, View, Text, Pressable, SafeAreaView } from "react-native";
import { router } from "expo-router";
import EditScreenInfo from "@/components/EditScreenInfo";
import { masterStyles } from "@/constants/tokens";

export default function ModalScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Custom header for iOS modal */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
          backgroundColor: "#fff",
        }}
      >
        <Pressable onPress={() => router.back()} style={{ padding: 5 }}>
          <Text style={{ fontSize: 16, color: "#007AFF" }}>Done</Text>
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
          Modal
        </Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={masterStyles.centeredContainer}>
        <Text style={[masterStyles.titleLight, { fontSize: 20 }]}>asdf</Text>
        <View style={masterStyles.divider} />
        <EditScreenInfo path="app/modal.tsx" />
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}
