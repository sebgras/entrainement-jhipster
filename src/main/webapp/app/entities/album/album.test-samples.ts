import { IAlbum, NewAlbum } from './album.model';

export const sampleWithRequiredData: IAlbum = {
  id: 14307,
  name: 'apaiser',
};

export const sampleWithPartialData: IAlbum = {
  id: 1372,
  name: 'insuffisamment',
};

export const sampleWithFullData: IAlbum = {
  id: 5609,
  name: 'd’autant que sympathique puisque',
};

export const sampleWithNewData: NewAlbum = {
  name: 'avant d’autant que',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
