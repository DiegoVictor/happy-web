import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

import MapMarkerImg from '../../images/map-marker.svg';
import api from '../../services/api';
import mapIcon from '../../utils/mapIcon';
import { Container, MapContainer, AddOrphanage } from './styles';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get<Orphanage[]>('/orphanages');

      setOrphanages(data);
    })();
  }, []);

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
        <Map center={[-22.4432173, -46.8148575]} zoom={15}>
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {orphanages.map(orphanage => (
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
            >
              <Popup closeButton={false} maxWidth={240} minWidth={240}>
                {orphanage.name}
                <Link
                  to={`/orphanages/${orphanage.id}`}
                  data-testid={`orphanages_${orphanage.id}`}
                >
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          ))}
        </Map>
      </MapContainer>

      <AddOrphanage to="/orphanages/create" data-testid="register">
        <FiPlus size={32} color="#FFF" />
      </AddOrphanage>
    </Container>
  );
};

export default OrphanagesMap;
