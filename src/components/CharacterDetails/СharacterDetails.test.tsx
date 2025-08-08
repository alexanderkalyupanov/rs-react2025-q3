import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import '@testing-library/jest-dom/vitest';
import CharacterDetails from './СharacterDetails';

describe('CharacterDetails', () => {
  it('should show spinner when loading', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/characters/1']}>
          <Routes>
            <Route path="/characters/:id" element={<CharacterDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
