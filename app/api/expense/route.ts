import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '../../../lib/auth-server';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const depenses = await prisma.depense.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(depenses);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const body = await req.json();
    const depense = await prisma.depense.create({
      data: {
        nom: body.nom,
        montant: body.montant,
        categorie: body.categorie,
        userId: session.user.id,
      },
    });
    return NextResponse.json(depense);
  } catch (error) {
    console.error('Erreur création dépense:', error);
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
    await prisma.depense.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression dépense:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}