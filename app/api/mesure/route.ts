import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '../../../lib/auth-server';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const mesures = await prisma.mesure.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(mesures);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const body = await req.json();
    const mesure = await prisma.mesure.create({
      data: {
        nom: body.nom,
        unite: body.unite,
        userId: session.user.id,
      },
    });
    return NextResponse.json(mesure);
  } catch (error) {
    console.error('Erreur création mesure:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const { id } = await req.json();
    await prisma.mesure.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression tâche:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}