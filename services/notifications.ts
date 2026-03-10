/**
 * Notification service for habit reminders.
 *
 * Currently a stub — all functions are safe no-ops.
 * To enable reminders:
 *   1. Run: npx expo install expo-notifications
 *   2. Replace this file with the real implementation (see workplan.md §6)
 */

import type { Habit } from "./database";

export async function requestPermissions(): Promise<boolean> {
  return false;
}

export async function scheduleHabitReminder(_habit: Habit): Promise<void> {}

export async function cancelHabitReminder(_habitId: string): Promise<void> {}

export async function cancelAllReminders(): Promise<void> {}

export async function isNotificationsAvailable(): Promise<boolean> {
  return false;
}
