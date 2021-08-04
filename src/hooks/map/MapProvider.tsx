import React, { useCallback, useState } from 'react';

import { MapContext } from './Context';
import { ILocation, IMap, IMarkerData, IPosition } from './types';

const initialPosition = { lat: -14.4139, lng: -52.4428 };

export const MapProvider: React.FC = ({ children }) => {
  const [markerData, definePopupData] = useState<Array<IMarkerData>>([]);
  const [position, definePosition] = useState<IPosition | null>(null);
  const [location, defineLocation] = useState<ILocation>(() => initialPosition);

  const initMap = useCallback((data: IMap) => {
    definePopupData(data.markerData);
    definePosition(data.position);
    defineLocation(data.location);
  }, []);

  const setPosition = useCallback((data: IPosition) => {
    definePosition(data);
  }, []);

  const setMarkerData = useCallback((data: Array<IMarkerData>) => {
    definePopupData(data);
  }, []);

  const setLocation = useCallback((data: ILocation) => {
    defineLocation(data);
  }, []);

  return (
    <MapContext.Provider
      value={{
        initMap,
        dataMap: { markerData, position, location },
        setPosition,
        setMarkerData,
        setLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
