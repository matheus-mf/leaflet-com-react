import React, { useCallback, useState } from 'react';

import { MapContext } from './Context';
import { ILocation, IMap, IPopupData, IPosition } from './types';

const initialPosition = { lat: -22.2154042, lng: -54.8331331 };

export const MapProvider: React.FC = ({ children }) => {
  const [popupData, definePopupData] = useState<Array<IPopupData>>([]);
  const [position, definePosition] = useState<IPosition | null>(null);
  const [location, defineLocation] = useState<ILocation>(() => initialPosition);

  const initMap = useCallback((data: IMap) => {
    definePopupData(data.popupData);
    definePosition(data.position);
    defineLocation(data.location);
  }, []);

  const setPosition = useCallback((data: IPosition) => {
    definePosition(data);
  }, []);

  const setPopupData = useCallback((data: Array<IPopupData>) => {
    definePopupData(data);
  }, []);

  const setLocation = useCallback((data: ILocation) => {
    defineLocation(data);
  }, []);

  return (
    <MapContext.Provider
      value={{
        initMap,
        dataMap: { popupData, position, location },
        setPosition,
        setPopupData,
        setLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
