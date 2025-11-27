import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Router, Routes } from 'react-router-dom';

import Landing from '../../src/pages/Landing';

describe('Landing page', () => {
  it('should be able to navigate to map page', () => {
    const pageTitle = 'Orphanages Map Page';
    const { getByTestId, getByText } = render(
      <MemoryRouter
        initialEntries={['/']}
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<div>{pageTitle}</div>} />
        </Routes>
      </MemoryRouter>,
    );

    const button = getByTestId('map');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(getByText(pageTitle)).toBeInTheDocument();
  });
});
