// NextApiRequest NextApiResponse
// it's object request et response de nextjs API pour resondre le request de HTTP 
// req est le donnes de request(frondend ), res est le donees de response
import { NextApiRequest, NextApiResponse } from "next";
// PrismaClient est le client de Prisma(ORM)
import { PrismaClient, UploadStatus } from "@prisma/client"; // UploadStatus
// creer 创建 prisma 数据库客户端实例，让代码可以操作数据库。
const prisma = new PrismaClient();
// function handler pour arranger le request de HTTP
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { fileId, adminId, action, reason } = req.body; // ✅ `reason` 存储拒绝原因（comment 字段）

        // 检查管理员身份
        const admin = await prisma.user.findUnique({
            where: { id: adminId }
        });

        if (!admin || (admin.role !== "BIBLIOTHECAIRE" && admin.role !== "ADMINISTRATEUR")) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // 确保 `fileId` 关联的文件存在
        const file = await prisma.file.findUnique({
            where: { id: fileId }
        });

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // 处理审核状态
        let updateData: any = { status: UploadStatus.ACCEPTEE }; // ✅ 默认为 `ACCEPTEE`（审核通过）

        if (action === "REJECTED") {
            updateData = { status: UploadStatus.REJETEE, comment: reason }; // ✅ 存储拒绝原因
        }

        // 更新文件状态
        await prisma.file.update({
            where: { id: fileId },
            data: updateData
        });

        return res.status(200).json({ message: `File ${action.toLowerCase()} successfully.` });

    } catch (error) {
        console.error("Error updating file status:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}
