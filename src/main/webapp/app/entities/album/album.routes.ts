import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { AlbumComponent } from './list/album.component';
import { AlbumDetailComponent } from './detail/album-detail.component';
import { AlbumUpdateComponent } from './update/album-update.component';
import AlbumResolve from './route/album-routing-resolve.service';

const albumRoute: Routes = [
  {
    path: '',
    component: AlbumComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AlbumDetailComponent,
    resolve: {
      album: AlbumResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AlbumUpdateComponent,
    resolve: {
      album: AlbumResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AlbumUpdateComponent,
    resolve: {
      album: AlbumResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default albumRoute;
