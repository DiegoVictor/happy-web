import React from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';

import MapMarkerImg from '../../images/map-marker.svg';
import mapIcon from '../../utils/mapIcon';
import { Container, MapContainer, AddOrphanage, Popup } from './styles';

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
          <Marker position={[-22.4302444, -46.9707956]} icon={mapIcon}>
            <Popup closeButton={false} maxWidth={240} minWidth={240}>
              Lar das meninas
              <Link to="/orphanages/1">
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        </Map>
      </MapContainer>

      <AddOrphanage to="/orphanages/create" data-testid="register">
        <FiPlus size={32} color="#FFF" />
      </AddOrphanage>
    </Container>
  );
};

export default OrphanagesMap;
