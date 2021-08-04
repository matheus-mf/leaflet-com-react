import React, { useState, FormEvent, useCallback } from 'react';
import { v4 as uuidV4 } from 'uuid';

import AsyncSelect from 'react-select/async';

import { fetchLocalMapBox } from '../../services/apiMapBox';

import { useMap } from '../../hooks/map';

import { Container } from './styles';

const Form: React.FC = () => {
  const { dataMap, setMarkerData, setPosition, setLocation } = useMap();

  const { markerData, location } = dataMap;

  const [name, setName] = useState('');
  const [complement, setComplement] = useState('');
  const [address, setAddress] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [color, setColor] = useState('#ff0000');
  const [radius, setRadius] = useState(20);

  const loadOptions = useCallback(
    async (inputValue: string, callback: (options: any) => void) => {
      const response = await fetchLocalMapBox(inputValue);
      const places: any = [];
      if (inputValue.length < 5) return [];
      response.features.forEach((item: any) => {
        places.push({
          label: item.place_name,
          value: item.place_name,
          coords: item.center,
          place: item.place_name,
        });
      });

      callback(places);

      return places;
    },
    [],
  );

  const handleChangeSelect = useCallback(
    (event: any) => {
      setPosition({
        longitude: event.coords[0],
        latitude: event.coords[1],
      });

      setAddress({ label: event.place, value: event.place });

      setLocation({
        lng: event.coords[0],
        lat: event.coords[1],
      });
    },
    [setPosition, setLocation],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (!address || !name) return;

      setMarkerData([
        ...markerData,
        {
          id: uuidV4(),
          name,
          address: address?.value || '',
          complement,
          latitude: location.lat,
          longitude: location.lng,
          color,
          radius,
        },
      ]);

      setName('');
      setAddress(null);
      setComplement('');
      setPosition(null);
    },
    [
      setMarkerData,
      markerData,
      name,
      address,
      complement,
      location,
      setPosition,
      color,
      radius,
    ],
  );

  return (
    <Container onSubmit={handleSubmit}>
      <fieldset>
        <legend>Entregas</legend>

        <div>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="address">Endereço</label>

          <AsyncSelect
            id="address"
            placeholder="Digite seu endereço..."
            classNamePrefix="filter"
            cacheOptions
            loadOptions={loadOptions}
            onChange={handleChangeSelect}
            value={address}
          />
        </div>

        <div>
          <label htmlFor="complement">Complemento</label>
          <input
            placeholder="Apto / Nr / Casa..."
            id="complement"
            value={complement}
            onChange={event => setComplement(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="color">Cor</label>
          <input
            id="color"
            type="color"
            value={color}
            onChange={event => setColor(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="radius">Raio do círculo</label>
          <input
            id="radius"
            type="number"
            value={radius}
            min="1"
            onChange={event => setRadius(Number(event.target.value))}
          />
        </div>
      </fieldset>

      <button type="submit">Confirmar</button>
    </Container>
  );
};

export default Form;
