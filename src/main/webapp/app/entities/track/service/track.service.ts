import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITrack, NewTrack } from '../track.model';

export type PartialUpdateTrack = Partial<ITrack> & Pick<ITrack, 'id'>;

export type EntityResponseType = HttpResponse<ITrack>;
export type EntityArrayResponseType = HttpResponse<ITrack[]>;

@Injectable({ providedIn: 'root' })
export class TrackService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tracks');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(track: NewTrack): Observable<EntityResponseType> {
    return this.http.post<ITrack>(this.resourceUrl, track, { observe: 'response' });
  }

  update(track: ITrack): Observable<EntityResponseType> {
    return this.http.put<ITrack>(`${this.resourceUrl}/${this.getTrackIdentifier(track)}`, track, { observe: 'response' });
  }

  partialUpdate(track: PartialUpdateTrack): Observable<EntityResponseType> {
    return this.http.patch<ITrack>(`${this.resourceUrl}/${this.getTrackIdentifier(track)}`, track, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITrack>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrack[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTrackIdentifier(track: Pick<ITrack, 'id'>): number {
    return track.id;
  }

  compareTrack(o1: Pick<ITrack, 'id'> | null, o2: Pick<ITrack, 'id'> | null): boolean {
    return o1 && o2 ? this.getTrackIdentifier(o1) === this.getTrackIdentifier(o2) : o1 === o2;
  }

  addTrackToCollectionIfMissing<Type extends Pick<ITrack, 'id'>>(
    trackCollection: Type[],
    ...tracksToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tracks: Type[] = tracksToCheck.filter(isPresent);
    if (tracks.length > 0) {
      const trackCollectionIdentifiers = trackCollection.map(trackItem => this.getTrackIdentifier(trackItem)!);
      const tracksToAdd = tracks.filter(trackItem => {
        const trackIdentifier = this.getTrackIdentifier(trackItem);
        if (trackCollectionIdentifiers.includes(trackIdentifier)) {
          return false;
        }
        trackCollectionIdentifiers.push(trackIdentifier);
        return true;
      });
      return [...tracksToAdd, ...trackCollection];
    }
    return trackCollection;
  }
}
