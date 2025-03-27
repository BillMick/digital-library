import { PrismaClient, RequestStatus } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

// GET: 管理员获取所有待处理的请求
export async function GET() {
  const pendingRequests = await prisma.request.findMany({
    where: { status: 'EN_ATTENTE' },
    include: { user: true }, // 关联用户信息
  })

  return Response.json(pendingRequests)
}

// POST: 管理员处理用户请求（接受/拒绝）
export async function POST(req: NextRequest) {
  const { adminId, requestId, action } = await req.json()

  // 权限校验
  const admin = await prisma.user.findUnique({ where: { id: adminId } })
  if (!admin || admin.role !== 'ADMINISTRATEUR') {
    return new Response(JSON.stringify({ message: 'Non autorisé' }), { status: 403 })
  }

  // 检查请求是否存在
  const request = await prisma.request.findUnique({ where: { id: requestId } })
  if (!request) {
    return new Response(JSON.stringify({ message: 'Requête introuvable' }), { status: 404 })
  }

  // 更新请求状态（ACCEPTEE 或 REFUSEE）
  const updated = await prisma.request.update({
    where: { id: requestId },
    data: { status: action as RequestStatus },
  })

  return Response.json(updated)
}
