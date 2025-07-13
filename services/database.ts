import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';

let db: SQLite.SQLiteDatabase | null = null;

export class DatabaseService {
  static async initialize() {
    // Open database asynchronously
    db = await SQLite.openDatabaseAsync('nanohabits.db');
    
    // Create tables if they do not exist
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS habits (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        frequency TEXT NOT NULL,
        reminderTime TEXT,
        isActive INTEGER NOT NULL DEFAULT 1,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS habit_completions (
        id TEXT PRIMARY KEY NOT NULL,
        habitId TEXT NOT NULL,
        date TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (habitId) REFERENCES habits(id) ON DELETE CASCADE,
        UNIQUE (habitId, date)
      );
    `);
  }

  static async createHabit(data: {
    name: string;
    frequency: string;
    reminderTime?: string;
  }) {
    if (!db) {
      await DatabaseService.initialize();
    }
    
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const isActive = 1;
    
    await db!.runAsync(
      'INSERT INTO habits (id, name, frequency, reminderTime, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, data.name, data.frequency, data.reminderTime ?? null, isActive, createdAt, updatedAt]
    );
    
    return await DatabaseService.getHabitById(id);
  }

  static async getHabits() {
    if (!db) {
      await DatabaseService.initialize();
    }
    
    const habits = await db!.getAllAsync('SELECT * FROM habits ORDER BY createdAt DESC');
    
    // Fetch completions for each habit
    const habitsWithCompletions = await Promise.all(
      habits.map(async (habit: any) => {
        const completions = await DatabaseService.getCompletionsForHabit(habit.id);
        return { ...habit, completions };
      })
    );
    
    return habitsWithCompletions;
  }

  static async getHabitById(id: string) {
    if (!db) {
      await DatabaseService.initialize();
    }
    
    const habits = await db!.getAllAsync('SELECT * FROM habits WHERE id = ?', [id]);
    
    if (habits.length > 0) {
      const habit = habits[0] as any;
      const completions = await DatabaseService.getCompletionsForHabit(habit.id);
      return { ...habit, completions };
    } else {
      return null;
    }
  }

  static async getCompletionsForHabit(habitId: string) {
    if (!db) {
      await DatabaseService.initialize();
    }
    
    return await db!.getAllAsync(
      'SELECT * FROM habit_completions WHERE habitId = ? ORDER BY date DESC',
      [habitId]
    );
  }

  static async completeHabit(habitId: string, date: string) {
    if (!db) {
      await DatabaseService.initialize();
    }
    
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    
    await db!.runAsync(
      'INSERT INTO habit_completions (id, habitId, date, createdAt) VALUES (?, ?, ?, ?)',
      [id, habitId, date, createdAt]
    );
    
    return { id, habitId, date, createdAt };
  }

  static async getHabitStreak(habitId: string) {
    const completions = await DatabaseService.getCompletionsForHabit(habitId);
    return completions.length;
  }
}