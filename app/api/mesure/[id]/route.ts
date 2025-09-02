import { NextResponse } from 'next/server';
import { getSession } from '../../../../lib/auth-server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    await prisma.mesure.delete({
      where: {
        id: params.id
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in DELETE /api/mesure/[id]:", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}
