import { IGenre, NewGenre } from './genre.model';

export const sampleWithRequiredData: IGenre = {
  id: 23171,
  name: 'par rapport à assez timide',
};

export const sampleWithPartialData: IGenre = {
  id: 23651,
  name: 'devant au-dehors avant que',
};

export const sampleWithFullData: IGenre = {
  id: 18260,
  name: 'brusque',
};

export const sampleWithNewData: NewGenre = {
  name: 'toc-toc maigre avex',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
