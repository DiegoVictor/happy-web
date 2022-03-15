import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Landing from '../../src/pages/Landing';

describe('Landing page', () => {
  it('should be able to navigate to map page', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <Landing />
      </Router>,
    );

    const button = getByTestId('map');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(history.location.pathname).toBe('/app');
  });
});
