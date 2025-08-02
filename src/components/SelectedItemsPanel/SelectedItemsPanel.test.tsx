import { render, screen } from '@testing-library/react';
import SelectedItemsPanel from './SelectedItemsPanel';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../../store/selectedItemsSlice';
import charactersReducer from '../../store/charactersSlice';
import type { Character } from '../cardItem/CardItem';
import { mockCharacters } from '../../tests/mockData';

const createTestStore = (
  selectedIds: number[],
  charactersData: Character[] = []
) => {
  return configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
      characters: charactersReducer,
    },
    preloadedState: {
      selectedItems: {
        selectedCharacters: selectedIds,
      },
      characters: {
        selectedCharactersData: charactersData,
      },
    },
  });
};

describe('SelectedItemsPanel component', () => {
  it('should not render when no items selected', () => {
    const store = createTestStore([]);

    render(
      <Provider store={store}>
        <SelectedItemsPanel />
      </Provider>
    );

    expect(screen.queryByText(/Selected Items/)).not.toBeInTheDocument();
  });

  it('should render with selected items', () => {
    const store = createTestStore(
      [1, 2, 3],
      [mockCharacters[0], mockCharacters[1]]
    );

    const { container } = render(
      <Provider store={store}>
        <SelectedItemsPanel />
      </Provider>
    );

    expect(screen.getByText('Selected Items:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should show action buttons when items selected', () => {
    const store = createTestStore([1], [mockCharacters[0]]);

    render(
      <Provider store={store}>
        <SelectedItemsPanel />
      </Provider>
    );

    expect(screen.getByText('Deselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
});
