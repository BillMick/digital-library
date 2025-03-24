import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  // const body = JSON.parse(req.body);
  console.log(await req.json());
  
  // const { fileId, userId, isDownloadable, isAccessible } = await req.json; // Assuming fileId and userId are passed in the request body

  // if (!fileId || !userId) {
  //   console.log(fileId, userId);
  //   console.log(req.json());
  //   return res.status(400).json({ error: 'Missing fileId or userId' });
  // }

  // try {
  //   // 1. Find the user making the request (ensure they are an admin)
  //   const user = await prisma.user.findUnique({
  //     where: { id: userId },
  //   });

  //   if (!user || (user.role != 'ADMINISTRATEUR' && user.role != 'BIBLIOTHECAIRE')) {
  //     return res.status(403).json({ error: 'Unauthorized: Admins only' });
  //   }

  //   // 2. Find the file that needs validation
  //   const file = await prisma.file.findUnique({
  //     where: { id: fileId },
  //   });

  //   if (!file) {
  //     return res.status(404).json({ error: 'File not found' });
  //   }

  //   // 3. Check the file's current status (only files in "EN_ATTENTE" can be validated)
  //   if (file.status != 'EN_ATTENTE') {
  //     return res.status(400).json({ error: 'File cannot be validated as it is not in "EN_ATTENTE" status' });
  //   }

  //   // 4. Prepare the data to update, including optional fields
  //   const updateData: any = {
  //     status: 'ACCEPTEE', // We always update the status to ACCEPTED
  //   };

  //   // Optionally update isDownloadable and isAccessible if provided in the request body
  //   if (isDownloadable !== undefined) {
  //     updateData.isDownloadable = isDownloadable;
  //   }

  //   if (isAccessible !== undefined) {
  //     updateData.isAccessible = isAccessible;
  //   }

  //   // 4. Update the file status to "ACCEPTEE" (validated)
  //   const updatedFile = await prisma.file.update({
  //     where: { id: fileId },
  //     data: updateData,
  //   });

  //   // 5. Return the updated file data (you can choose to return only certain fields if needed)
  //   return res.status(200).json({ message: 'File validated successfully', file: updatedFile });

  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ error: 'Internal server error', details: error });
  // }
}
