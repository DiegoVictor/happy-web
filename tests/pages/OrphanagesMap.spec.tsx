import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';

import OrphanagesMap from '../../src/pages/OrphanagesMap';

describe('OrphanagesMap page', () => {
  it('should be able to navigate to map page', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <OrphanagesMap />
      </Router>,
    );

    const button = getByTestId('register');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(history.location.pathname).toBe('/register');
  });

  it('should be able to navigate to map page', () => {
    const { container } = render(
      <MemoryRouter>
        <OrphanagesMap />
      </MemoryRouter>,
    );

    const map = container.querySelector('.leaflet-container');
    expect(map).toBeTruthy();
  });
});
