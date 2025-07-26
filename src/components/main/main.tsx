import { Outlet, useLocation, useNavigate } from 'react-router';
import Pagination from '../Pagination/Pagination';
import type { Character } from '../cardItem/CardItem';
import CardList from '../cardList/CardList';
import { useState } from 'react';

interface MainProps {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  shouldThrow: boolean;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

function Main({
  characters,
  isLoading,
  error,
  shouldThrow,
  currentPage,
  totalPages,
  searchQuery,
}: MainProps) {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isCharacterRoute = location.pathname.includes('/character/');

  const handleClosePanel = () => {
    navigate('/');
    setIsOpenPanel(false);
  };

  const handleMainClick = () => {
    if (isOpenPanel) {
      handleClosePanel();
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`${isCharacterRoute ? 'w-2/3' : 'w-full'} p-5 overflow-y-auto`}
        onClick={handleMainClick}
      >
        <CardList
          characters={characters}
          error={error}
          isLoading={isLoading}
          shouldThrow={shouldThrow}
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
        />
      </div>
      {isCharacterRoute && (
        <div className="fixed inset-y-0 right-0 w-1/3 border-l border-gray-300 shadow-lg z-10 top-22">
          <div className="h-full overflow-y-auto pt-12">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
