import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { clearAllSelected } from '../../store/selectedItemsSlice';

function SelectedItemsPanel() {
  const dispatch = useDispatch();
  const selectedItemsCount = useSelector(
    (state: RootState) => state.selectedItems.selectedCharacters.length
  );

  if (selectedItemsCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-2 left-1/2 flex flex-col items-center transform -translate-x-1/2 bg-white p-4  max-w-screen-md">
      <h3 className="font-bold text-purple-600">
        Selected Items:{' '}
        <span className="text-gray-700">{selectedItemsCount}</span>
      </h3>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => dispatch(clearAllSelected())}
          className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 cursor-pointer"
        >
          Deselect all
        </button>
        <button className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 cursor-pointer">
          Download
        </button>
      </div>
    </div>
  );
}

export default SelectedItemsPanel;
