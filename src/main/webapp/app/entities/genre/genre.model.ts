import { IAlbum } from 'app/entities/album/album.model';

export interface IGenre {
  id: number;
  name?: string | null;
  album?: IAlbum | null;
}

export type NewGenre = Omit<IGenre, 'id'> & { id: null };
