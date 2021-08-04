export interface IMarkerData {
  id: string;
  name: string;
  address: string;
  complement: string;
  latitude: number;
  longitude: number;
  color: string;
  radius: number;
}

export type IPosition = {
  longitude: number;
  latitude: number;
};

export type ILocation = {
  lat: number;
  lng: number;
};

export interface IMap {
  position: IPosition | null;
  markerData: Array<IMarkerData>;
  location: ILocation;
}

export interface IMapContextData {
  initMap(data: IMap): void;
  setPosition(position: IPosition | null): void;
  setMarkerData(deliveries: Array<IMarkerData>): void;
  setLocation(data: ILocation): void;
  dataMap: IMap;
}
