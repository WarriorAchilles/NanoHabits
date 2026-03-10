import * as SQLite from "expo-sqlite";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Platform } from "react-native";

let db: SQLite.SQLiteDatabase | null = null;
let isInitializing = false;

export type Goal = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type GoalWithHabits = Goal & {
  habits: HabitWithCompletions[];
};

export type Habit = {
  id: string;
  name: string;
  frequency: string;
  reminderTime?: string;
  isActive: number;
  goalId?: string;
  createdAt: string;
  updatedAt: string;
};

export type HabitCompletion = {
  id: string;
  habitId: string;
  date: string;
  createdAt: string;
};

export type HabitWithCompletions = Habit & {
  completions: HabitCompletion[];
};

export class DatabaseService {
  static async initialize() {
    if (isInitializing) {
      while (isInitializing) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return;
    }

    if (db) return;

    isInitializing = true;

    try {
      const dbName = "nanohabits.db";

      if (Platform.OS === "web") {
        if (document.readyState !== "complete") {
          await new Promise((resolve) => {
            window.addEventListener("load", resolve, { once: true });
          });
        }
      }

      db = await SQLite.openDatabaseAsync(dbName);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS goals (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS habits (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          frequency TEXT NOT NULL,
          reminderTime TEXT,
          isActive INTEGER NOT NULL DEFAULT 1,
          goalId TEXT REFERENCES goals(id),
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

      await DatabaseService.runMigrations();

      console.log("Database initialized successfully");
    } catch (e) {
      console.error("Error initializing database:", e);
      db = null;
      throw e;
    } finally {
      isInitializing = false;
    }
  }

  static async runMigrations() {
    const habitsInfo = (await db!.getAllAsync(
      "PRAGMA table_info(habits)"
    )) as any[];
    const hasGoalId = habitsInfo.some((col: any) => col.name === "goalId");
    if (!hasGoalId) {
      await db!.execAsync(
        "ALTER TABLE habits ADD COLUMN goalId TEXT REFERENCES goals(id);"
      );
    }
  }

  static async ensureInitialized() {
    if (!db) {
      await DatabaseService.initialize();
    }
  }

  // ─── Goals ────────────────────────────────────────────────────────────────

  static async createGoal(name: string): Promise<Goal> {
    await DatabaseService.ensureInitialized();
    const id = uuidv4();
    const now = new Date().toISOString();
    await db!.runAsync(
      "INSERT INTO goals (id, name, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
      [id, name, now, now]
    );
    return { id, name, createdAt: now, updatedAt: now };
  }

  static async getGoals(): Promise<GoalWithHabits[]> {
    await DatabaseService.ensureInitialized();
    const goals = (await db!.getAllAsync(
      "SELECT * FROM goals ORDER BY createdAt ASC"
    )) as Goal[];
    return await Promise.all(
      goals.map(async (goal) => {
        const habits = await DatabaseService.getHabitsForGoal(goal.id);
        return { ...goal, habits };
      })
    );
  }

  static async getGoalsSimple(): Promise<Goal[]> {
    await DatabaseService.ensureInitialized();
    return (await db!.getAllAsync(
      "SELECT * FROM goals ORDER BY createdAt ASC"
    )) as Goal[];
  }

  static async deleteGoal(id: string) {
    await DatabaseService.ensureInitialized();
    await db!.runAsync("UPDATE habits SET isActive = 0 WHERE goalId = ?", [id]);
    await db!.runAsync("DELETE FROM goals WHERE id = ?", [id]);
  }

  // ─── Habits ───────────────────────────────────────────────────────────────

  static async createHabit(data: {
    name: string;
    frequency: string;
    reminderTime?: string;
    goalId?: string;
  }): Promise<HabitWithCompletions | null> {
    await DatabaseService.ensureInitialized();
    const id = uuidv4();
    const now = new Date().toISOString();
    await db!.runAsync(
      "INSERT INTO habits (id, name, frequency, reminderTime, isActive, goalId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        data.name,
        data.frequency,
        data.reminderTime ?? null,
        1,
        data.goalId ?? null,
        now,
        now,
      ]
    );
    return await DatabaseService.getHabitById(id);
  }

  static async getHabits(): Promise<HabitWithCompletions[]> {
    await DatabaseService.ensureInitialized();
    const habits = (await db!.getAllAsync(
      "SELECT * FROM habits WHERE isActive = 1 ORDER BY createdAt DESC"
    )) as Habit[];
    return await Promise.all(
      habits.map(async (habit) => {
        const completions = await DatabaseService.getCompletionsForHabit(
          habit.id
        );
        return { ...habit, completions };
      })
    );
  }

  static async getHabitsForGoal(
    goalId: string
  ): Promise<HabitWithCompletions[]> {
    await DatabaseService.ensureInitialized();
    const habits = (await db!.getAllAsync(
      "SELECT * FROM habits WHERE goalId = ? AND isActive = 1 ORDER BY createdAt ASC",
      [goalId]
    )) as Habit[];
    return await Promise.all(
      habits.map(async (habit) => {
        const completions = await DatabaseService.getCompletionsForHabit(
          habit.id
        );
        return { ...habit, completions };
      })
    );
  }

  static async getHabitById(
    id: string
  ): Promise<HabitWithCompletions | null> {
    await DatabaseService.ensureInitialized();
    const habits = (await db!.getAllAsync(
      "SELECT * FROM habits WHERE id = ?",
      [id]
    )) as Habit[];
    if (habits.length === 0) return null;
    const completions = await DatabaseService.getCompletionsForHabit(
      habits[0].id
    );
    return { ...habits[0], completions };
  }

  static async deleteHabit(id: string) {
    await DatabaseService.ensureInitialized();
    await db!.runAsync("UPDATE habits SET isActive = 0 WHERE id = ?", [id]);
  }

  // ─── Completions ──────────────────────────────────────────────────────────

  static async getCompletionsForHabit(
    habitId: string
  ): Promise<HabitCompletion[]> {
    await DatabaseService.ensureInitialized();
    return (await db!.getAllAsync(
      "SELECT * FROM habit_completions WHERE habitId = ? ORDER BY date DESC",
      [habitId]
    )) as HabitCompletion[];
  }

  static async completeHabit(
    habitId: string,
    date: string
  ): Promise<HabitCompletion> {
    await DatabaseService.ensureInitialized();
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    await db!.runAsync(
      "INSERT OR IGNORE INTO habit_completions (id, habitId, date, createdAt) VALUES (?, ?, ?, ?)",
      [id, habitId, date, createdAt]
    );
    return { id, habitId, date, createdAt };
  }

  static async uncompleteHabit(habitId: string, date: string) {
    await DatabaseService.ensureInitialized();
    await db!.runAsync(
      "DELETE FROM habit_completions WHERE habitId = ? AND date = ?",
      [habitId, date]
    );
  }

  // ─── Streaks ──────────────────────────────────────────────────────────────

  static async getHabitStreak(habitId: string): Promise<number> {
    const completions = await DatabaseService.getCompletionsForHabit(habitId);
    if (completions.length === 0) return 0;

    const sortedDates = completions
      .map((c) => c.date)
      .sort((a, b) => (a < b ? 1 : -1));

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let cursor = today;

    for (const dateStr of sortedDates) {
      const d = new Date(dateStr);
      d.setHours(0, 0, 0, 0);
      const diffDays = Math.round(
        (cursor.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === 0 || diffDays === 1) {
        streak++;
        cursor = d;
      } else {
        break;
      }
    }

    return streak;
  }

  // ─── Maintenance ──────────────────────────────────────────────────────────

  static async clearAllData() {
    await DatabaseService.ensureInitialized();
    await db!.execAsync(`
      DELETE FROM habit_completions;
      DELETE FROM habits;
      DELETE FROM goals;
    `);
  }
}
