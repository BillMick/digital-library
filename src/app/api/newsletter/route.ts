
import { PrismaClient, NotificationType } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

// 修复函数名为 POST
export async function POST(req: NextRequest) {
  const { adminId, title, content } = await req.json()

  // 检查是否是管理员
  const admin = await prisma.user.findUnique({ where: { id: adminId } })
  if (!admin || admin.role !== 'ADMINISTRATEUR') {
    return new Response(JSON.stringify({ message: 'Non autorisé' }), { status: 403 })
  }

  // 获取所有用户
  const users = await prisma.user.findMany({ select: { id: true } })

  // 批量发送通知
  const notifications = users.map((u) => ({
    userId: u.id,
    message: `${title}\n\n${content}`,
    type: NotificationType.NEWSLETTER,
  }))

  await prisma.notification.createMany({
    data: notifications,
  })

  return Response.json({ message: '✅ Newsletter envoyée avec succès', count: notifications.length })
}
