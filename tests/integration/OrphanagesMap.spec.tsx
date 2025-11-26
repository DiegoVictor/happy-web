import React from 'react';
import { fireEvent, render, act, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Router, Routes } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import OrphanagesMap from '../../src/pages/OrphanagesMap';
import factory from '../utils/factory';
import api from '../../src/services/api';

interface Orphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

describe('OrphanagesMap page', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to navigate to map page', async () => {
    apiMock.onGet('/orphanages').reply(200, []);

    const pageTitle = 'Orphanage Create Page';
    const { getByTestId, getByText } = render(
      <MemoryRouter
        initialEntries={['/']}
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <Routes>
          <Route path="/" element={<OrphanagesMap />} />
          <Route path="/orphanages/create" element={<div>{pageTitle}</div>} />
        </Routes>
      </MemoryRouter>,
    );

    const button = getByTestId('register');
    expect(button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    });

    expect(getByText(pageTitle)).toBeInTheDocument();
  });

  it('should be able to navigate to see a map', async () => {
    const orphanages = await factory.attrsMany<Orphanage>('Orphanage', 3);

    apiMock.onGet('/orphanages').reply(200, orphanages);

    const { container, getByText, getByTestId } = render(
      <MemoryRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <OrphanagesMap />
      </MemoryRouter>,
    );

    await waitFor(
      () => container.querySelectorAll('.leaflet-marker-icon').length > 0,
    );

    const map = container.querySelector('.leaflet-container');
    expect(map).toBeInTheDocument();

    const markers = container.querySelectorAll('.leaflet-marker-icon');
    expect(markers.length).toBe(orphanages.length);

    markers.forEach((marker, index) => {
      fireEvent.click(marker);

      expect(getByText(orphanages[index].name)).toBeInTheDocument();
      expect(getByTestId(`orphanages_${orphanages[index].id}`)).toHaveAttribute(
        'href',
        `/orphanages/${orphanages[index].id}`,
      );
    });
  });
});
