import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { masterStyles } from '@/constants/tokens';
import { DatabaseService } from '@/services/database';

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
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    frequency: '',
    reminderTime: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const habits = await DatabaseService.getHabits() as HabitWithCompletions[];
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
      await DatabaseService.createHabit({
        name,
        frequency: 'daily',
      });
      loadHabits();
    } catch (err) {
      setError('Failed to create habit');
      console.error('Error creating habit:', err);
    }
  }

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.frequency) {
      setError('Name and frequency are required');
      return;
    }
    setSubmitting(true);
    try {
      await DatabaseService.createHabit({
        name: form.name,
        frequency: form.frequency,
        reminderTime: form.reminderTime || undefined,
      });
      setForm({ name: '', frequency: '', reminderTime: '' });
      setShowForm(false);
      loadHabits();
    } catch (err) {
      setError('Failed to create habit');
      console.error('Error creating habit:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={masterStyles.centeredContainer}>
      <Text style={masterStyles.titleLight}>
        Habits
      </Text>
      <View style={masterStyles.divider} />

      <Button
        title={showForm ? 'Cancel' : 'Add Habit'}
        onPress={() => {
          setShowForm((prev) => !prev);
          setError(null);
        }}
      />

      {showForm && (
        <View style={{ width: '100%', marginVertical: 16 }}>
          <TextInput
            placeholder="Habit Name"
            value={form.name}
            onChangeText={(text) => handleFormChange('name', text)}
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TextInput
            placeholder="Frequency (e.g. daily)"
            value={form.frequency}
            onChangeText={(text) => handleFormChange('frequency', text)}
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TextInput
            placeholder="Reminder Time (optional)"
            value={form.reminderTime}
            onChangeText={(text) => handleFormChange('reminderTime', text)}
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <Button
            title={submitting ? 'Submitting...' : 'Submit'}
            onPress={handleSubmit}
            disabled={submitting}
          />
        </View>
      )}
      
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
      
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}
