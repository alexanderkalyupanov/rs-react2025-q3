import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { clearAllSelected } from '../../store/selectedItemsSlice';
import { useCallback, useRef } from 'react';
import { clearAllSelectedCharactersData } from '../../store/charactersSlice';

function SelectedItemsPanel() {
  const downloandLink = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: RootState) => state.selectedItems.selectedCharacters
  );
  const selectedCharacters = useSelector(
    (state: RootState) => state.characters.selectedCharactersData
  );

  const handleDownload = useCallback(() => {
    if (selectedIds.length === 0) return;
    const headers = 'Name,Species,Gender,Status,Origin\n';
    const csvRows = selectedCharacters.map(
      (character) =>
        `"${character.name.replace(/"/g, '""')}","${character.species}","${character.gender}","${character.status}","${character.origin.name}"`
    );
    const csvContent = headers + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if (downloandLink.current) {
      downloandLink.current.href = url;
      downloandLink.current.download = `${selectedIds.length}_characters.csv`;
      downloandLink.current.click();

      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  }, [selectedCharacters, selectedIds.length]);

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-2 left-1/2 flex flex-col items-center transform -translate-x-1/2 bg-white p-4  max-w-screen-md">
      <h3 className="font-bold text-purple-600">
        Selected Items:{' '}
        <span className="text-gray-700">{selectedIds.length}</span>
      </h3>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => {
            dispatch(clearAllSelectedCharactersData());
            dispatch(clearAllSelected());
          }}
          className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 cursor-pointer"
        >
          Deselect all
        </button>
        <a ref={downloandLink} style={{ display: 'none' }} aria-hidden="true" />
        <button
          onClick={handleDownload}
          className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 cursor-pointer"
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default SelectedItemsPanel;
