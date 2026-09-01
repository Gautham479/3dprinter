import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const globalForPrisma = globalThis;

// Always ensure a fresh instance with active process.env
globalForPrisma.prisma = new PrismaClient({
  log: ['error'],
});

export const prisma = globalForPrisma.prisma;
