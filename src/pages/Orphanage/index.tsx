import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import mapIcon from '../../utils/mapIcon';
import {
  Container,
  Details,
  Images,
  ImageButton,
  Content,
  MapContainer,
  OpenDetails,
  Hour,
  Weekends,
  ContactButton,
} from './styles';

interface Orphanage {
  name: string;
  about: string;
  latitude: number;
  longitude: number;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    id: string;
    path: string;
  }[];
}

interface Params {
  id: string;
}

const Orphanage: React.FC = () => {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const params = useParams<Params>();

  useEffect(() => {
    (async () => {
      const { data } = await api.get<Orphanage>(`/orphanages/${params.id}`);

      setOrphanage(data);
    })();
  }, [params.id]);

  return (
    <Container>
      <Sidebar />

      {orphanage ? (
        <main>
          <Details>
            <img
              src={orphanage.images[activeImageIndex].path}
              alt={orphanage.name}
            />

            <Images>
              {orphanage.images.map((image, index) => (
                <ImageButton
                  key={image.id}
                  active={index === activeImageIndex}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.path} alt={orphanage.name} />
                </ImageButton>
              ))}
            </Images>

            <Content>
              <h1>{orphanage.name}</h1>
              <p>{orphanage.about}</p>

              <MapContainer>
                <Map
                  center={[orphanage.latitude, orphanage.longitude]}
                  zoom={16}
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[orphanage.latitude, orphanage.longitude]}
                  />
                </Map>

                <footer>
                  <a
                    href={`//www.google.com.br/maps/place/${orphanage.latitude},${orphanage.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver rotas no Google Maps
                  </a>
                </footer>
              </MapContainer>

              <hr />

              <h2>Instruções para visita</h2>
              <p>{orphanage.instructions}</p>

              <OpenDetails>
                <Hour>
                  <FiClock size={32} color="#15B6D6" />
                  Segunda à Sexta <br />
                  {orphanage.opening_hours}
                </Hour>
                {orphanage.open_on_weekends ? (
                  <Weekends>
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </Weekends>
                ) : (
                  <Weekends closed={true}>
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos <br />
                    fim de semana
                  </Weekends>
                )}
              </OpenDetails>

              <ContactButton type="button">
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
              </ContactButton>
            </Content>
          </Details>
        </main>
      ) : (
        <p>Carregando</p>
      )}
    </Container>
  );
};

export default Orphanage;
