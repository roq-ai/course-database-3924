import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { dataImportValidationSchema } from 'validationSchema/data-imports';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.data_import
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDataImportById();
    case 'PUT':
      return updateDataImportById();
    case 'DELETE':
      return deleteDataImportById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDataImportById() {
    const data = await prisma.data_import.findFirst(convertQueryToPrismaUtil(req.query, 'data_import'));
    return res.status(200).json(data);
  }

  async function updateDataImportById() {
    await dataImportValidationSchema.validate(req.body);
    const data = await prisma.data_import.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDataImportById() {
    const data = await prisma.data_import.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
