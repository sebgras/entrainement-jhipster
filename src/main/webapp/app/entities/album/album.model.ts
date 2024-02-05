import { IArtist } from 'app/entities/artist/artist.model';
import { IGenre } from 'app/entities/genre/genre.model';
import { ITrack } from 'app/entities/track/track.model';

export interface IAlbum {
  id: number;
  name?: string | null;
  artist?: IArtist | null;
  genre?: IGenre | null;
  tracks?: ITrack[] | null;
}

export type NewAlbum = Omit<IAlbum, 'id'> & { id: null };
