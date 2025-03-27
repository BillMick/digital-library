// 📁 prisma/seed.ts
import { PrismaClient, Role, UploadStatus, RequestStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 清空数据库
  await prisma.notification.deleteMany()
  await prisma.request.deleteMany()
  await prisma.file.deleteMany()
  await prisma.user.deleteMany()

  // 创建用户
  const admin = await prisma.user.create({
    data: {
      regNumber: 'admin001',
      surname: 'Admin',
      firstname: 'Alpha',
      email: 'admin@lib.com',
      password: 'adminpass',
      role: Role.ADMINISTRATEUR,
    },
  })

  const biblio = await prisma.user.create({
    data: {
      regNumber: 'bib001',
      surname: 'Biblio',
      firstname: 'Marie',
      email: 'biblio@lib.com',
      password: 'bibliopass',
      role: Role.BIBLIOTHECAIRE,
    },
  })

  const student = await prisma.user.create({
    data: {
      regNumber: 'stu001',
      surname: 'Student',
      firstname: 'Jean',
      email: 'student@lib.com',
      password: 'studentpass',
      role: Role.ETUDIANT,
    },
  })

  // 创建文件
  await prisma.file.create({
    data: {
      title: 'Math Notes',
      description: 'Cours de mathématiques',
      path: '/files/math.pdf',
      type: 'PDF',
      status: UploadStatus.EN_ATTENTE,
      userId: student.id,
    },
  })

  // 创建用户请求
  await prisma.request.create({
    data: {
      title: 'Ajouter un livre de physique',
      description: 'Besoin de contenu pour révision',
      status: RequestStatus.EN_ATTENTE,
      userId: student.id,
    },
  })

  console.log('✅ Données de test insérées avec succès.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
