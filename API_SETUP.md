# API Setup for NanoHabits

## Overview
The app now uses server-side API routes to handle database operations, avoiding the Prisma Client browser error.

## API Routes

### GET /api/habits
- Fetches all habits with their completions
- Returns: `HabitWithCompletions[]`

### POST /api/habits
- Creates a new habit
- Body: `{ name: string, frequency: string, reminderTime?: string }`
- Returns: `HabitWithCompletions`

### POST /api/habits/[id]/complete
- Marks a habit as completed for a specific date
- Body: `{ date: string }`
- Returns: `HabitCompletion`

## Development

1. Start the Expo development server:
   ```bash
   npm start
   ```

2. The API routes will be available at `http://localhost:8081/api/*`

3. For production, set the `EXPO_PUBLIC_API_URL` environment variable to your deployed API URL.

## Client Usage

Use the `ApiService` class in your components:

```typescript
import { ApiService } from '@/services/api';

// Fetch habits
const habits = await ApiService.getHabits();

// Create habit
const newHabit = await ApiService.createHabit({
  name: 'Exercise',
  frequency: 'daily'
});

// Complete habit
await ApiService.completeHabit(habitId, '2024-01-15');
``` 