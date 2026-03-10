import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { DatabaseService } from "@/services/database";
import {
  requestPermissions,
  cancelAllReminders,
  isNotificationsAvailable,
} from "@/services/notifications";
import { masterStyles, colors } from "@/constants/tokens";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationsSupported, setNotificationsSupported] = useState(false);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    isNotificationsAvailable().then(setNotificationsSupported);
  }, []);

  const handleNotificationsToggle = async (value: boolean) => {
    if (value) {
      const granted = await requestPermissions();
      setNotificationsEnabled(granted);
      if (!granted) {
        Alert.alert(
          "Permission Required",
          "Please enable notifications for NanoHabits in your device settings."
        );
      }
    } else {
      await cancelAllReminders();
      setNotificationsEnabled(false);
    }
  };

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "This will permanently delete all goals, habits, and completion history. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Everything",
          style: "destructive",
          onPress: async () => {
            setClearing(true);
            try {
              await DatabaseService.clearAllData();
              Alert.alert("Done", "All data has been cleared.");
            } catch (err) {
              Alert.alert("Error", "Failed to clear data.");
              console.error(err);
            } finally {
              setClearing(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["bottom"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Notifications section */}
        <SectionHeader title="Notifications" />
        {notificationsSupported ? (
          <>
            <SettingsRow label="Enable Reminders">
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationsToggle}
                trackColor={{ false: "#ddd", true: "#1A1A1A" }}
                thumbColor="#F8F6F1"
              />
            </SettingsRow>
            <Text
              style={{
                fontSize: 12,
                color: "#888",
                fontFamily: "Poppins",
                paddingHorizontal: 20,
                marginTop: 4,
                marginBottom: 8,
              }}
            >
              Reminders are set per habit using the reminder time you enter when
              creating a habit (HH:MM format).
            </Text>
          </>
        ) : (
          <Text
            style={{
              fontSize: 13,
              color: "#888",
              fontFamily: "Poppins",
              paddingHorizontal: 20,
              paddingVertical: 14,
            }}
          >
            Install expo-notifications to enable reminders.{"\n"}
            Run: npx expo install expo-notifications
          </Text>
        )}

        {/* Data section */}
        <SectionHeader title="Data" />
        <TouchableOpacity
          onPress={handleClearData}
          disabled={clearing}
          style={{
            marginHorizontal: 20,
            marginTop: 8,
            padding: 14,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#ff3b30",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            opacity: clearing ? 0.5 : 1,
          }}
        >
          {clearing ? (
            <ActivityIndicator color="#ff3b30" style={{ marginRight: 8 }} />
          ) : null}
          <Text
            style={{
              color: "#ff3b30",
              fontFamily: "Poppins-Bold",
              fontSize: 15,
            }}
          >
            {clearing ? "Clearing..." : "Clear All Data"}
          </Text>
        </TouchableOpacity>

        {/* About section */}
        <SectionHeader title="About" />
        <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 15, color: "#1A1A1A" }}>
            NanoHabits AI
          </Text>
          <Text style={{ fontFamily: "Poppins", fontSize: 13, color: "#888", marginTop: 2 }}>
            Tiny consistent actions, powered by smart feedback, lead to lasting transformation.
          </Text>
        </View>
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginBottom: 4,
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins-Bold",
          fontSize: 12,
          color: "#888",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

function SettingsRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
      }}
    >
      <Text style={{ fontFamily: "Poppins", fontSize: 15, color: "#1A1A1A" }}>
        {label}
      </Text>
      {children}
    </View>
  );
}
