import { prisma } from '../../src/infrastructure/database/client'

// Runs before each integration test file
// Cleans the database between test runs to prevent state bleed

beforeEach(async () => {
  // Delete all rows in reverse dependency order
  // Add your tables here as you add models to schema.prisma
  // Example:
  // await prisma.post.deleteMany()
  // await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})
