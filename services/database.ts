import * as SQLite from 'expo-sqlite';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Platform } from 'react-native';

let db: SQLite.SQLiteDatabase | null = null;
let isInitializing = false;

export class DatabaseService {
  static async initialize() {
    if (isInitializing) {
      // Wait for existing initialization to complete
      while (isInitializing) {
        // this is kinda weird...there's gotta be a better way to do this, but web won't work any other way so far
        // web still kinda broken...but it works on iOS so :shrug:
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return;
    }

    if (db) {
      return; // Already initialized
    }

    console.log('initializing database...');
    isInitializing = true;

    try {
      // Use the database name as recommended in Expo docs
      const dbName = 'nanohabits.db';
      
      // For web, ensure the page is loaded
      if (Platform.OS === 'web') {
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            window.addEventListener('load', resolve, { once: true });
          });
        }
      }
      
      // Open database
      db = await SQLite.openDatabaseAsync(dbName);
      console.log('Database opened successfully:', db);
      
      // Create tables if they do not exist
      console.log('Creating database tables...');
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
      console.log('Database initialized successfully');
    } catch (e) {
      console.error('Error initializing database:', e);
      db = null; // Reset on error
      throw e; // Re-throw to allow calling code to handle
    } finally {
      isInitializing = false;
    }
  }

  static async ensureInitialized() {
    if (!db) {
      await DatabaseService.initialize();
    }
  }

  static async createHabit(data: {
    name: string;
    frequency: string;
    reminderTime?: string;
  }) {
    console.log('creating habit...');
    await DatabaseService.ensureInitialized();

    const id = uuidv4();
    console.log('id: ', id);
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
    console.log('getHabits');
    await DatabaseService.ensureInitialized();
    
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
    await DatabaseService.ensureInitialized();
    
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
    await DatabaseService.ensureInitialized();
    
    return await db!.getAllAsync(
      'SELECT * FROM habit_completions WHERE habitId = ? ORDER BY date DESC',
      [habitId]
    );
  }

  static async completeHabit(habitId: string, date: string) {
    await DatabaseService.ensureInitialized();
    
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