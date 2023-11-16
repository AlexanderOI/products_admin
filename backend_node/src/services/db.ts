import { PrismaClient } from '@prisma/client'
import sqlite3 from 'sqlite3'

export const prisma = new PrismaClient()

export function executeQuery(query: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./prisma/dev.db')

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
      db.close()
    })
  })
}