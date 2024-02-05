import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGenre } from '../genre.model';
import { GenreService } from '../service/genre.service';

export const genreResolve = (route: ActivatedRouteSnapshot): Observable<null | IGenre> => {
  const id = route.params['id'];
  if (id) {
    return inject(GenreService)
      .find(id)
      .pipe(
        mergeMap((genre: HttpResponse<IGenre>) => {
          if (genre.body) {
            return of(genre.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default genreResolve;
