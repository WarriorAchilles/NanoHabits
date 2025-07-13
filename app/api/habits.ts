import { DatabaseService } from '@/services/database';

export async function GET() {
  try {
    console.log('API hit. Getting habits...');
    const habits = await DatabaseService.getHabits();
    return Response.json(habits);
  } catch (error) {
    console.error('Error fetching habits:', error);
    return Response.json(
      { error: 'Failed to fetch habits' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, frequency, reminderTime } = body;
    
    const habit = await DatabaseService.createHabit({
      name,
      frequency,
      reminderTime
    });
    
    return Response.json(habit);
  } catch (error) {
    console.error('Error creating habit:', error);
    return Response.json(
      { error: 'Failed to create habit' },
      { status: 500 }
    );
  }
} 