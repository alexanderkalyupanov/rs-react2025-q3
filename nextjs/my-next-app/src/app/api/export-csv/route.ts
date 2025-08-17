import { Character } from '@/components/cardItem/CardItem';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { selectedCharacters } = await request.json();

  if (!selectedCharacters?.length) {
    return NextResponse.json(
      { error: 'No characters selected' },
      { status: 400 }
    );
  }

  const headers = 'Name,Species,Gender,Status,Origin\n';
  const csvRows = selectedCharacters.map(
    (character: Character) =>
      `"${character.name.replace(/"/g, '""')}","${character.species}","${character.gender}","${character.status}","${character.origin.name}"`
  );
  const csvContent = headers + csvRows.join('\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=${selectedCharacters.length}_characters.csv`,
    },
  });
}
