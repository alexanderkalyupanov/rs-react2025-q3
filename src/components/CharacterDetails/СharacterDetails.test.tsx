import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import * as api from '../../services/service';
import CharacterDetails from './СharacterDetails';
import '@testing-library/jest-dom/vitest';

vi.mock('../../services/service', () => ({
  fetchCharacterById: vi.fn(),
}));

describe('CharacterDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('show spinner', () => {
    vi.mocked(api.fetchCharacterById).mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <MemoryRouter initialEntries={['/characters/1']}>
        <Routes>
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
