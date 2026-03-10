import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

import { masterStyles } from "@/constants/tokens";
import { DatabaseService, GoalWithHabits } from "@/services/database";

function PlusButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#1A1A1A",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
      }}
    >
      <View
        style={{ position: "absolute", width: 12, height: 2, backgroundColor: "#1A1A1A" }}
      />
      <View
        style={{ position: "absolute", width: 2, height: 12, backgroundColor: "#1A1A1A" }}
      />
    </TouchableOpacity>
  );
}

export default function GoalsScreen() {
  const [goals, setGoals] = useState<GoalWithHabits[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      setGoals(await DatabaseService.getGoals());
    } catch (err) {
      setError("Failed to load goals");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const handleSubmit = async () => {
    if (!goalName.trim()) {
      setError("Goal name is required");
      return;
    }
    setSubmitting(true);
    try {
      await DatabaseService.createGoal(goalName.trim());
      setGoalName("");
      setShowForm(false);
      setError(null);
      load();
    } catch (err) {
      setError("Failed to create goal");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: masterStyles.centeredContainer.backgroundColor,
      }}
      edges={["top", "left", "right", "bottom"]}
    >
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        {loading && <ActivityIndicator style={{ marginTop: 24 }} />}

        {error && (
          <Text
            style={[
              masterStyles.secondaryText,
              { color: "red", marginTop: 16, textAlign: "left" },
            ]}
          >
            {error}
          </Text>
        )}

        {!loading && goals.length === 0 && (
          <Text
            style={[
              masterStyles.secondaryText,
              { marginTop: 24, textAlign: "left" },
            ]}
          >
            No goals yet. Tap + to add your first goal.
          </Text>
        )}

        {/* Goals list */}
        {goals.map((goal) => (
          <View key={goal.id} style={{ marginTop: 28 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={masterStyles.titleBold}>{goal.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Delete Goal",
                    `Delete "${goal.name}"? All associated habits will also be removed.`,
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                          await DatabaseService.deleteGoal(goal.id);
                          load();
                        },
                      },
                    ]
                  );
                }}
                style={{ padding: 4 }}
              >
                <Text style={{ fontSize: 18, color: "#999", lineHeight: 22 }}>×</Text>
              </TouchableOpacity>
            </View>
            {goal.habits.length === 0 ? (
              <Text
                style={[
                  masterStyles.secondaryText,
                  { fontSize: 13, textAlign: "left", color: "#888" },
                ]}
              >
                No habits yet
              </Text>
            ) : (
              goal.habits.map((habit) => (
                <View
                  key={habit.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: 4,
                  }}
                >
                  <Text
                    style={[masterStyles.habitName, { marginRight: 8, lineHeight: 28 }]}
                  >
                    •
                  </Text>
                  <Text style={masterStyles.habitName}>{habit.name}</Text>
                </View>
              ))
            )}
          </View>
        ))}

        {/* Add goal button */}
        <PlusButton
          onPress={() => {
            setShowForm((p) => !p);
            setError(null);
          }}
        />

        {/* Add goal form */}
        {showForm && (
          <View style={{ marginTop: 16 }}>
            <TextInput
              placeholder="Goal name"
              placeholderTextColor="#999"
              value={goalName}
              onChangeText={setGoalName}
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 6,
                padding: 10,
                marginBottom: 10,
                fontFamily: "Poppins",
                fontSize: 15,
                color: "#1A1A1A",
              }}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={submitting}
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: 6,
                padding: 12,
                alignItems: "center",
                opacity: submitting ? 0.5 : 1,
              }}
            >
              <Text
                style={{
                  color: "#F8F6F1",
                  fontFamily: "Poppins-Bold",
                  fontSize: 14,
                }}
              >
                {submitting ? "Adding..." : "Add Goal"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
