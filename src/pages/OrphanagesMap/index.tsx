import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import MapMarkerImg from '../../images/map-marker.svg';
import { Container, MapContainer, AddOrphanage } from './styles';

const OrphanagesMap: React.FC = () => {
  return (
    <Container>
      <aside>
        <header>
          <img src={MapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Mogi Mirim</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <MapContainer>
        <Map center={[-22.4302444, -46.9707956]} zoom={15}>
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </Map>
      </MapContainer>

      <AddOrphanage to="/register" data-testid="register">
        <FiPlus size={32} color="#FFF" />
      </AddOrphanage>
    </Container>
  );
};

export default OrphanagesMap;
