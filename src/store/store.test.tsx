import { describe, it, expect } from 'vitest';
import { store } from './store';
import {
  toggleCharacterSelected,
  clearAllSelected,
} from './selectedItemsSlice';

describe('Redux Store', () => {
  it('should initialize with correct state structure', () => {
    const state = store.getState();
    expect(state.selectedItems).toEqual({ selectedCharacters: [] });
    expect(state.characters).toEqual({ selectedCharactersData: [] });

    expect(state).toHaveProperty('rickmortyApi');
  });

  it('should handle selectedItems actions', () => {
    store.dispatch(toggleCharacterSelected(1));
    let state = store.getState();
    expect(state.selectedItems.selectedCharacters).toEqual([1]);

    store.dispatch(toggleCharacterSelected(1));
    state = store.getState();
    expect(state.selectedItems.selectedCharacters).toEqual([]);

    store.dispatch(toggleCharacterSelected(1));
    store.dispatch(toggleCharacterSelected(2));
    store.dispatch(clearAllSelected());
    state = store.getState();
    expect(state.selectedItems.selectedCharacters).toEqual([]);
  });
});
