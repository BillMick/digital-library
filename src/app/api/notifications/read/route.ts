
import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { notificationId, userId } = await req.json()

  // 校验通知是否存在且属于该用户
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId }
  })

  if (!notification || notification.userId !== userId) {
    return new Response(JSON.stringify({ message: 'Non autorisé' }), { status: 403 })
  }

  // 更新通知为已读
  await prisma.notification.update({
    where: { id: notificationId },
    data: { status: true }
  })

  return Response.json({ message: '通知已标记为已读 ✅' })
}
