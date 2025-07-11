import { PrismaClient } from '@prisma/client'

// Initialize Prisma client
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./nanohabits.db'
    }
  }
})

export class DatabaseService {
  static async initialize() {
    // Run migrations/setup if needed
    try {
      await prisma.$connect()
      console.log('Database connected successfully')
    } catch (error) {
      console.error('Database connection failed:', error)
    }
  }

  // Habit operations
  static async createHabit(data: {
    name: string
    frequency: string
    reminderTime?: string
  }) {
    return await prisma.habit.create({
      data,
      include: {
        completions: true
      }
    })
  }

  static async getHabits() {
    return await prisma.habit.findMany({
      include: {
        completions: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async completeHabit(habitId: string, date: string) {
    return await prisma.habitCompletion.create({
      data: {
        habitId,
        date
      }
    })
  }

  static async getHabitStreak(habitId: string) {
    const completions = await prisma.habitCompletion.findMany({
      where: { habitId },
      orderBy: { date: 'desc' }
    })
    
    // Calculate streak logic here
    return completions.length // Simplified for now
  }
}