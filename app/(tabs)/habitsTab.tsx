import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { masterStyles } from '@/constants/tokens';
import {DatabaseService } from '@/services/database';
import { Habit } from '@prisma/client';

export default function HabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>([]);


  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    const habits = await DatabaseService.getHabits();
    setHabits(habits);
  }

  const addHabit = async (name: string) => {
    await DatabaseService.createHabit({
      name,
      frequency: 'daily',
    });
    loadHabits();
  }

  return (
    <View style={masterStyles.centeredContainer}>
      <Text style={masterStyles.titleLight}>
        habits content
      </Text>
      <View style={masterStyles.divider} />
      <EditScreenInfo path="app/(tabs)/habitsTab.tsx" />
    </View>
  );
}
