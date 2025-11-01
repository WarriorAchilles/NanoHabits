import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditScreenInfo from "@/components/EditScreenInfo";
import { masterStyles } from "@/constants/tokens";
import { DatabaseService } from "@/services/database";

// Define the type for habits with completions
type HabitWithCompletions = {
  id: string;
  name: string;
  frequency: string;
  reminderTime?: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
  completions: Array<{
    id: string;
    habitId: string;
    date: string;
    createdAt: string;
  }>;
};

export default function HabitsScreen() {
  const [habits, setHabits] = useState<HabitWithCompletions[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkedHabits, setCheckedHabits] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    frequency: "",
    reminderTime: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const habits =
        (await DatabaseService.getHabits()) as HabitWithCompletions[];
      setHabits(habits);
    } catch (err) {
      setError("Failed to load habits");
      console.error("Error loading habits:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleHabitCompletion = (habitId: string) => {
    setCheckedHabits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(habitId)) {
        newSet.delete(habitId);
      } else {
        newSet.add(habitId);
      }
      return newSet;
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.frequency) {
      setError("Name and frequency are required");
      return;
    }
    setSubmitting(true);
    try {
      await DatabaseService.createHabit({
        name: form.name,
        frequency: form.frequency,
        reminderTime: form.reminderTime || undefined,
      });
      setForm({ name: "", frequency: "", reminderTime: "" });
      setShowForm(false);
      loadHabits();
    } catch (err) {
      setError("Failed to create habit");
      console.error("Error creating habit:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: masterStyles.centeredContainer.backgroundColor,
      }}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={masterStyles.centeredContainer}>
        <Text style={masterStyles.titleLight}>{today}</Text>

        <Button
          title={showForm ? "Cancel" : "Add Habit"}
          onPress={() => {
            setShowForm((prev) => !prev);
            setError(null);
          }}
        />

        {showForm && (
          <View style={{ width: "100%", marginVertical: 16 }}>
            <TextInput
              placeholder="Habit Name"
              value={form.name}
              onChangeText={(text) => handleFormChange("name", text)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 6,
                padding: 8,
                marginBottom: 8,
              }}
            />
            <TextInput
              placeholder="Frequency (e.g. daily)"
              value={form.frequency}
              onChangeText={(text) => handleFormChange("frequency", text)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 6,
                padding: 8,
                marginBottom: 8,
              }}
            />
            <TextInput
              placeholder="Reminder Time (optional)"
              value={form.reminderTime}
              onChangeText={(text) => handleFormChange("reminderTime", text)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 6,
                padding: 8,
                marginBottom: 8,
              }}
            />
            <Button
              title={submitting ? "Submitting..." : "Submit"}
              onPress={handleSubmit}
              disabled={submitting}
            />
          </View>
        )}

        {loading && (
          <Text style={masterStyles.secondaryText}>Loading habits...</Text>
        )}

        {error && (
          <Text style={[masterStyles.secondaryText, { color: "red" }]}>
            {error}
          </Text>
        )}

        {!loading && !error && habits.length === 0 && (
          <Text style={masterStyles.secondaryText}>
            No habits yet. Create your first habit!
          </Text>
        )}

        {!loading && !error && habits.length > 0 && (
          <View style={{ width: "100%" }}>
            {habits.map((habit) => {
              const isChecked = checkedHabits.has(habit.id);
              return (
                <View
                  key={habit.id}
                  style={{
                    marginVertical: 4,
                    marginHorizontal: 38,
                    padding: 12,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 8,
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => toggleHabitCompletion(habit.id)}
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
                  </TouchableOpacity>
                  <Text style={masterStyles.habitName}>{habit.name}</Text>
                  {/* Debug data */}
                  {/* <Text style={masterStyles.secondaryText}>
                  Frequency: {habit.frequency}
                </Text>
                <Text style={masterStyles.secondaryText}>
                  Completions: {habit.completions?.length || 0}
                </Text> */}
                </View>
              );
            })}
          </View>
        )}

        {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      </View>
    </SafeAreaView>
  );
}
