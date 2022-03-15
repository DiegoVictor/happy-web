import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';
import { toast } from 'react-toastify';

import CreateOrphanage from '../../src/pages/CreateOrphanage';
import factory from '../utils/factory';
import api from '../../src/services/api';
import { useNavigate } from 'react-router-dom';

interface Orphanage {
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  whatsapp: string;
}

const navigate = jest.fn((_: string) => {});
(useNavigate as jest.Mock).mockImplementation(() => navigate);
jest.mock('react-router-dom');

jest.mock('react-toastify');

const imageUrl = faker.image.imageUrl();
global.URL.createObjectURL = jest.fn(() => {
  return imageUrl;
});

describe('CreateOrphanage', () => {
  const apiMock = new MockAdapter(api);

  it('should not be able to create an orphanage', async () => {
    const orphanage = await factory.attrs<Orphanage>('Orphanage');

    apiMock.onPost('/orphanages').reply(404, {});

    const { getByTestId, getByLabelText, container } = render(
      <CreateOrphanage />,
    );

    await act(async () => {
      fireEvent.change(getByLabelText('Nome'), {
        target: { value: orphanage.name },
      });
      fireEvent.change(getByTestId('about'), {
        target: { value: orphanage.about },
      });
      fireEvent.change(getByLabelText('Instruções'), {
        target: { value: orphanage.instructions },
      });
      fireEvent.change(getByLabelText('Horário de functionamento'), {
        target: { value: orphanage.opening_hours },
      });
      fireEvent.change(getByLabelText('WhatsApp'), {
        target: { value: orphanage.whatsapp },
      });
      fireEvent.change(getByTestId('add_image'), {
        target: {},
      });

      fireEvent.click(container.querySelector('.leaflet-container'));
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(navigate).not.toHaveBeenCalledWith('/app');
    expect(global.URL.createObjectURL).not.toHaveBeenCalledWith(new Blob());
    expect(toast.error).toHaveBeenCalledWith(
      'Ops! Alguma coisa deu errada tente novamente',
    );
  });

  it('should be able to create an orphanage', async () => {
    const orphanage = await factory.attrs<Orphanage>('Orphanage');
    apiMock.onPost('/orphanages').reply(200);

    const { getByTestId, getByLabelText, container } = render(
      <CreateOrphanage />,
    );

    await act(async () => {
      fireEvent.change(getByLabelText('Nome'), {
        target: { value: orphanage.name },
      });
      fireEvent.change(getByTestId('about'), {
        target: { value: orphanage.about },
      });
      fireEvent.change(getByLabelText('Instruções'), {
        target: { value: orphanage.instructions },
      });
      fireEvent.change(getByLabelText('Horário de functionamento'), {
        target: { value: orphanage.opening_hours },
      });
      fireEvent.change(getByLabelText('WhatsApp'), {
        target: { value: orphanage.whatsapp },
      });

      fireEvent.click(container.querySelector('.leaflet-container'));
      fireEvent.click(getByTestId('open_on_weekends'));
      fireEvent.click(getByTestId('not_open_on_weekends'));
      fireEvent.change(getByTestId('add_image'), {
        target: {
          files: [new Blob(['image'])],
        },
      });
    });

    expect(getByTestId('preview_0')).toHaveAttribute('src', imageUrl);

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(navigate).toHaveBeenCalledWith('/app');
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(new Blob());
  });

  it('should not be able to create an orphanage with invalid data', async () => {
    apiMock.onPost('/orphanages').reply(200);

    const { getByTestId, getAllByText, getByText } = render(
      <CreateOrphanage />,
    );

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(navigate).toHaveBeenCalledWith('/app');
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(new Blob());

    expect(getAllByText('Este campo é obrigatório').length).toBe(5);
    expect(getByText('Marque um ponto no mapa')).toBeInTheDocument();
  });
});
