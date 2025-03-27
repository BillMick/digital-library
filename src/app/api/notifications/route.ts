// show newsletter of this user
import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return new Response(JSON.stringify({ message: 'userId 是必须的' }), { status: 400 })
  }

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { date: 'desc' }, // 按时间倒序
  })

  return Response.json(notifications)
}
