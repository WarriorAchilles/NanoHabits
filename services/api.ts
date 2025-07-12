import { Habit, HabitCompletion } from '@prisma/client';

export type HabitWithCompletions = Habit & {
  completions: HabitCompletion[];
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8081';

export class ApiService {
  static async getHabits(): Promise<HabitWithCompletions[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/habits`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching habits:', error);
      throw error;
    }
  }

  static async createHabit(data: {
    name: string;
    frequency: string;
    reminderTime?: string;
  }): Promise<HabitWithCompletions> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating habit:', error);
      throw error;
    }
  }

  static async completeHabit(habitId: string, date: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/habits/${habitId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error completing habit:', error);
      throw error;
    }
  }
} 