import { createContext } from 'react';

import { IMapContextData } from './types';

export const MapContext = createContext<IMapContextData>({} as IMapContextData);
