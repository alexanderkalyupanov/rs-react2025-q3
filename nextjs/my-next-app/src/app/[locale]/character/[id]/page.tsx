import CharacterDetails from '@/components/CharacterDetails/CharacterDetails';

export default function CharacterPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  return <CharacterDetails id={params.id} />;
}