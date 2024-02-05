import { IArtist, NewArtist } from './artist.model';

export const sampleWithRequiredData: IArtist = {
  id: 32055,
  name: 'grimper',
};

export const sampleWithPartialData: IArtist = {
  id: 26562,
  name: 'malade',
};

export const sampleWithFullData: IArtist = {
  id: 6260,
  name: 'chef',
};

export const sampleWithNewData: NewArtist = {
  name: 'pas mal du fait que',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
