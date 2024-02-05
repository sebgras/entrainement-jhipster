import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ArtistComponent } from './list/artist.component';
import { ArtistDetailComponent } from './detail/artist-detail.component';
import { ArtistUpdateComponent } from './update/artist-update.component';
import ArtistResolve from './route/artist-routing-resolve.service';

const artistRoute: Routes = [
  {
    path: '',
    component: ArtistComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ArtistDetailComponent,
    resolve: {
      artist: ArtistResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ArtistUpdateComponent,
    resolve: {
      artist: ArtistResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ArtistUpdateComponent,
    resolve: {
      artist: ArtistResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default artistRoute;
