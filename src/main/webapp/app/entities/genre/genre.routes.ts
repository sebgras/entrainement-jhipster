import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { GenreComponent } from './list/genre.component';
import { GenreDetailComponent } from './detail/genre-detail.component';
import { GenreUpdateComponent } from './update/genre-update.component';
import GenreResolve from './route/genre-routing-resolve.service';

const genreRoute: Routes = [
  {
    path: '',
    component: GenreComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GenreDetailComponent,
    resolve: {
      genre: GenreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GenreUpdateComponent,
    resolve: {
      genre: GenreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GenreUpdateComponent,
    resolve: {
      genre: GenreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default genreRoute;
