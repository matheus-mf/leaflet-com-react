import React from 'react';

import Form from '../../components/Form';
import Map from '../../components/Map';

import { MapProvider } from '../../hooks/map';

import { Container } from './styles';

const Home: React.FC = () => (
  <Container>
    <MapProvider>
      <main>
        <Form />
      </main>
      <Map />
    </MapProvider>
  </Container>
);

export default Home;
