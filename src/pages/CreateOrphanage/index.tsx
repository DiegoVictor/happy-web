import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import Sidebar from '../../components/Sidebar';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import mapIcon from '../../utils/mapIcon';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Form,
  InputBlock,
  NewImage,
  ButtonSelect,
  ConfirmButton,
  Button,
  UploadedImages,
} from './styles';

const CreateOrphanage: React.FC = () => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [openOnWeekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [mapError, setMapError] = useState('');

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }, []);

  const handleSelectedImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const selectedImages = Array.from(event.target.files);
        setImages(selectedImages);

        setPreviews(
          selectedImages.map(image => {
            return URL.createObjectURL(image);
          }),
        );
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    async data => {
      try {
        const form = new FormData();

        Object.keys(data).forEach(key => {
          form.append(key, data[key]);
        });
        form.append('open_on_weekends', String(openOnWeekends));

        if (position.latitude && position.longitude) {
          form.append('latitude', String(position.latitude));
          form.append('longitude', String(position.longitude));
        }

        images.forEach(image => {
          form.append('images', image);
        });

        const requiredText = 'Este campo é obrigatório';

        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string()
            .min(3, 'Este campo deve conter no minimo 3 caracteres')
            .required(requiredText),
          latitude: Yup.number().notOneOf([0], 'Marque um ponto no mapa'),
          longitude: Yup.number().notOneOf([0], 'Marque um ponto no mapa'),
          about: Yup.string()
            .min(10, 'Este campo deve conter no minimo 10 caracteres')
            .required(requiredText),
          instructions: Yup.string().min(10).required(requiredText),
          opening_hours: Yup.string()
            .min(10, 'Este campo deve conter no minimo 10 caracteres')
            .required(requiredText),
          whatsapp: Yup.string()
            .min(8, 'Este campo deve conter no minimo 8 caracteres')
            .required(requiredText),
        });

        await schema.validate(
          {
            ...formRef.current?.getData(),
            open_on_weekends: openOnWeekends,
            ...position,
          },
          { abortEarly: false },
        );

        await api.post('/orphanages', form);

        history.push('/app');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errBag = getValidationErrors(err);

          if (errBag.latitude && errBag.longitude) {
            setMapError(errBag.latitude);
          }

          formRef.current?.setErrors(errBag);
        } else {
          toast.error('Ops! Alguma coisa deu errada tente novamente');
        }
      }
    },
    [openOnWeekends, history, images, position],
  );

  return (
    <Container>
      <Sidebar />

      <main>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-22.4432173, -46.8148575]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
              data-testid="map"
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>
            {mapError && <span>{mapError}</span>}

            <InputBlock>
              <label htmlFor="name">Nome</label>
              <Input id="name" name="name" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <Textarea
                id="about"
                name="about"
                maxLength={300}
                data-testid="about"
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor="images">Fotos</label>

              <UploadedImages>
                {previews.map((image, index) => (
                  <img
                    src={image}
                    key={image}
                    alt="Preview"
                    data-testid={`preview_${index}`}
                  />
                ))}
                <NewImage htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </NewImage>
                <input
                  type="file"
                  id="image[]"
                  multiple
                  data-testid="add_image"
                  onChange={handleSelectedImage}
                />
              </UploadedImages>
            </InputBlock>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <InputBlock>
              <label htmlFor="instructions">Instruções</label>
              <Textarea id="instructions" name="instructions" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="opening_hours">Horário de functionamento</label>
              <Input id="opening_hours" name="opening_hours" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="whatsapp">WhatsApp</label>
              <Input id="whatsapp" name="whatsapp" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <ButtonSelect>
                <Button
                  type="button"
                  active={openOnWeekends}
                  onClick={() => setOpenOnWeekends(true)}
                  data-testid="open_on_weekends"
                >
                  Sim
                </Button>
                <Button
                  type="button"
                  active={!openOnWeekends}
                  onClick={() => setOpenOnWeekends(false)}
                  data-testid="not_open_on_weekends"
                >
                  Não
                </Button>
              </ButtonSelect>
            </InputBlock>
          </fieldset>

          <ConfirmButton type="submit" data-testid="submit">
            Confirmar
          </ConfirmButton>
        </Form>
      </main>
    </Container>
  );
};

export default CreateOrphanage;
