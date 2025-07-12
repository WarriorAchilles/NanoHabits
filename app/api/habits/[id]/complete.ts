import { DatabaseService } from '@/services/database';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { date } = body;
    
    const completion = await DatabaseService.completeHabit(params.id, date);
    
    return Response.json(completion);
  } catch (error) {
    console.error('Error completing habit:', error);
    return Response.json(
      { error: 'Failed to complete habit' },
      { status: 500 }
    );
  }
} 