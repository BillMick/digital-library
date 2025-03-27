import { PrismaClient, UploadStatus, NotificationType, RequestStatus } from '@prisma/client'
import { NextRequest } from 'next/server'

// 创建 Prisma 客户端实例
const prisma = new PrismaClient()

// 图书管理员（BIBLIOTHÉCAIRES）功能：
// 上传文件审核接口 /api/uploads/approve
// GET：列出所有待审核文件（状态为 EN_ATTENTE）
// POST：通过或拒绝上传（需要 BIBLIOTHECAIRE 或 ADMINISTRATEUR 权限）


// 处理 GET 请求，获取待审核的文件（图书管理员）
export async function GET() {
  // 找出状态为 EN_ATTENTE 的文件（等待图书管理员审核）
  const pendingUploads = await prisma.file.findMany({
    where: { status: 'EN_ATTENTE' },
    include: { user: true }, // 包含上传用户信息
  })
  return Response.json(pendingUploads)
}

export async function POST(req: NextRequest) {
  const { fileId, adminId, action, reason } = await req.json()

  // 👇 把 fileId 转换为 Int 类型（防止是字符串导致找不到）
  const fileIdInt = typeof fileId === 'string' ? parseInt(fileId) : fileId

  // 检查管理员身份是否为 BIBLIOTHECAIRE 或 ADMINISTRATEUR
  const admin = await prisma.user.findUnique({ where: { id: adminId } })
  if (!admin || (admin.role !== 'BIBLIOTHECAIRE' && admin.role !== 'ADMINISTRATEUR')) {
    return new Response(JSON.stringify({ message: 'Non autorisé' }), { status: 403 })
  }

  // 检查文件是否存在
  const file = await prisma.file.findUnique({ where: { id: fileIdInt } })
  if (!file) {
    return new Response(JSON.stringify({ message: 'Fichier introuvable' }), { status: 404 })
  }

  // 根据操作（接受或拒绝）更新文件状态
  let updateData: any = { status: UploadStatus.ACCEPTEE }
  if (action === 'REJETEE') {
    updateData = {
      status: UploadStatus.REJETEE,
      comment: reason,
    }
  }

  // 更新文件记录
  const updated = await prisma.file.update({
    where: { id: fileIdInt },
    data: updateData,
  })

  return Response.json(updated)
}
