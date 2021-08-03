export interface IPopupData {
  id: string;
  name: string;
  address: string;
  complement: string;
  latitude: number;
  longitude: number;
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
  popupData: Array<IPopupData>;
  location: ILocation;
}

export interface IMapContextData {
  initMap(data: IMap): void;
  setPosition(position: IPosition | null): void;
  setPopupData(deliveries: Array<IPopupData>): void;
  setLocation(data: ILocation): void;
  dataMap: IMap;
}
