import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

import { masterStyles } from "@/constants/tokens";
import { DatabaseService, HabitWithCompletions } from "@/services/database";

const DOT_SIZE = 11;
const DOT_GAP = 5;
const DOTS_PER_ROW = 7;
const TOTAL_DAYS = 35;

/** Returns an array of the last N date strings in YYYY-MM-DD, oldest first. */
function lastNDates(n: number): string[] {
  const dates: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

function DotGrid({ habit }: { habit: HabitWithCompletions }) {
  const completedDates = new Set(habit.completions.map((c) => c.date));
  const dates = lastNDates(TOTAL_DAYS);

  // Split into rows of 7
  const rows: string[][] = [];
  for (let i = 0; i < dates.length; i += DOTS_PER_ROW) {
    rows.push(dates.slice(i, i + DOTS_PER_ROW));
  }

  return (
    <View style={{ marginBottom: 28 }}>
      <Text style={[masterStyles.habitName, { marginBottom: 10, textAlign: "center" }]}>
        {habit.name}
      </Text>
      <View style={{ alignItems: "center" }}>
        {rows.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={{ flexDirection: "row", marginBottom: DOT_GAP }}
          >
            {row.map((date) => {
              const completed = completedDates.has(date);
              return (
                <View
                  key={date}
                  style={{
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    borderRadius: DOT_SIZE / 2,
                    marginHorizontal: DOT_GAP / 2,
                    backgroundColor: completed ? "#1A1A1A" : "transparent",
                    borderWidth: completed ? 0 : 1.5,
                    borderColor: "#1A1A1A",
                  }}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function StreaksScreen() {
  const [habits, setHabits] = useState<HabitWithCompletions[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      setHabits(await DatabaseService.getHabits());
    } catch (err) {
      setError("Failed to load streaks");
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: masterStyles.centeredContainer.backgroundColor,
      }}
      edges={["top", "left", "right", "bottom"]}
    >
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 }}>
        {loading && <ActivityIndicator />}

        {error && (
          <Text style={[masterStyles.secondaryText, { color: "red" }]}>
            {error}
          </Text>
        )}

        {!loading && habits.length === 0 && (
          <Text style={[masterStyles.secondaryText, { textAlign: "left" }]}>
            No habits yet. Add some habits to start tracking streaks.
          </Text>
        )}

        {habits.map((habit) => (
          <DotGrid key={habit.id} habit={habit} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
