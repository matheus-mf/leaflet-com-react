import 'leaflet/dist/leaflet.css';

import React from 'react';

import { TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import mapPin from '../../assets/pin.svg';

import { useMap } from '../../hooks/map';

import { Container } from './styles';

const mapPinIcon = Leaflet.icon({
  iconUrl: mapPin,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const Map: React.FC = () => {
  const { dataMap } = useMap();

  const { markerData, position, location } = dataMap;

  return (
    <Container center={location} zoom={5}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
      />

      {position && (
        <Marker
          icon={mapPinIcon}
          position={[position.latitude, position.longitude]}
        />
      )}

      {markerData.map(data => (
        <CircleMarker
          key={data.id}
          center={[data.latitude, data.longitude]}
          pathOptions={{ color: data.color }}
          radius={data.radius}
        >
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            <div>
              <h3>{data.name}</h3>
              <p>
                {data.address} - {data.complement}
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </Container>
  );
};

export default Map;
