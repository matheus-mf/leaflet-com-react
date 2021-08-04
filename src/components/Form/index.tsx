import React, { useState, FormEvent, useCallback } from 'react';
import { v4 as uuidV4 } from 'uuid';

import AsyncSelect from 'react-select/async';

import { fetchLocalMapBox } from '../../services/apiMapBox';

import { useMap } from '../../hooks/map';

import { Container } from './styles';

const Form: React.FC = () => {
  const { dataMap, setPopupData, setPosition, setLocation } = useMap();

  const { popupData, location } = dataMap;

  const [name, setName] = useState('');
  const [complement, setComplement] = useState('');
  const [address, setAddress] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const loadOptions = useCallback(
    async (inputValue: string, callback: (options: any) => void) => {
      const response = await fetchLocalMapBox(inputValue);
      const places: any = [];
      if (inputValue.length < 5) return;
      response.features.forEach((item: any) => {
        places.push({
          label: item.place_name,
          value: item.place_name,
          coords: item.center,
          place: item.place_name,
        });
      });

      callback(places);
      // eslint-disable-next-line consistent-return
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

      setPopupData([
        ...popupData,
        {
          id: uuidV4(),
          name,
          address: address?.value || '',
          complement,
          latitude: location.lat,
          longitude: location.lng,
        },
      ]);

      setName('');
      setAddress(null);
      setComplement('');
      setPosition(null);
    },
    [setPopupData, popupData, name, address, complement, location, setPosition],
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
      </fieldset>

      <button type="submit">Confirmar</button>
    </Container>
  );
};

export default Form;
