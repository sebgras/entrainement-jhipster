import { IAlbum } from 'app/entities/album/album.model';

export interface IArtist {
  id: number;
  name?: string | null;
  album?: IAlbum | null;
}

export type NewArtist = Omit<IArtist, 'id'> & { id: null };
