import React, { ChangeEvent, useCallback, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import { LeafletMouseEvent } from 'leaflet';

import Sidebar from '../../components/Sidebar';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import mapIcon from '../../utils/mapIcon';
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
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

const CreateOrphanage: React.FC = () => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [openOnWeekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

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

        await api.post('orphanages', form);

        history.push('/app');
      } catch (err) {
        console.log(err);
      }
    },
    [openOnWeekends, history, images, position],
  );

  return (
    <Container>
      <Sidebar />

      <main>
        <Form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-22.4432173, -46.8148575]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
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

            <InputBlock>
              <label htmlFor="name">Nome</label>
              <Input id="name" name="name" />
            </InputBlock>

            <InputBlock>
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <Textarea id="about" name="about" maxLength={300} />
            </InputBlock>

            <InputBlock>
              <label htmlFor="images">Fotos</label>

              <UploadedImages>
                {previews.map(image => (
                  <img src={image} key={image} alt="Preview" />
                ))}
                <NewImage htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </NewImage>
                <input
                  type="file"
                  id="image[]"
                  multiple
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
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <ButtonSelect>
                <Button
                  type="button"
                  active={openOnWeekends}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </Button>
                <Button
                  type="button"
                  active={!openOnWeekends}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </Button>
              </ButtonSelect>
            </InputBlock>
          </fieldset>

          <ConfirmButton type="submit">Confirmar</ConfirmButton>
        </Form>
      </main>
    </Container>
  );
};

export default CreateOrphanage;
