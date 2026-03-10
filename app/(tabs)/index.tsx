import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

import { masterStyles } from "@/constants/tokens";
import { DatabaseService, Goal, HabitWithCompletions } from "@/services/database";
import { scheduleHabitReminder } from "@/services/notifications";

const TODAY = new Date().toISOString().split("T")[0];

function todayLabel() {
  return new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });
}

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
        marginTop: 16,
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

export default function HabitsScreen() {
  const [habits, setHabits] = useState<HabitWithCompletions[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkedHabits, setCheckedHabits] = useState<Set<string>>(new Set());

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    frequency: "daily",
    reminderTime: "",
    goalId: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const [fetchedHabits, fetchedGoals] = await Promise.all([
        DatabaseService.getHabits(),
        DatabaseService.getGoalsSimple(),
      ]);
      setHabits(fetchedHabits);
      setGoals(fetchedGoals);

      // Restore today's checked state from the database
      const todayCompleted = new Set<string>();
      for (const h of fetchedHabits) {
        if (h.completions.some((c) => c.date === TODAY)) {
          todayCompleted.add(h.id);
        }
      }
      setCheckedHabits(todayCompleted);
    } catch (err) {
      setError("Failed to load habits");
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

  const toggleHabitCompletion = async (habitId: string) => {
    const isChecked = checkedHabits.has(habitId);

    // Optimistic UI update
    setCheckedHabits((prev) => {
      const next = new Set(prev);
      isChecked ? next.delete(habitId) : next.add(habitId);
      return next;
    });

    try {
      if (isChecked) {
        await DatabaseService.uncompleteHabit(habitId, TODAY);
      } else {
        await DatabaseService.completeHabit(habitId, TODAY);
      }
    } catch (err) {
      // Revert on failure
      setCheckedHabits((prev) => {
        const next = new Set(prev);
        isChecked ? next.add(habitId) : next.delete(habitId);
        return next;
      });
      console.error("Error toggling habit completion:", err);
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setError("Habit name is required");
      return;
    }
    if (!form.frequency.trim()) {
      setError("Frequency is required");
      return;
    }
    if (!form.goalId) {
      setError("Please select a goal");
      return;
    }

    setSubmitting(true);
    try {
      const habit = await DatabaseService.createHabit({
        name: form.name.trim(),
        frequency: form.frequency.trim(),
        reminderTime: form.reminderTime.trim() || undefined,
        goalId: form.goalId,
      });

      if (habit && habit.reminderTime) {
        await scheduleHabitReminder(habit);
      }

      setForm({ name: "", frequency: "daily", reminderTime: "", goalId: "" });
      setShowForm(false);
      setError(null);
      load();
    } catch (err) {
      setError("Failed to create habit");
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
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 32,
        }}
      >
        {/* Date header */}
        <View style={{ alignItems: "center", width: "100%", marginTop: 8 }}>
          <Text style={masterStyles.titleLight}>{todayLabel()}</Text>
        </View>

        {loading && <ActivityIndicator style={{ marginTop: 16 }} />}

        {error && (
          <Text style={[masterStyles.secondaryText, { color: "red", marginBottom: 8, textAlign: "left" }]}>
            {error}
          </Text>
        )}

        {!loading && habits.length === 0 && (
          <Text style={[masterStyles.secondaryText, { textAlign: "left" }]}>
            No habits yet. Add your first habit below.
          </Text>
        )}

        {/* Habits list */}
        {habits.map((habit) => {
          const isChecked = checkedHabits.has(habit.id);
          return (
            <TouchableOpacity
              key={habit.id}
              onPress={() => toggleHabitCompletion(habit.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 6,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: "#1A1A1A",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                {isChecked && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "#1A1A1A",
                    }}
                  />
                )}
              </View>
              <Text
                style={[
                  masterStyles.habitName,
                  isChecked && { opacity: 0.4 },
                ]}
              >
                {habit.name}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Add habit button */}
        <PlusButton
          onPress={() => {
            setShowForm((p) => !p);
            setError(null);
          }}
        />

        {/* Add habit form */}
        {showForm && (
          <View style={{ width: "100%", marginTop: 16 }}>
            <TextInput
              placeholder="Habit name"
              placeholderTextColor="#999"
              value={form.name}
              onChangeText={(t) => setForm((p) => ({ ...p, name: t }))}
              style={formInputStyle}
            />
            <TextInput
              placeholder="Frequency (e.g. daily, weekly)"
              placeholderTextColor="#999"
              value={form.frequency}
              onChangeText={(t) => setForm((p) => ({ ...p, frequency: t }))}
              style={formInputStyle}
            />
            <TextInput
              placeholder="Reminder time (HH:MM, optional)"
              placeholderTextColor="#999"
              value={form.reminderTime}
              onChangeText={(t) => setForm((p) => ({ ...p, reminderTime: t }))}
              style={formInputStyle}
            />

            {/* Goal picker */}
            {goals.length === 0 ? (
              <Text style={[masterStyles.secondaryText, { fontSize: 13, textAlign: "left", marginBottom: 12, color: "#888" }]}>
                No goals yet — add a goal in the Goals tab first.
              </Text>
            ) : (
              <View style={{ marginBottom: 12 }}>
                <Text style={[masterStyles.secondaryText, { fontSize: 13, textAlign: "left", marginBottom: 6 }]}>
                  Goal
                </Text>
                {goals.map((g) => (
                  <TouchableOpacity
                    key={g.id}
                    onPress={() => setForm((p) => ({ ...p, goalId: g.id }))}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      paddingHorizontal: 10,
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: form.goalId === g.id ? "#1A1A1A" : "#ddd",
                      backgroundColor: form.goalId === g.id ? "#1A1A1A" : "transparent",
                      marginBottom: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontSize: 15,
                        color: form.goalId === g.id ? "#F8F6F1" : "#1A1A1A",
                      }}
                    >
                      {g.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

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
              <Text style={{ color: "#F8F6F1", fontFamily: "Poppins-Bold", fontSize: 14 }}>
                {submitting ? "Adding..." : "Add Habit"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const formInputStyle = {
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 6,
  padding: 10,
  marginBottom: 10,
  fontFamily: "Poppins",
  fontSize: 15,
  color: "#1A1A1A",
};
