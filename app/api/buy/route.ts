import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '../../../lib/auth-server';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const achats = await prisma.achat.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(achats);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const body = await req.json();
    const achat = await prisma.achat.create({
      data: {
        nom: body.nom,
        description: body.description,
        userId: session.user.id,
      },
    });
    return NextResponse.json(achat);
  } catch (error) {
    console.error('Erreur création tâche:', error);
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
    await prisma.achat.delete({
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