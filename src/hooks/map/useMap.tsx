import { useContext } from 'react';

import { MapContext } from './Context';
import { IMapContextData } from './types';

// useMap
export function useMap(): IMapContextData {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error('useMap must be used within a MapContext');
  }

  return context;
}
