import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import Orphanage from '../../src/pages/Orphanage';
import factory from '../utils/factory';
import api from '../../src/services/api';
import { useNavigate } from 'react-router-dom';

interface IOrphanage {
  id?: string;
  name: string;
  about: string;
  latitude: number;
  longitude: number;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  whatsapp: string;
  images: {
    id: string;
    path: string;
  }[];
}

const mockUseParams = jest.fn();
const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    useParams: () => mockUseParams(),
    useNavigate: () => mockUseNavigate(),
  };
});

describe('Orphanage', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to see orphanage data', async () => {
    const orphanage = await factory.attrs<IOrphanage>('Orphanage', {
      open_on_weekends: true,
    });

    apiMock.onGet(`/orphanages/${orphanage.id}`).reply(200, orphanage);

    mockUseParams.mockReturnValue({ id: orphanage.id });

    const { getByText, getByTestId, container } = render(<Orphanage />);

    await waitFor(() => getByText(orphanage.name));

    expect(getByText(orphanage.name)).toBeInTheDocument();
    expect(getByText(orphanage.about)).toBeInTheDocument();
    expect(getByText(orphanage.instructions)).toBeInTheDocument();
    expect(getByTestId('opening_hours')).toHaveTextContent(
      'Segunda à Sexta ' + orphanage.opening_hours,
    );
    expect(getByTestId('whatsapp')).toHaveAttribute(
      'href',
      `https://api.whatsapp.com/send?phone=${orphanage.whatsapp}&text=Ol%C3%A1,%20gostaria%20de%20visitar%20a%20institui%C3%A7%C3%A3o!`,
    );

    expect(getByText('Atendemos fim de semana')).toBeInTheDocument();

    orphanage.images.forEach(image => {
      expect(getByTestId(`images_${image.id}`)).toHaveAttribute(
        'src',
        image.path,
      );
    });

    expect(container.querySelector('.leaflet-marker-icon')).toBeInTheDocument();

    const image = orphanage.images.shift();
    expect(getByTestId('principal_image')).toHaveAttribute('src', image?.path);

    const thumbnail = orphanage.images.pop();
    fireEvent.click(getByTestId(`images_button_${thumbnail?.id}`));
    expect(getByTestId('principal_image')).toHaveAttribute(
      'src',
      thumbnail?.path,
    );
  });

  it('should be able to see orphanage that not open on weekends data', async () => {
    const orphanage = await factory.attrs<IOrphanage>('Orphanage', {
      open_on_weekends: false,
    });

    apiMock.onGet(`/orphanages/${orphanage.id}`).reply(200, orphanage);

    mockUseParams.mockReturnValue({ id: orphanage.id });

    const { getByText, getByTestId, container } = render(<Orphanage />);

    await waitFor(() => getByText(orphanage.name));

    expect(getByText('Não atendemos fim de semana')).toBeInTheDocument();

    orphanage.images.forEach(image => {
      expect(getByTestId(`images_${image.id}`)).toHaveAttribute(
        'src',
        image.path,
      );
    });

    expect(container.querySelector('.leaflet-marker-icon')).toBeInTheDocument();

    const image = orphanage.images.shift();
    expect(getByTestId('principal_image')).toHaveAttribute('src', image?.path);

    const thumbnail = orphanage.images.pop();
    fireEvent.click(getByTestId(`images_button_${thumbnail?.id}`));
    expect(getByTestId('principal_image')).toHaveAttribute(
      'src',
      thumbnail?.path,
    );
  });
});
