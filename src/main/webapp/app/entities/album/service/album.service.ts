import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAlbum, NewAlbum } from '../album.model';

export type PartialUpdateAlbum = Partial<IAlbum> & Pick<IAlbum, 'id'>;

export type EntityResponseType = HttpResponse<IAlbum>;
export type EntityArrayResponseType = HttpResponse<IAlbum[]>;

@Injectable({ providedIn: 'root' })
export class AlbumService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/albums');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(album: NewAlbum): Observable<EntityResponseType> {
    return this.http.post<IAlbum>(this.resourceUrl, album, { observe: 'response' });
  }

  update(album: IAlbum): Observable<EntityResponseType> {
    return this.http.put<IAlbum>(`${this.resourceUrl}/${this.getAlbumIdentifier(album)}`, album, { observe: 'response' });
  }

  partialUpdate(album: PartialUpdateAlbum): Observable<EntityResponseType> {
    return this.http.patch<IAlbum>(`${this.resourceUrl}/${this.getAlbumIdentifier(album)}`, album, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlbum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlbum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAlbumIdentifier(album: Pick<IAlbum, 'id'>): number {
    return album.id;
  }

  compareAlbum(o1: Pick<IAlbum, 'id'> | null, o2: Pick<IAlbum, 'id'> | null): boolean {
    return o1 && o2 ? this.getAlbumIdentifier(o1) === this.getAlbumIdentifier(o2) : o1 === o2;
  }

  addAlbumToCollectionIfMissing<Type extends Pick<IAlbum, 'id'>>(
    albumCollection: Type[],
    ...albumsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const albums: Type[] = albumsToCheck.filter(isPresent);
    if (albums.length > 0) {
      const albumCollectionIdentifiers = albumCollection.map(albumItem => this.getAlbumIdentifier(albumItem)!);
      const albumsToAdd = albums.filter(albumItem => {
        const albumIdentifier = this.getAlbumIdentifier(albumItem);
        if (albumCollectionIdentifiers.includes(albumIdentifier)) {
          return false;
        }
        albumCollectionIdentifiers.push(albumIdentifier);
        return true;
      });
      return [...albumsToAdd, ...albumCollection];
    }
    return albumCollection;
  }
}
