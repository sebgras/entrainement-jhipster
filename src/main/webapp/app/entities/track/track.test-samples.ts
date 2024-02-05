import { ITrack, NewTrack } from './track.model';

export const sampleWithRequiredData: ITrack = {
  id: 25386,
  name: "à l'encontre de",
};

export const sampleWithPartialData: ITrack = {
  id: 8359,
  name: 'payer sympathique',
};

export const sampleWithFullData: ITrack = {
  id: 26660,
  name: 'équipe de recherche',
};

export const sampleWithNewData: NewTrack = {
  name: 'chef de cuisine',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
