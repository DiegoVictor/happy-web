import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
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
    const history = createMemoryHistory({
      initialEntries: ['/'],
    });
    apiMock.onGet('/orphanages').reply(200, []);

    const { getByTestId } = render(
      <Router location={history.location} navigator={history}>
        <OrphanagesMap />
      </Router>,
    );

    const button = getByTestId('register');
    expect(button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    });

    expect(history.location.pathname).toBe('/orphanages/create');
  });

  it('should be able to navigate see a map', async () => {
    const orphanages = await factory.attrsMany<Orphanage>('Orphanage', 3);

    apiMock.onGet('/orphanages').reply(200, orphanages);

    let container;
    let getByText;
    let getByTestId;
    await act(async () => {
      const component = render(
        <MemoryRouter>
          <OrphanagesMap />
        </MemoryRouter>,
      );
      container = component.container;
      getByText = component.getByText;
      getByTestId = component.getByTestId;
    });

    const map = container.querySelector('.leaflet-container');
    expect(map).toBeTruthy();

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
