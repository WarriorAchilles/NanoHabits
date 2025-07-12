import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { masterStyles } from '@/constants/tokens';
import { ApiService, HabitWithCompletions } from '@/services/api';

export default function HabitsScreen() {
  const [habits, setHabits] = useState<HabitWithCompletions[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const habits = await ApiService.getHabits();
      setHabits(habits);
    } catch (err) {
      setError('Failed to load habits');
      console.error('Error loading habits:', err);
    } finally {
      setLoading(false);
    }
  }

  const addHabit = async (name: string) => {
    try {
      await ApiService.createHabit({
        name,
        frequency: 'daily',
      });
      loadHabits();
    } catch (err) {
      setError('Failed to create habit');
      console.error('Error creating habit:', err);
    }
  }

  return (
    <View style={masterStyles.centeredContainer}>
      <Text style={masterStyles.titleLight}>
        Habits
      </Text>
      <View style={masterStyles.divider} />
      
      {loading && (
        <Text style={masterStyles.secondaryText}>Loading habits...</Text>
      )}
      
      {error && (
        <Text style={[masterStyles.secondaryText, { color: 'red' }]}>
          {error}
        </Text>
      )}
      
      {!loading && !error && habits.length === 0 && (
        <Text style={masterStyles.secondaryText}>
          No habits yet. Create your first habit!
        </Text>
      )}
      
      {!loading && !error && habits.length > 0 && (
        <View>
          {habits.map((habit) => (
            <View key={habit.id} style={{ marginVertical: 8, padding: 16, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
              <Text style={masterStyles.titleLight}>{habit.name}</Text>
              <Text style={masterStyles.secondaryText}>
                Frequency: {habit.frequency}
              </Text>
              <Text style={masterStyles.secondaryText}>
                Completions: {habit.completions?.length || 0}
              </Text>
            </View>
          ))}
        </View>
      )}
      
      <EditScreenInfo path="app/(tabs)/habitsTab.tsx" />
    </View>
  );
}
